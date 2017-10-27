import { buildWorkerError } from '../utils/worker-error-handler';

self.importScripts('/static/js/reason/refmt.js');
self.importScripts('/static/js/reason/jsoo_reactjs_jsx_ppx_v2.js');

self.postMessage('ready');

self.addEventListener('message', event => {
  const { code } = event.data;

  const [conversion, ocaml] = refmt(code, 'RE', 'implementation', 'ML');

  if (conversion !== 'REtoML') {
    self.postMessage({
      type: 'error',
      error: buildWorkerError(new Error(ocaml)),
    });
    return;
  }

  try {
    const jsxv2Result = JSON.parse(jsxv2.rewrite(ocaml));

    if (jsxv2Result.ocaml_code) {
      self.postMessage({
        type: 'compiled',
        transpiledCode: jsxv2Result.ocaml_code,
      });
    } else {
      self.postMessage({
        type: 'error',
        error: buildWorkerError(res),
      });
    }
  } catch (err) {
    self.postMessage({
      type: 'error',
      error: buildWorkerError(err),
    });
  }
});
