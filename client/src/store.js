import { createStore, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';

// import the root reducer
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers/index';

// Setup socket.io store
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
const config = require('./config');
const serverBaseURL = `http://${config.server.host}:${config.server.port}`;
const socket = io(serverBaseURL);
const socketIoMiddleware = createSocketIoMiddleware(socket, "socket/");

let store = createStore(rootReducer, applyMiddleware(thunk, socketIoMiddleware));

if (module.hot) {
   module.hot.accept('./reducers/',() => {
      const nextRootReducer = require('./reducers/index').default;
      store.replaceReducer(nextRootReducer);
   });
}

export const history = createBrowserHistory();
export default store;
