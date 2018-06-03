import * as React from 'react';
import { connect } from '@cerebral/react';
import { state, sequences, computed } from 'cerebral/tags';
import { Link } from 'react-router-dom';
import { patronUrl } from 'common/utils/url-generator';

import PlusIcon from 'react-icons/lib/go/plus';
import Row from 'common/components/flex/Row';
import Tooltip from 'common/components/Tooltip';
import HeaderSearchBar from 'app/components/HeaderSearchBar';
import PatronBadge from '-!svg-react-loader!common/utils/badges/svg/patron-4.svg'; // eslint-disable-line import/no-webpack-loader-syntax

import SignInButton from '../SignInButton';
import UserMenu from '../UserMenu';
import { LogoWithBorder, Border, Title, Actions, Action } from './elements';

function Navigation({ get, title }) {
  const user = get(state`user`);
  const isPatron = get(computed`isPatron`);
  const modalOpened = get(sequences`modalOpened`);

  return (
    <Row justifyContent="space-between">
      <Row>
        <a href="/">
          <LogoWithBorder height={40} width={40} />
        </a>
        <Border width={1} size={500} />
        <Title>{title}</Title>
      </Row>
      <Row>
        <Actions>
          <Action>
            <HeaderSearchBar />
          </Action>
          {!isPatron && (
            <Action>
              <Tooltip position="bottom" title="Support CodeSandbox">
                <Link to={patronUrl()}>
                  <PatronBadge width={40} height={40} />
                </Link>
              </Tooltip>
            </Action>
          )}
          <Action
            onClick={() =>
              modalOpened({
                modal: 'newSandbox',
              })
            }
          >
            <Tooltip position="bottom" title="New Sandbox">
              <PlusIcon height={35} />
            </Tooltip>
          </Action>
        </Actions>
        {user ? (
          <UserMenu user={user} userMenuOpen={userMenuOpen} />
        ) : (
          <SignInButton />
        )}
      </Row>
    </Row>
  );
}
export default connect(Navigation);
