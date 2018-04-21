import { combineReducers } from 'redux';
import setupReducer from '../components/setup/reducer';
import gameReducer from '../components/games/reducer';
import assigningReducer from '../components/assigning/reducer';
// Root Reducer
const rootReducer = (navReducer) => combineReducers({
  nav: navReducer,
  rules: setupReducer,
  game: gameReducer,
  assigning: assigningReducer
});

export default rootReducer;
