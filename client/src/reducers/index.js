import { combineReducers } from 'redux';

import UserReducer from './user';
import ChatReducer from './chat';
import RoomReducer from './room';

const rootReducer = combineReducers({ user: UserReducer, chat: ChatReducer, room: RoomReducer });

export default rootReducer;
