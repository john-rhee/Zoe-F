import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import reducer from './reducers/index'

const store = createStore( reducer, applyMiddleware (thunk, logger ) )

ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>
  ,document.getElementById('root'));

serviceWorker.unregister();