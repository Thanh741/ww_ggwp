import { combineReducers } from 'redux';
import setupReducer from '../components/setup/reducer';
import gameReducer from '../components/games/reducer';
import assigningReducer from '../components/assigning/reducer';
import savedGamesReducer from '../components/savedGames/reducer';
import detailGameReducer from '../components/savedGameDetail/reducer';
// Root Reducer
const rootReducer = (navReducer) => combineReducers({
  detailGame: detailGameReducer,
  savedGames: savedGamesReducer,
  nav: navReducer,
  rules: setupReducer,
  game: gameReducer,
  assigning: assigningReducer,

});

export default rootReducer;
