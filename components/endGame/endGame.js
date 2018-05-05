import React from 'react';
import { View, Text, Button, Dimensions } from 'react-native';
import styled from 'styled-components'
const win = Dimensions.get('window');


const ViewContainer = styled.View`
  backgroundColor: #30435A;
  height: ${win.height};
  display: flex;
  justifyContent: center;
  alignItems: center
`
const InformText = styled.Text`
  color: #DADADA;
  fontFamily: 'Avenir Next LT Pro';
  font-weight: bold;
  font-size: 20px;
`
class EndGame extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      tabBarVisible: false
    }
  };
  render() {
    const { params } = this.props.navigation.state;
    const winner = params.winner === 'peopleWin' ? 'All Werewolfs are dead !!' : 'Werewolf killed all villagers :('
    return (
    <ViewContainer>
      <InformText>{winner}</InformText>
      <Button onPress={this.props.saveGame} title="Save Game" />
      <Button onPress={this.props.backHome} title="Back to Home" />
    </ViewContainer>
  )
  }
}
export default EndGame
