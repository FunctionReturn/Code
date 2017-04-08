import evalJs from './js';
import evalCss from './css';

import { compile, parseComponent } from 'vue-template-compiler';
import transpiler from 'vue-template-es2015-compiler';

function toFunction(code) {
  return 'function (){' + code + '}';
}

export default function evaluateVue(
  mainModule,
  sandboxId,
  modules,
  directories,
  manifest,
  depth
) {
  const vueComponent = parseComponent(mainModule.code);

  const { styles, script, template } = vueComponent;

  console.log(vueComponent);

  styles.forEach(style => {
    evalCss(
      {
        ...mainModule,
        code: style.content,
      },
      sandboxId,
      modules,
      directories,
      manifest,
      depth
    );
  });

  if (script) {
    evalJs(
      {
        ...mainModule,
        code: script.content,
      },
      sandboxId,
      modules,
      directories,
      manifest,
      depth
    );
  }

  if (template) {
    const compiled = compile(template.content);
    const hello = evalJs(
      {
        ...mainModule,
        id: `${mainModule.id}-vue`,
        code: transpiler(
          'module.exports={' +
            'render:' +
            toFunction(compiled.render) +
            ',' +
            'staticRenderFns: [' +
            compiled.staticRenderFns.map(toFunction).join(',') +
            ']' +
            '}; module.exports.render.withStripped = true;'
        ),
      },
      sandboxId,
      modules,
      directories,
      manifest,
      depth
    );
    console.log(hello);
    return hello;
  }
}
