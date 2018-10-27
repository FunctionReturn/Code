import parse from 'posthtml-parser';
import render from 'posthtml-render';
import api from 'posthtml/lib/api';

import isUrl from './is-url';

// A list of all attributes that may produce a dependency
// Based on https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes
const ATTRS = {
  src: [
    'script',
    'img',
    'audio',
    'video',
    'source',
    'track',
    'iframe',
    'embed',
  ],
  href: ['link', 'a'],
  poster: ['video'],
  'xlink:href': ['use'],
  content: ['meta'],
};

// A list of metadata that should produce a dependency
// Based on:
// - http://schema.org/
// - http://ogp.me
// - https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/markup
// - https://msdn.microsoft.com/en-us/library/dn255024.aspx
const META = {
  property: [
    'og:image',
    'og:image:url',
    'og:image:secure_url',
    'og:audio',
    'og:audio:secure_url',
    'og:video',
    'og:video:secure_url',
  ],
  name: [
    'twitter:image',
    'msapplication-square150x150logo',
    'msapplication-square310x310logo',
    'msapplication-square70x70logo',
    'msapplication-wide310x150logo',
    'msapplication-TileImage',
  ],
  itemprop: [
    'image',
    'logo',
    'screenshot',
    'thumbnailUrl',
    'contentUrl',
    'downloadUrl',
  ],
};

self.addEventListener('message', async event => {
  const { code } = event.data;

  const resources = [];
  const staticResources = [];

  function addDependency(depPath: string, tag: string) {
    if (!isUrl(depPath)) {
      let assetPath = decodeURIComponent(depPath);
      if (/^\w/.test(assetPath)) {
        assetPath = `./${assetPath}`;
      }

      self.postMessage({
        type: 'add-dependency',
        path: assetPath,
        isEntry: true,
      });

      resources.push(assetPath);

      return assetPath;
    }

    staticResources.push([tag, depPath]);

    return false;
  }

  function addSrcSetDependencies(srcset: string, tag: string) {
    const newSources = [];

    srcset.split(',').forEach(source => {
      const pair = source.trim().split(' ');
      if (pair.length === 0) return;
      pair[0] = addDependency(pair[0], tag);
      newSources.push(pair.join(' '));
    });
    return newSources.join(',');
  }

  const res = parse(code, { lowerCaseAttributeNames: true });
  res.walk = api.walk;
  res.match = api.match;

  res.walk(node => {
    if (node.attrs) {
      if (node.tag === 'meta') {
        if (
          !Object.keys(node.attrs).some(attr => {
            const values = META[attr];
            return values && values.includes(node.attrs[attr]);
          })
        ) {
          return node;
        }
      }

      /* eslint-disable no-param-reassign no-continue */
      // eslint-disable-next-line no-restricted-syntax
      for (const attr in node.attrs) {
        if (node.tag === 'img' && attr === 'srcset') {
          node.attrs[attr] = addSrcSetDependencies(node.attrs[attr], node.tag);
          continue;
        }
        const elements = ATTRS[attr];
        // Check for virtual paths
        if (node.tag === 'a' && node.attrs[attr].lastIndexOf('.') < 1) {
          continue;
        }

        if (
          node.tag === 'html' &&
          node.attrs[attr].endsWith('.html') &&
          attr === 'href'
        ) {
          // Another HTML file, we'll compile it when the user goes to it
          continue;
        }

        if (elements && elements.includes(node.tag)) {
          const result = addDependency(node.attrs[attr], node.tag);

          if (result) {
            if (node.tag === 'link' || node.tag === 'script') {
              node.tag = false;
              node.content = [];
            } else {
              node.attrs[attr] = result;
            }
          }
        }
      }
    }

    return node;
  });

  const newHTML = render(res);

  const isChrome =
    /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

  let compiledCode = isChrome
    ? `function setupHTML() {
      const HTML = ${JSON.stringify(newHTML)};
      document.open('text/html');
      document.write(HTML);
      document.close();
    }
    setupHTML();
`
    : `
function loadStyle(path, callback) {
  return new Promise(resolve => {
    var link = document.createElement('link');
    link.onload = resolve;
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = path;
    document.head.appendChild(link);
  });
}

function loadScript(path) {
  return new Promise(resolve => {
    var script = document.createElement('script');
    script.onload = resolve;
    script.type = 'text/javascript';
    script.src = path;
    document.head.appendChild(script);
  });
}

function addResources() {
  return Promise.all([${staticResources
    .map(([type, src]) => {
      const stringifiedResource = JSON.stringify(src);
      return type === 'script'
        ? `loadScript(${stringifiedResource})`
        : `loadStyle(${stringifiedResource})`;
    })
    .join(',\n')}]);
  }
addResources().then(() => {
`;

  compiledCode += '\n';
  compiledCode += 'function loadResources() {';
  resources.forEach(resource => {
    const resourcePath = JSON.stringify(resource);
    compiledCode += `\n`;
    compiledCode += `\trequire(${resourcePath});\n`;
  });
  compiledCode += '\n}';

  compiledCode += isChrome
    ? `
if (document.readyState !== 'complete') {
  window.addEventListener('load', function() { loadResources() });
} else {
  loadResources();
}
`
    : `\nloadResources() });`;

  console.log(compiledCode);

  self.postMessage({
    type: 'result',
    transpiledCode: compiledCode,
  });
});
