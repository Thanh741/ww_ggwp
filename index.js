import { AppRegistry } from 'react-native';
import App, {navReducer} from './App';


import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

const store = configureStore({}, navReducer);

const app = () => (
  <Provider store={store}>
    <App />
  </Provider>
);


console.disableYellowBox = true;
AppRegistry.registerComponent('taleofwerewolf', () => app);
