import { singleSandboxSelector } from 'app/store/entities/sandboxes/selectors';

import callApi from '../../services/api';

const getDependencyString = npmDependencies => {
  return Object.keys(npmDependencies)
    .map(dep => `${dep}@${npmDependencies[dep]}`)
    .join('+');
};

export default function fetch(actions, id: string) {
  return async (dispatch: Function, getState: Function) => {
    dispatch({ type: actions.REQUEST, initial: true, id });

    const sandbox = singleSandboxSelector(getState(), { id });
    const dependencyString = getDependencyString(sandbox.npmDependencies);

    const baseUrl = `https://cdn.jsdelivr.net/webpack/v1/${dependencyString}`;

    const manifest = await callApi(`${baseUrl}/manifest.json`);

    const result = {
      manifest,
      url: `${baseUrl}/dll.js`,
    };

    dispatch({
      type: actions.SUCCESS,
      result,
    });

    return result;
  };
}
