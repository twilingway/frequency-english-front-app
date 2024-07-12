// src/store/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import playerReducer from './slices/playerSlice';
import lineReducer from './slices/lineSlice';

const rootReducer = combineReducers({
    player: playerReducer,
    line: lineReducer,
});

export default rootReducer;
