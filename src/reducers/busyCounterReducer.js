import { BUSY_COUNTER_ADD, BUSY_COUNTER_REMOVE } from '../helpers/constants';

export default function(state = 0, action) {
  switch (action.type) {
    case BUSY_COUNTER_ADD:
      return state + 1;
    case BUSY_COUNTER_REMOVE:
      return state - 1;
    default:
  }

  return state;
}
