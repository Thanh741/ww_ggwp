import React from 'react'
// import { Router, Scene, Actions, Modal } from 'react-native-router-flux'
import { StackNavigator, addNavigationHelpers, TabNavigator } from 'react-navigation'
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
})


const SetUpStack = StackNavigator({
  Assigning: { screen: Assigning },
  Game: { screen: Game },
  SetUp: { screen: SetUp },
}, {
  initialRouteName: 'SetUp',
})

const Tabs = TabNavigator({
  List: { screen: ListStack },
  SetUp: { screen: SetUpStack }
}, {
  initialRouteName: 'List',
  headerMode: 'none',
  mode: 'modal'
})

// const Routes = {
//   Tabs: { screen: Tabs }
// }


export default Tabs;
