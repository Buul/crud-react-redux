import { BUSY_COUNTER_ADD, BUSY_COUNTER_REMOVE } from '../helpers/constants';

export function toggleSpinner(show) {
  return {
    type: show ? BUSY_COUNTER_ADD : BUSY_COUNTER_REMOVE,
  };
}

export default toggleSpinner;
