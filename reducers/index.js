import { combineReducers } from 'redux';
import setupReducer from '../components/setup/reducer';
// Root Reducer
const rootReducer = combineReducers({
  rules: setupReducer,
});

export default rootReducer;
