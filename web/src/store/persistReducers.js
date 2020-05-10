import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
  const persistedReducers = persistReducer(
    {
      key: 'smartbuy_web',
      storage,
      whitelist: ['auth', 'user'],
    },
    reducers
  );

  return persistedReducers;
};
