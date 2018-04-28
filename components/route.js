import React from 'react'
// import { Router, Scene, Actions, Modal } from 'react-native-router-flux'
import { StackNavigator, addNavigationHelpers, TabNavigator, TabBarBottom  } from 'react-navigation'
import { Text } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Rules from './rules'
import Login from './login'
import SetUp from './setup/container'
import Game from './games/container'
import Assigning from './assigning/container'
import SavedGames from './savedGames/container'
import DetailGame from './savedGameDetail/container'

const ListStack = StackNavigator({
  SavedGames: { screen: SavedGames },
  DetailGame: { screen: DetailGame }
}, {
  headerMode: 'none',
})

const SetUpModal = StackNavigator({
  SetUpModal: { screen: SetUp }
}, {
  mode: 'modal',
  headerMode: 'none'
})

const SetUpStack = StackNavigator({
  Assigning: { screen: Assigning },
  SetUp: { screen: SetUpModal },
  Game: {screen: Game},
}, {
  initialRouteName: 'SetUp',
  headerMode: 'none',
})

const Tabs = TabNavigator({
  SetUp: { screen: SetUpStack },
  List: { screen: ListStack },
},
{
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'List') {
        iconName = `ios-albums${focused ? '' : '-outline'}`;
      } else if (routeName === 'SetUp') {
        iconName = `ios-add-circle${focused ? '' : '-outline'}`;
      }
      // You can return any component that you like here! We usually use an
      // icon component from react-native-vector-icons
      return <Ionicons name={iconName} size={25} color={tintColor} />;
    },
    tabBarLabel: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let labelName;
      if (routeName == 'List') {
        labelName = 'Stories'
      } else if (routeName == 'SetUp') {
        labelName = 'New Game'
      }
      return labelName
    }
  }),
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
  },
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  animationEnabled: true,
  swipeEnabled: false,
  headerMode: 'none',
})

// const Routes = {
//   Tabs: { screen: Tabs }
// }

const MainRoutes = StackNavigator({
  Tabs: {screen: Tabs},
  Game: {screen: Game},
},
)

export default MainRoutes;
