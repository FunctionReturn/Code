import * as React from 'react';
import { connect } from '@cerebral/react';
import { sequences } from 'cerebral/tags';

import GithubIcon from 'react-icons/lib/go/mark-github';
import Button from 'app/components/Button';
import Row from 'common/components/flex/Row';

function SignInButton(props) {
  const signInClicked = props.get(sequences`signInClicked`);

  return (
    <Button
      small
      onClick={() => {
        signInClicked();
      }}
      {...props}
    >
      <Row>
        <GithubIcon style={{ marginRight: '0.5rem' }} /> Sign in with GitHub
      </Row>
    </Button>
  );
}

export default connect(SignInButton);
