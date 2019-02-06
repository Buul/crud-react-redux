import { DIALOG_ADD, DIALOG_REMOVE } from '../helpers/constants';

export function showMessageBox(options) {
  return {
    type: DIALOG_ADD,
    payload: {
      type: 'MessageBox',
      ...options,
    },
  };
}

export function removeDialog(dialog) {
  return {
    type: DIALOG_REMOVE,
    payload: dialog,
  };
}
