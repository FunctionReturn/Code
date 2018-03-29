import { RenameModuleAction } from '../message-types';

export function rename(path: string, title: string): RenameModuleAction {
  return {
    type: 'action',
    action: 'source.module.rename',
    path,
    title,
  };
}
