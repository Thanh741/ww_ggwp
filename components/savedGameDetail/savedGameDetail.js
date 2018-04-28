import React from 'react'
import { View, Text } from 'react-native'
// import styled from 'styled-component'

class SavedGameDetail extends React.Component {
  renderDayDetail(day) {
    const persons = day.survivors.map((person) => {
      return (
        <View key={person.name}>
          <Text>{person.name}: {person.status.map((i) => <Text>{i} </Text>)} </Text>
        </View>
      )
    })
    return (
      <View>
          {persons}
      </View>)
  }
  renderDays(days) {
    return days.map((day) => {
      return (
        <View key={day.day}>
          <View><Text>DAY {day.day}</Text></View>
          {this.renderDayDetail(day)}
        </View>
      )
    })
  }
  render() {
    if (this.props.game.day.length > 0) {
      return (
        <View>
          {this.renderDays(this.props.game.day)}
        </View>
      )
    }
    return <View></View>
  }
}

export default SavedGameDetail;
