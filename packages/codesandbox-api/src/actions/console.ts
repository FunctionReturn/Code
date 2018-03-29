import {
  ClearConsoleAction,
  ConsoleType,
  LogConsoleAction,
  ConsoleEvalResultAction,
} from './message-types';

/**
 * Clear dev console in CodeSandbox
 */
export function clear(): ClearConsoleAction {
  return {
    type: 'action',
    action: 'clear-console',
  };
}

/**
 * Let the dev console show a message
 */
export function logConsole(type: ConsoleType, args: string): LogConsoleAction {
  return {
    type: 'action',
    action: 'console',
    method: type,
    args,
  };
}

export function logEvalResult(error?: string, result?: string): ConsoleEvalResultAction {
  return {
    type: 'action',
    action: 'eval-result',
    error,
    result,
  };
}
