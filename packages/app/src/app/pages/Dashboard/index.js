import * as React from 'react';
import { inject, observer } from 'mobx-react';

import Navigation from 'app/pages/common/Navigation';

import {
  Container,
  ContentContainer,
  Card,
  CollectionMenuCard,
  CollectionItem,
} from './elements';

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.signals.cliMounted();
  }

  render() {
    return (
      <Container>
        <Navigation title="Dashboard" />

        <ContentContainer>
          <CollectionMenuCard>
            <CollectionItem style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
              Search
            </CollectionItem>
            <CollectionItem>Recents</CollectionItem>
            <CollectionItem>My Sandboxes</CollectionItem>
          </CollectionMenuCard>
          <div style={{ width: '100%' }}>This is the rest</div>
        </ContentContainer>
      </Container>
    );
  }
}

export default inject('store', 'signals')(observer(Dashboard));
