import { combineReducers } from 'redux';

import UserReducer from './user';
import RoomReducer from './room';
import GameReducer from './GameReducer';

const rootReducer = combineReducers({ user: UserReducer, room: RoomReducer, game: GameReducer});

export default rootReducer;
