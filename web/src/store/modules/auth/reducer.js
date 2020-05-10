import produce from 'immer';

const INITIAL_STATE = {
  token: null,
  signed: null,
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/SIGN_IN_SUCCESS': {
        draft.token = action.payload.token;
        draft.signed = true;
        break;
      }
      case '@auth/SIGN_FAILURE': {
        draft.loading = false;
        draft.token = null;
        draft.signed = false;
        break;
      }
      default:
    }
  });
}
