import produce from 'immer';

const INITIAL_STATE = {
  vendorId: null,
  newItem: {},
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@vendor/SELECT_VENDOR':
      return produce(state, draft => {
        draft.vendorId = action.payload;
      });
    case '@auth/RESET':
      return produce(state, draft => {
        draft.vendorId = null;
      });
    default:
      return state;
  }
}
