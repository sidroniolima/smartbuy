import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import purchase from './purchase/reducer';

const reducers = combineReducers({
  auth,
  user,
  purchase,
});

export default reducers;
