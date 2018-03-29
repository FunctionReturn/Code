import { actions, dispatch } from 'codesandbox-api';

import transformJSON from './transform-json';

function replaceConsoleMethod(method) {
  const oldMethod = console[method];
  console[method] = (...args) => {
    try {
      if (method === 'clear') {
        dispatch(actions.console.clear());
      } else if (args.length > 0) {
        dispatch(actions.console.logConsole(method, transformJSON(args)));
      }
    } catch (e) {
      dispatch(
        actions.console.logConsole(
          method,
          JSON.stringify(['Unknown message, open your console to see it.'])
        )
      );
    }
    oldMethod.apply(console, args);
  };
}

export default function setupConsole() {
  ['log', 'info', 'warn', 'error', 'debug', 'clear'].forEach(method =>
    replaceConsoleMethod(method)
  );
}
