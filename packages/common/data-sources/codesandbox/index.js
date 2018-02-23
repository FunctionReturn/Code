// @flow

import { SandboxFS, DataSource } from '../data-source';

export default class CodeSandboxDataSource implements DataSource {
  async getSandboxes() {
    return ['new'];
  }

  getSandboxFS(id: string) {}
}
