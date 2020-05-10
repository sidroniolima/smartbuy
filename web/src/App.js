import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { css } from 'glamor';
import { ModalProvider } from 'styled-react-modal';

import './config/ReactotronConfig';

import Routes from './routes';
import history from './services/history';

import GlobalStyle from './styles/global';

import { store, persistor } from './store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ModalProvider>
          <Router history={history}>
            <Routes />
            <GlobalStyle />
            <ToastContainer
              autoClose={3000}
              bodyClassName={css({
                fontSize: '13px',
                fontFamily: 'Roboto, sans-serif',
              })}
              progressClassName={css({
                height: '2px',
              })}
            />
          </Router>
        </ModalProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
