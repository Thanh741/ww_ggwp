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
const NextButton = styled.Button`
  color: black;
`
const NextViewButton = styled.View`
  margin-right: 10px;
`

class SavedGames extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {}
    return {
      headerRight: (
        <NextViewButton>
          <NextButton
            title="Reload"
            onPress={ params.reload }
            color="#4A4A4A"
          />
        </NextViewButton>
      )
    }
  };
  componentWillMount() {
    this.props.loadSavedGames()
    this.props.navigation.setParams({ reload: this.props.loadSavedGames });
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
      return <View><Text>NO THING TO SHOW</Text></View>
    }
  }
}
export default SavedGames;
