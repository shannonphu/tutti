import { combineReducers } from 'redux';

import UserReducer from './user';
import RoomReducer from './room';
import GameReducer from './GameReducer';
import ClickTrackReducer from './ClickTrackReducer';

const rootReducer = combineReducers({ user: UserReducer, room: RoomReducer, game: GameReducer, clickTrack: ClickTrackReducer });

export default rootReducer;
