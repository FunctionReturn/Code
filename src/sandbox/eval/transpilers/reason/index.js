// @flow
import ReasonWorker from 'worker-loader!./reason-worker.js';

import WorkerTranspiler from '../worker-transpiler';
import { type LoaderContext } from '../../transpiled-module';

function addScript(src) {
  var s = document.createElement('script');
  s.setAttribute('src', src);
  document.body.appendChild(s);
}

addScript('/static/js/reason/bucklescript.js');
addScript('/static/js/reason/extraModules.js');

class ReasonTranspiler extends WorkerTranspiler {
  worker: Worker;

  constructor() {
    super('reason-loader', ReasonWorker, 2);
  }

  doTranspilation(code: string, loaderContext: LoaderContext) {
    return new Promise((resolve, reject) => {
      const path = loaderContext.path;
      this.queueTask(
        {
          code,
          path,
        },
        loaderContext,
        (err, data) => {
          if (err) {
            loaderContext.emitError(err);

            return reject(err);
          }

          const ocamlCode = data.transpiledCode;

          const transpiled = JSON.parse(window.ocaml.compile(ocamlCode));

          return resolve({ transpiledCode: transpiled, type: 'compiled' });
        }
      );
    });
  }
}

const transpiler = new ReasonTranspiler();

export { ReasonTranspiler };

export default transpiler;
