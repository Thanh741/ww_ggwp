import React from 'react'
import { View, Text, Button, TouchableOpacity, Dimensions, TouchableHighlight, TouchableWithoutFeedback, ScrollView } from 'react-native'
import styled from 'styled-components'
import moment from 'moment'

const win = Dimensions.get('window');
const ListView = styled.ScrollView`
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
                      this.props.redirectToDetail(days.time)
                    }}>
                    <Text>{moment(parseFloat(days.time.replace('@wereWolf:', ''))).format('MMMM Do YYYY, h:mm:ss a')}</Text>
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
