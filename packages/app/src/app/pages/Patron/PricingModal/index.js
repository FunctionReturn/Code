import React from 'react';

import { connect } from '@cerebral/react';
import { computed } from 'cerebral/tags';
import PricingInfo from './PricingInfo';
import PricingChoice from './PricingChoice';
import Badge from './Badge';

import { Container, Details } from './elements';

function PricingModal({ get }) {
  const tier = get(computed`patron.tier`);
  const isPatron = get(computed`isPatron`);
  const badge = `patron-${tier}`;

  console.log(badge);

  return (
    <Container>
      <Badge subscribed={isPatron} badge={badge} />
      <Details>
        <PricingInfo />
        <PricingChoice badge={badge} />
      </Details>
    </Container>
  );
}

export default connect(PricingModal);
