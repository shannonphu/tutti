import { combineReducers } from 'redux';

import UserReducer from './user';
import ChatReducer from './chat';

const rootReducer = combineReducers({ user: UserReducer, chat: ChatReducer });

export default rootReducer;
