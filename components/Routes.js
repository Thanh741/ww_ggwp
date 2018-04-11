import React from 'react'
import { Router, Scene, Actions, Modal } from 'react-native-router-flux'
import Rules from './rules'
import Login from './login'
import SetUp from './setup/container'
import Game from './games/container'
import Assigning from './assigning/container'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { color } from '../resource/';
import { View, Text, Image, TextInput, Dimensions, Button, TouchableOpacity } from 'react-native';

const Routes = (props) => (
   <Router>
     <Modal>
       <Scene key = "root">
          <Scene key = "login" component = {Login} title = "Login" initial = {false} />
          <Scene key="game" component={Game} title="Game" />
          <Scene key="assigning" component={Assigning} title="Assigning" />
          <Scene tabs initial={true} title="WEREWOLF" showLabel={false} activeTintColor={color.yellow}>
           <Scene
              key='project'  title='Werewolf'
             component={Rules}
             icon={(tab) => {
               const color = tab.focused ? tab.activeTintColor : 'black'
               return <Icon size={24} color={color} name="playlist-add-check" />
             }}/>
           <Scene
            title='Werewolf'
            key='setup'
            component={() => <View></View>}
            tabBarLabel={'Set Up'}
            tabBarOnPress={()=> {
              Actions.setupModal()
            }}
            icon={(tab) => {
              const color = tab.focused ? tab.activeTintColor : 'black';
              return <Icon size={24} color={color} name="playlist-add" />
            }} />
           <Scene
             title='Werewolf'
             tabBarLabel={'Stories'} component={Rules}
             icon={(tab) => {
               const color = tab.focused ? tab.activeTintColor : 'black';
               return <Icon size={24} color={color} name="book" />
             }}
             />
            </Scene>
          </Scene>
       <Scene
         backTitle={'Cancel'}
         key='setupModal'
         component={SetUp}
         renderRightButton={<Button
           title="Next"
           onPress={() => {
             const result = props.validateRules()
             if (result.valid) {
               props.randomRoles()
               Actions.pop()
               Actions.assigning()
             } else {
               alert(result.message)
             }
           }}/>} />
     </Modal>
   </Router>
)
export default Routes;
