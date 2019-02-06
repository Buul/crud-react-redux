/* eslint-disable no-underscore-dangle */
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { LocaleProvider } from 'antd';
import ptBR from 'antd/lib/locale-provider/pt_BR';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import theme from './styles/theme/index';

import App from './components/App';
import reducers from './reducers';
import 'antd/dist/antd.css';

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = applyMiddleware(thunk)(createStore)(reducers, devTools);

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <LocaleProvider locale={ptBR}>
        <App />
      </LocaleProvider>
    </ThemeProvider>
  </Provider>,
  document.getElementById('app')
);
