/**
 * @flow
 */
import type { BaseSandbox, Module, Directory, CurrentUser } from 'common/types';

export interface SandboxFS {
  getSandbox(): Promise<BaseSandbox>;

  createFile(path: string, code: string, options: Object): Promise<Module>;
  createDirectory(path: string): Promise<Directory>;

  moveModule(oldPath: string, newPath: string): Promise<Module | Directory>;
  deleteModule(path: string): Promise<Module | Directory>;

  updateFile(path: string, code: string): Promise<Module>;
}

export interface DataSource {
  constructor(user: CurrentUser): void;

  getSandboxes(): Promise<Array<string>>;
  getSandboxFS(id: string): Promise<SandboxFS>;
}
