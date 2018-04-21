import React from 'react'
import { View, Text, Button, TouchableOpacity, Dimensions, TouchableHighlight, TouchableWithoutFeedback } from 'react-native'
import styled from 'styled-components'
import { Actions } from 'react-native-router-flux'
import { NavigationActions } from 'react-navigation'

const win = Dimensions.get('window');

const AssignView = styled.View`
  background-color: white;
  height: ${win.height}
`
const RoleText = styled.Text`
  font-weight: bold;
  font-size: 36px;
`
const NameText = styled.Text`
  font-size: 18px
`

const CardView = styled.View`
  background-color: #F8E71C;
  height: ${win.height - 300};
  margin: 40px 60px;
  border-radius: 4px;
  box-shadow: 1px 2px 2px #aaaa;
  alignItems: center;
  justifyContent: center;
`
const CusView = styled.View`
  alignItems: center;
  justifyContent: center;
  padding: 5px;
`
const CustomText = styled.Text`
  font-size: 14px
`
const BoldText = styled.Text`
  font-weight: bold
`
class Assigning extends React.Component {
  constructor() {
    super();
    this.state = {
      showRole: false
    }
  }
  componentWillMount() {
    console.log('a');
    // Actions.reset('assigning')
    // Actions.replace('assigning')
  }
  render() {
    const { player = {}, nextPlayer } = this.props
    const { showRole } = this.state
    return (
      <AssignView>
        <TouchableWithoutFeedback onPress={() => {
          if (showRole) {nextPlayer().then((res) => {
            if (res.startGame) {
              const resetAction = NavigationActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Game' })],
              });
              this.props.navigation.dispatch(resetAction)
            }
          })}
          this.setState({showRole: !showRole})
        }}>
          <CardView>
            <RoleText>{ showRole ? player.role : ''}</RoleText>
            <NameText>{player.name}</NameText>
          </CardView>
        </TouchableWithoutFeedback>
        <CusView>
          {
            showRole ?
              <View>
                <CustomText>Press the card again and</CustomText>
                <CustomText><BoldText>give the phone</BoldText> to your <BoldText>next</BoldText> friend</CustomText>
              </View>
            : <CustomText>Press the card to <BoldText>show</BoldText> your role</CustomText>
          }

        </CusView>
      </AssignView>
    )
  }
}
export default Assigning
