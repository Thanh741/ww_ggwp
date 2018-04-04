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
    this.renderPhase = this.renderPhase.bind(this)
  }
  renderWerewolfPhase(today) {
    console.log('werewolf');
    const { currentDay, currentShift, days, killHim } = this.props

    return
  <View>
    {
      today.survivors.map((survivor, index) => {
        <View key={survivor.name}>
          <Text>{survivor.name}</Text>
          <Button title="KIll" onPress={killHim} />
        </View>
      })
    }
  </View>

  }
  renderWitchPhase(today) {
    const { currentDay, currentShift, days, witchSaveHime, witchKillHim} = this.props

    return
     <View>
       {
         today.survivors.filter(survivor => survivor.status.includes('dead')).map((survivor) => {
          <View>
            <Text>{survivor.name}</Text>
            <Button title="Save" onPress={witchSaveHime} />
          </View>
         })
       }
       {
         today.survivors.map((survivor) => {
          <View>
            <Text>{survivor.name}</Text>
            <Button title="Kill" onPress={witchKillHim} />
          </View>
         })
       }
    </View>
  }
  renderDoctorPhase(today) {
    const { currentDay, currentShift, days, protectHim} = this.props

    return
     <View>
       {
         today.survivors.map((survivor) => {
          <View>
            <Text>{survivor.name}</Text>
            <Button title="Protect" onPress={protectHim} />
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
         today.survivors.map((survivor) => {
          <View>
            <Text>{survivor.name}</Text>
            <Button title="Predict" onPress={checkRoleOfHim} />
          </View>
         })
       }
    </View>
  }
  renderPhase(today) {
    switch (this.props.order) {
      case 0: return this.renderWerewolfPhase(today)
      case 1: return this.renderWitchPhase(today)
      case 2: return this.renderDoctorPhase(today)
      case 3: return this.renderSeerPhase(today)
      default: return ''
      }
  }
  render() {
    const { currentDay, currentShift, days } = this.props
    const today = days.filter(i => i.day === currentDay)[0]
    console.log(today);
    return (
      <GameView>
        {
           currentShift  ?
           <View>
              <Text>Current day{currentDay}</Text>
              <Text>Shift: {currentShift ? 'Day' : 'Night'}</Text>
              <Text>{today.survivorsAmount}</Text>
           </View> :
           <View>
              <Text>{currentDay}</Text>
              <Text>{currentShift}</Text>
              <Text>{today.survivorsAmount}</Text>
              {
                this.renderPhase(today)
              }
              <Button onPress={() => {this.props.nextOrder()}} title="NEXT" />
           </View>
        }
      </GameView>
    )

  }
}

export default Games
