// @flow
import { react, vue, svelte, preact, reason } from 'common/templates';

import reactPreset from './presets/create-react-app';
import reactTsPreset from './presets/create-react-app-typescript';
import vuePreset from './presets/vue-cli';
import preactPreset from './presets/preact-cli';
import sveltePreset from './presets/svelte';
import reasonPreset from './presets/create-reason-react-app';

export default function getPreset(template: string) {
  switch (template) {
    case react.name:
      return reactPreset;
    case reactTsPreset.name:
      return reactTsPreset;
    case vue.name:
      return vuePreset;
    case preact.name:
      return preactPreset;
    case svelte.name:
      return sveltePreset;
    case reason.name:
      return reasonPreset;
    default:
      return reactPreset;
  }
}
