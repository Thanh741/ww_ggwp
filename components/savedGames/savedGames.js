import React from 'react'
import { View, Text, Button, TouchableOpacity, Dimensions, TouchableHighlight, TouchableWithoutFeedback } from 'react-native'
import styled from 'styled-components'

const win = Dimensions.get('window');
const ListView = styled.View`
  background-color: white;
  height: ${win.height};
  display: flex;
`
const ItemView =  styled.View`
  flexDirection: row;
  background: #ddd;
  padding: 10px;
  margin-bottom: 1px;
`

class SavedGames extends React.Component {
  componentWillMount() {
    this.props.loadSavedGames()
  }
  render() {
    const { games } = this.props
    console.log('games', games);
    if (games && games.length > 0) {
      return (
        <ListView>
          {
            games.map((days) => {
              return (
                <ItemView key={days.time}>
                  <TouchableOpacity onPress={() => {
                      console.log('aaa');
                      this.props.redirectToDetail(days.time)
                    }}>
                    <Text>{days.time}</Text>
                  </TouchableOpacity>
                </ItemView>
              )
            })
          }
        </ListView>
      )
    } else {
      return <View>NO THING TO SHOW</View>
    }
  }
}
export default SavedGames;
