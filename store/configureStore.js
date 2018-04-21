// Redux Store Configuration
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import logger from 'redux-logger'
// import loggingMiddleware from './middleware/logging';

const configureStore = (initialState: Object, navReducer) => {
  const middleware = applyMiddleware(thunk, logger);
  console.log('create Store');
  return createStore(rootReducer(navReducer), initialState, middleware);
};

export default configureStore;
