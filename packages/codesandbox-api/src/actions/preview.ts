import {
  CompileCommand,
  IModules,
  Template,
  EvaluateCommand,
  HistoryForwardCommand,
  HistoryBackCommand,
} from './message-types';

/**
 * Compile the given files in the preview
 */
export function compile(
  modules: IModules,
  template: Template,
  options: {
    skipEval?: boolean;
    showOpenInCodeSandbox?: boolean;
    version?: number;
    externalResources?: string[];
    entry?: string;
    sandboxId?: string;
    isModuleView?: boolean;
    hasActions?: boolean;
  } = {}
): CompileCommand {
  return {
    type: 'compile',
    version: options.version || 3,
    modules,
    externalResources: options.externalResources || [],
    template,
    showOpenInCodeSandbox: options.showOpenInCodeSandbox || true,
    skipEval: options.skipEval == null ? true : options.skipEval,
    entry: options.entry,
    sandboxId: options.sandboxId,
    isModuleView: options.isModuleView,
    hasActions: options.hasActions,
  };
}

/**
 * Evaluate the given code in the preview
 */
export function evaluate(command: string): EvaluateCommand {
  return {
    type: 'evaluate',
    command,
  };
}

export const history = {
  /**
   * Move the history forward, like pressing next in the browser
   */
  forward(): HistoryForwardCommand {
    return {
      type: 'urlforward',
    };
  },
  /**
   * Move the history back, like pressing back in the browser
   */
  back(): HistoryBackCommand {
    return {
      type: 'urlback',
    };
  },
};
