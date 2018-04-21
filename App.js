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
import * as actionCreators  from './AppActionCreator'
import { StackNavigator, addNavigationHelpers } from 'react-navigation'
import Routes from './components/route'

import {
  setCustomView,
  setCustomTextInput,
  setCustomText,
  setCustomImage,
  setCustomTouchableOpacity
} from 'react-native-global-props';

type Props = {};

// const customTextProps = {
//   style: {
//     fontSize: 16,
//     fontFamily: Platform.OS === 'ios' ? 'Avenir Next LT Pro' : 'Roboto',
//     color: 'black'
//   }
// };
// setCustomText(customTextProps);
const AppNavigator = StackNavigator(Routes, {
  initialRouteName: 'SetUp'
});

export const navReducer = (state, action) => {
    const newState = AppNavigator.router.getStateForAction(action, state);
    return newState || state;
}

class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <AppNavigator
          navigation={addNavigationHelpers({
                 dispatch: this.props.dispatch,
                 state: this.props.nav
             })}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {return {nav: state.nav}}

const mapDispatchToProps =(dispatch: Function) => {
  return Object.assign({dispatch: dispatch}, bindActionCreators(actionCreators, dispatch));
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
