import { createStore, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';

// import the root reducer
import thunk from 'redux-thunk';

import rootReducer from './reducers/index';

// Setup socket.io store
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
const socket = io('/');
const socketIoMiddleware = createSocketIoMiddleware(socket, 'socket/');

let store = createStore(rootReducer, applyMiddleware(thunk, socketIoMiddleware));

if (module.hot) {
    module.hot.accept('./reducers/',() => {
        const nextRootReducer = require('./reducers/index').default;
        store.replaceReducer(nextRootReducer);
    });
}

export const history = createBrowserHistory();
export default store;
