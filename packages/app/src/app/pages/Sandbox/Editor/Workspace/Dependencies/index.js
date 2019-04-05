// @flow
import React from 'react';
import { inject, observer } from 'mobx-react';
import RefreshIcon from 'react-icons/lib/md/refresh';
import Margin from '@codesandbox/common/lib/components/spacing/Margin';
import Tooltip from '@codesandbox/common/lib/components/Tooltip';
import getDefinition from '@codesandbox/common/lib/templates';
import { WorkspaceSubtitle, Icon } from '../elements';
import WorkspaceItem from '../WorkspaceItem';
import AddVersion from './AddVersion';
import VersionEntry from './VersionEntry';
import AddResource from './AddResource';
import ExternalResource from './ExternalResource';

import { ErrorMessage } from './elements';

function Dependencies({ signals, store }) {
  const sandbox = store.editor.currentSandbox;

  if (!store.editor.parsedConfigurations.package) {
    return <ErrorMessage>Unable to find package.json</ErrorMessage>;
  }

  const { parsed, error } = store.editor.parsedConfigurations.package;

  if (error) {
    return (
      <ErrorMessage>
        We weren
        {"'"}t able to parse the package.json
      </ErrorMessage>
    );
  }

  const dependencies = parsed.dependencies || {};
  // const devDependencies = parsed.devDependencies || {};

  const templateDefinition = getDefinition(sandbox.template);

  const updateAllDeps = async () => {
    const updatedDeps = Object.keys(dependencies).map(async name =>
      setTimeout(
        () =>
          signals.editor.addNpmDependency({
            name,
          }),
        1000
      )
    );

    Promise.all(updatedDeps)
      .then(() =>
        signals.notificationAdded({
          message: `Your dependencies were all updated`,
          type: 'success',
        })
      )
      .catch(() => {
        signals.notificationAdded({
          message: `There was a problem updating your dependencies`,
          type: 'error',
        });
      });
  };

  return (
    <WorkspaceItem
      defaultOpen
      title="Dependencies"
      actions={
        <Tooltip content="Update all dependencies">
          <Icon onClick={updateAllDeps}>
            <RefreshIcon />
          </Icon>
        </Tooltip>
      }
    >
      <Margin bottom={0}>
        {Object.keys(dependencies)
          .sort()
          .map(dep => (
            <VersionEntry
              key={dep}
              dependencies={dependencies}
              dependency={dep}
              onRemove={name => signals.editor.npmDependencyRemoved({ name })}
              onRefresh={(name, version) =>
                signals.editor.addNpmDependency({
                  name,
                  version,
                })
              }
            />
          ))}
        {/* {Object.keys(devDependencies).length > 0 && (
          <WorkspaceSubtitle>Development Dependencies</WorkspaceSubtitle>
        )}
        {Object.keys(devDependencies)
          .sort()
          .map(dep => (
            <VersionEntry
              key={dep}
              dependencies={devDependencies}
              dependency={dep}
              onRemove={name => signals.editor.npmDependencyRemoved({ name })}
              onRefresh={(name, version) =>
                signals.editor.addNpmDependency({
                  name,
                  version,
                })
              }
            />
          ))} */}
        <AddVersion>Add Dependency</AddVersion>
      </Margin>
      {templateDefinition.externalResourcesEnabled && (
        <div>
          <WorkspaceSubtitle>External Resources</WorkspaceSubtitle>
          {(sandbox.externalResources || []).map(resource => (
            <ExternalResource
              key={resource}
              resource={resource}
              removeResource={() =>
                this.props.signals.workspace.externalResourceRemoved({
                  resource,
                })
              }
            />
          ))}
          <AddResource
            addResource={resource =>
              signals.workspace.externalResourceAdded({
                resource,
              })
            }
          />
        </div>
      )}
    </WorkspaceItem>
  );
}

export default inject('signals', 'store')(observer(Dependencies));
