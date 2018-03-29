// All actions of the editor and the preview are defined here. The sandbox can send messages
// like `source.files.rename` which the editor will see as an action to rename
// a module. This will allow plugins to alter project content in the future

import * as console from './console';
import * as correction from './correction';
import * as editor from './editor';
import * as error from './error';
import * as glyph from './glyph';
import * as navigation from './navigation';
import * as notifications from './notifications';
import * as preview from './preview';
import * as source from './source';
import * as state from './state';
import * as status from './status';

export const actions = {
  console,
  correction,
  editor,
  error,
  glyph,
  navigation,
  notifications,
  preview,
  source,
  state,
  status,
};
