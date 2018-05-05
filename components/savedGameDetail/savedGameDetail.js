import React from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components'

const TextDay = styled.Text`
  color: #4A4A4A;
  font-size: 15px;
  font-weight: bold;
`
const ViewDay = styled.View`
  background-color: #F8E71C;
  padding: 5px 10px;
`
const ViewContainer = styled.View`
  padding: 20px 0px;
  background-color: #30435A;
`
const ViewDetail = styled.View`
  background-color: #30435A;
  padding: 5px 10px;
`
const TextDetail = styled.Text`
  color: #F0F0F0
`

class SavedGameDetail extends React.Component {
  renderStatusStory(status, name) {
    let storyText = ''
    switch (status) {
      case 'deadByWitch': storyText = `${name} was murdered by WITCH`; break;
      case 'deadByPeople': storyText = `${name} was voted to be hung`; break;
      case 'deadByWerewolf': storyText = `${name} was bitten by WEREWOLF`; break;
      case 'saveByWitch': storyText = `${name} was revived by WITCH`; break;
      case 'healByDoctor': storyText = `${name} was healed by DOCTOR`; break;
      case 'seeBySeer': storyText = `${name} was predict by SEER`; break;
      default: ''
    }
    return <TextDetail>{storyText}</TextDetail>
  }

  renderDayDetail(day) {
    const persons = day.survivors.filter((person) => person.status.length > 0).map((person) => {
      return (
        <ViewDetail key={person.name}>
          {person.status.map((i) => <View>{this.renderStatusStory(i, person.name)}</View>)}
        </ViewDetail>
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
          <ViewDay><TextDay>DAY {day.day}</TextDay></ViewDay>
          {this.renderDayDetail(day)}
        </View>
      )
    })
  }
  render() {
    if (this.props.game.day.length > 0) {
      return (
        <ViewContainer>
          {this.renderDays(this.props.game.day)}
        </ViewContainer>
      )
    }
    return <View></View>
  }
}

export default SavedGameDetail;
