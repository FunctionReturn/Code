import { Computed } from 'cerebral';
import { state } from 'cerebral/tags';

export const tier = Computed(
  {
    price: state`patron.price`,
  },
  ({ price }) => {
    if (price >= 20) return 4;
    if (price >= 15) return 3;
    if (price >= 10) return 2;

    return 1;
  }
);
