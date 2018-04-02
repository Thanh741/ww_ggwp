import React from 'react'
import { View, Text, Image, TextInput, Dimensions, Button } from 'react-native';
import styled from 'styled-components'

const RulesView = styled.View`
  flex: 1;
  alignItems: flex-start;
  height: 300;
  backgroundColor: rgb(255, 204, 0);
`
const GameView = styled.View`

`


class Games extends React.Component {
  render() {
    return
     <GameView>
       <View>
          <Text>{game.day}</Text>
          <Text>{game.shift}</Text>
          <Text>{game.numberSurvivor}</Text>
          <Text>{game.survivor}</Text>
          <Text>{game.survivor}</Text>
       </View>
     </GameView>
  }
}

export default Games
