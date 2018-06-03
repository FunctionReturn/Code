import store from 'store/dist/store.modern';
import { Computed } from 'cerebral';
import { state } from 'cerebral/tags';

export const isPatron = Computed(
  {
    user: state`user`,
  },
  ({ user }) => Boolean(user && user.subscription && user.subscription.since)
);

export const isLoggedIn = Computed(
  {
    jwt: state`jwt`,
    user: state`user`,
  },
  ({ jwt, user }) => Boolean(jwt) && Boolean(user)
);

export const hasLogIn = Computed(
  {
    jwt: state`jwt`,
  },
  ({ jwt }) => !!jwt || !!store.get('jwt')
);
