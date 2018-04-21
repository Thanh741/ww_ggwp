import React from 'react'
// import { Router, Scene, Actions, Modal } from 'react-native-router-flux'
import Rules from './rules'
import Login from './login'
import SetUp from './setup/container'
import Game from './games/container'
import Assigning from './assigning/container'
const Routes = {
  Game: { screen: Game },
  SetUp: {
    screen: SetUp,
   },
  Assigning: { screen: Assigning }
}
export default Routes;
