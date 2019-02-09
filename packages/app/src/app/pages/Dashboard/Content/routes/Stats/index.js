import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { HeaderContainer, Container } from '../../elements';

// eslint-disable-next-line
class SearchSandboxes extends Component {
  render() {
    // const { store, signals } = this.props;

    return (
      <Container>
        <HeaderContainer>Your Stats</HeaderContainer>
      </Container>
    );
  }
}

export default inject('signals', 'store')(observer(SearchSandboxes));
