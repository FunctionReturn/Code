export interface Action {
  type: 'action';
  action: string;
}

export interface IModules {
  [path: string]: {
    code: string;
    path: string;
  };
}

export type Template =
  | 'create-react-app'
  | 'create-react-app-typescript'
  | 'parcel'
  | 'angular-cli'
  | 'svelte'
  | 'preact-cli'
  | 'vue-cli';

export interface CorrectionAction extends Action {
  message: string;
  line?: number;
  column?: number;
  path: string;
  payload?: Object;
  severity: 'warning' | 'notice';
  source?: string;
  action: 'show-correction';
}

export interface OpenModuleAction extends Action {
  path: string;
  lineNumber: number;
  action: 'editor.open-module';
}

export interface ErrorAction extends Action {
  title: string;
  message: string;
  line?: number;
  column?: number;
  path?: string;
  payload?: Object;
  action: 'show-error';
}

export interface GlyphAction extends Action {
  line: number;
  path: string;
  className: string;
  action: 'show-glyph';
}

export interface NotificationAction extends Action {
  action: 'notification';
  title: string;
  notificationType: 'notice' | 'warning' | 'error' | 'success';
  timeAlive: number;
}

export interface AddDependencyAction extends Action {
  action: 'source.dependencies.add';
  dependency: string;
}

export interface RenameModuleAction extends Action {
  action: 'source.module.rename';
  path: string;
  title: string;
}

export interface ChangeNavigationURLAction extends Action {
  action: 'urlchange';
  url: string;
}

export type ConsoleType = 'info' | 'log' | 'warn' | 'error';

export interface ClearConsoleAction extends Action {
  action: 'clear-console';
}

export interface LogConsoleAction extends Action {
  action: 'console';
  method: ConsoleType;
  args: string;
}

export interface ConsoleEvalResultAction extends Action {
  action: 'eval-result';
  result?: string;
  error?: string;
}

export interface CompileCommand {
  type: 'compile';
  version: number;
  externalResources: string[];
  modules: IModules;
  template: Template;
  skipEval: boolean;
  showOpenInCodeSandbox: boolean;
  entry?: string;
  sandboxId?: string;
  isModuleView?: boolean;
  hasActions?: boolean;
}

export interface EvaluateCommand {
  type: 'evaluate';
  command: string;
}

export interface HistoryForwardCommand {
  type: 'urlforward';
}

export interface HistoryBackCommand {
  type: 'urlback';
}

export type ManagerStatus =
  | 'installing-dependencies'
  | 'transpiling'
  | 'evaluating'
  | 'running-tests'
  | 'idle';

export interface ManagerStatusMessage {
  type: 'status';
  status: ManagerStatus;
}

export interface IModuleSource {
  fileName: string;
  compiledCode: string;
  sourceMap: Object | undefined;
}

export interface IModule {
  code: string;
  path: string;
}

export interface ITranspiledModule {
  module: IModule;
  query: string;
  source: IModuleSource | undefined;
  assets: {
    [name: string]: IModuleSource;
  };
  isEntry: boolean;
  isTestFile: boolean;
  childModules: Array<string>;
  /**
   * All extra modules emitted by the loader
   */
  emittedAssets: Array<IModuleSource>;
  initiators: Array<string>;
  dependencies: Array<string>;
  asyncDependencies: Array<string>;
  transpilationDependencies: Array<string>;
  transpilationInitiators: Array<string>;
}

export interface IManagerState {
  entry: string;
  transpiledModules: {
    [id: string]: ITranspiledModule;
  };
}

export interface ManagerStateMessage {
  type: 'state';
  state: IManagerState;
}

export interface StartEvent {
  type: 'start';
}

export interface DoneEvent {
  type: 'done';
}

export interface SuccessEvent {
  type: 'success';
}

export type CodeSandboxMessage =
  | CorrectionAction
  | OpenModuleAction
  | ErrorAction
  | GlyphAction
  | NotificationAction
  | AddDependencyAction
  | RenameModuleAction
  | ClearConsoleAction
  | LogConsoleAction
  | ConsoleEvalResultAction
  | ChangeNavigationURLAction
  | EvaluateCommand
  | CompileCommand
  | HistoryForwardCommand
  | HistoryBackCommand
  | ManagerStatusMessage
  | ManagerStateMessage
  | StartEvent
  | DoneEvent
  | SuccessEvent;
