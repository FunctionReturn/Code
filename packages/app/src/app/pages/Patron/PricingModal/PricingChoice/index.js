import React from 'react';
import { connect } from '@cerebral/react';
import { state, sequences, computed } from 'cerebral/tags';
import moment from 'moment';

import Centered from 'common/components/flex/Centered';
import Relative from 'common/components/Relative';
import SubscribeForm from 'app/components/SubscribeForm';
import badges from 'common/utils/badges/patron-info';

import Range from './Range';
import ChangeSubscription from './ChangeSubscription';
import ThankYou from './ThankYou';
import { Title } from '../elements';
import {
  Container,
  PriceInput,
  Month,
  Currency,
  Notice,
  RangeContainer,
  StyledSignInButton,
} from './elements';

function PricingChoice({ get, badge }) {
  const isPatron = get(computed`isPatron`);
  const isLoggedIn = get(computed`isLoggedIn`);
  const user = get(state`user`);
  const patron = get(state`patron`);
  const patronSequences = get(sequences`patron`);

  return (
    <Container>
      <Centered horizontal vertical={false}>
        <Title>Pay what you want</Title>
        {isPatron && (
          <ThankYou
            price={user.subscription.amount}
            color={badges[badge].colors[0]}
          />
        )}
        <Relative>
          <Currency>$</Currency>
          <PriceInput
            onChange={event =>
              patronSequences.priceChanged({
                price: Number(event.target.value),
              })
            }
            value={patron.price}
            type="number"
          />
          <Month>/month</Month>
        </Relative>
        <RangeContainer>
          <Range
            onChange={value =>
              patronSequences.priceChanged({ price: Number(value) })
            }
            min={5}
            max={50}
            step={1}
            value={patron.price}
            color={badges[badge].colors[0]}
          />
        </RangeContainer>
        {isLoggedIn ? ( // eslint-disable-line no-nested-ternary
          isPatron ? (
            <ChangeSubscription
              updateSubscription={() =>
                patronSequences.updateSubscriptionClicked()
              }
              cancelSubscription={() =>
                patronSequences.cancelSubscriptionClicked()
              }
              date={user.subscription.since}
            />
          ) : (
            <Centered style={{ marginTop: '2rem' }} horizontal>
              <SubscribeForm
                subscribe={token =>
                  patronSequences.createSubscriptionClicked({ token })
                }
                isLoading={patron.isUpdatingSubscription}
                name={user.name}
                error={patron.error}
              />
              <Notice>
                You will be billed now and on the{' '}
                <strong style={{ color: 'white' }}>
                  {moment().format('Do')}
                </strong>{' '}
                of each month thereafter. You can cancel or change your
                subscription at any time.
              </Notice>
            </Centered>
          )
        ) : (
          <StyledSignInButton />
        )}
      </Centered>
    </Container>
  );
}

export default connect(PricingChoice);
