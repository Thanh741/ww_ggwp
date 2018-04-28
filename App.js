import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Picker
} from 'react-native';
// import Routes from './components/Routes'
import Navigator from './components/navigator'
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
// import * as actionCreators  from './AppActionCreator'
import { StackNavigator, addNavigationHelpers, TabNavigator } from 'react-navigation'
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import Routes from './components/route'

// import {
//   setCustomView,
//   setCustomTextInput,
//   setCustomText,
//   setCustomImage,
//   setCustomTouchableOpacity
// } from 'react-native-global-props';

// const customTextProps = {
//   style: {
//     fontSize: 14,
//     fontFamily: 'Avenir Next LT Pro',
//     color: 'black'
//   }
// };
// setCustomText(customTextProps);

type Props = {};

// const AppNavigator = StackNavigator(Routes, {
//   initialRouteName: 'Tabs',
//   headerMode: 'none',
//   mode: 'modal'
// });

export const navReducer = (state, action) => {
    const newState = Routes.router.getStateForAction(action, state);
    return newState || state;
}
export const navigation = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav,
);

const addListener = createReduxBoundAddListener("root");

class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Routes
          navigation={addNavigationHelpers({
                 dispatch: this.props.dispatch,
                 state: this.props.nav,
                 addListener,
             })}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {return {nav: state.nav}}

const mapDispatchToProps =(dispatch: Function) => {
  return Object.assign({dispatch: dispatch});
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
});
