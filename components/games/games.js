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
  constructor() {
    super();
    this.renderSeerPhase = this.renderSeerPhase.bind(this)
    this.renderWitchPhase = this.renderWitchPhase.bind(this)
    this.renderDoctorPhase = this.renderDoctorPhase.bind(this)
    this.renderWerewolfPhase = this.renderWerewolfPhase.bind(this)
  }
  renderWerewolfPhase(today) {
    const { currentDay, currentShift, days, killHim } = this.props

    return toDay.survivors.map((survivor, index) => {
      <View key={survivor.name}>
        <Text>{survivor.name}</Text><Button title="KIll" onPress={killHim}>
      </View>
    })
  }
  renderWitchPhase(toDay) {
    const { currentDay, currentShift, days, witchSaveHime, witchKillHim} = this.props

    return
     <View>
       {
         toDay.survivors.filter(survivor => survivor.status.includes('dead')).map((survivor) => {
          <View>
            <Text>{survivor.name}</Text>
            <Button title="Save" onPress={witchSaveHime}>
          </View>
         })
       }
       {
         toDay.survivors.map((survivor) => {
          <View>
            <Text>{survivor.name}</Text>
            <Button title="Kill" onPress={witchKillHim}>
          </View>
         })
       }
    </View>
  }
  renderDoctorPhase(toDay) {
    const { currentDay, currentShift, days, protectHim} = this.props

    return
     <View>
       {
         toDay.survivors.map((survivor) => {
          <View>
            <Text>{survivor.name}</Text>
            <Button title="Protect" onPress={protectHim}>
          </View>
         })
       }
    </View>
  }
  renderSeerPhase() {
    const { currentDay, currentShift, days, checkRoleOfHim} = this.props

    return
     <View>
       {
         toDay.survivors.map((survivor) => {
          <View>
            <Text>{survivor.name}</Text>
            <Button title="Predict" onPress={checkRoleOfHim}>
          </View>
         })
       }
    </View>
  }
  render() {
    const { currentDay, currentShift, days } = this.props
    const toDay = days.filter(i => i.day === currentDay)
    return (
      <GameView>
        {
           currentShift  ?
           <View>
              <Text>{currentDay}</Text>
              <Text>{currentShift}</Text>
              <Text>{game.numberSurvivor}</Text>
           </View> :
           <View>
              <Text>{currentDay}</Text>
              <Text>{currentShift}</Text>
              <Text>{game.numberSurvivor}</Text>
              {
                switch (this.props.order) {
                  case 0: return renderWerewolfPhase(toDay)
                  case 1: return renderWitchPhase(toDay)
                  case 2: return renderDoctorPhase(toDay)
                  case 3: return renderSeerPhase(toDay)
                  default: return ''
                }
              }
           </View>
        }
      </GameView>
    )

  }
}

export default Games
