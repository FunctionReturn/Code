/* @flow */
import React from 'react';
import SplitPane from 'react-split-pane';
import type { Sandbox } from 'app/store/entities/sandboxes/entity';

import Workspace from './Workspace';

import Content from './Content';

type Props = {
  sandbox: Sandbox,
};

export default ({ sandbox, reverse }: Props) => (
  <SplitPane split="vertical" minSize={100} style={{ top: 0 }}>
    {[<Workspace sandbox={sandbox} />, <Content sandbox={sandbox} />]
      .sort(() => reverse ? 1 : -1)
      .map(x => x)}
  </SplitPane>
);
