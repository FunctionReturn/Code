import { AddDependencyAction } from '../message-types';

export function add(dependencyName: string): AddDependencyAction {
  return {
    type: 'action',
    action: 'source.dependencies.add',
    dependency: dependencyName,
  };
}
