

// import Icon from 'react-native-vector-icons/MaterialIcons'
import { color } from '../resource/';
import { View, Text, Image, TextInput, Dimensions, Button, TouchableOpacity } from 'react-native';

const Routes = (props) => (
   <Router>
     <Modal>
       <Scene key = "root">
          <Scene key = "login" component = {Login} title = "Login" initial = {false} />
          <Scene key="game" component={Game} title="Game" />
          <Scene key="assigning" component={Assigning} title="Assigning"/>
          <Scene tabs title="WEREWOLF" showLabel={false} activeTintColor={color.yellow} initial={true}>
           <Scene
              key='project'  title='Werewolf'
             component={Rules}
             icon={(tab) => {
               const color = tab.focused ? tab.activeTintColor : 'black'
               return <Text>FUCK</Text>
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
              return <Text>FUCK 2</Text>
            }} />
           <Scene
             title='Werewolf'
             tabBarLabel={'Stories'} component={Rules}
             icon={(tab) => {
               const color = tab.focused ? tab.activeTintColor : 'black';
               return <Text>FUCK 3</Text>
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
               Actions.push('assigning')
             } else {
               alert(result.message)
             }
           }}/>} />
     </Modal>
   </Router>
)
export default Routes;
