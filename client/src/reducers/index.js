import { combineReducers } from 'redux';

import UserReducer from './user';
import ChatReducer from './chat';
import RoomReducer from './room';
import GameReducer from './GameReducer';

const rootReducer = combineReducers({ user: UserReducer, chat: ChatReducer, room: RoomReducer, game: GameReducer });

export default rootReducer;
