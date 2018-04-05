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
const  ViewContainer = styled.View`
  display: flex;
  flex-direction: row;
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
    const { currentDay, currentShift, days, killByWerewolf } = this.props
    return (
      <ViewContainer>
        {
          today.survivors.map((survivor, index) => {
            console.log(survivor);
            return (
              <View key={survivor.name}>
                <Text>{survivor.name}</Text>
                <Button title="KIll" onPress={killByWerewolf.bind(survivor.name)} />
              </View>
            )
          })
        }
      </ViewContainer>
    )
  }
  renderWitchPhase(today) {
    const { currentDay, currentShift, days, saveByWitch, killByWitch} = this.props

    return (
      <View>
        {
          today.survivors.filter(survivor => survivor.status.includes('dead')).map((survivor) => {
           return (
             <View>
               <Text>{survivor.name}</Text>
               <Button title="Save" onPress={saveByWitch.bind(survivor.name)} />
             </View>
           )
          })
        }
        {
          today.survivors.map((survivor) => {
           return (
             <View>
               <Text>{survivor.name}</Text>
               <Button title="Kill" onPress={killByWitch.bind(survivor.name)} />
             </View>)
          })
        }
     </View>
    )
  }

  renderDoctorPhase(today) {
    const { currentDay, currentShift, days, healByDoctor} = this.props
    return (
      <View>
        {
          today.survivors.map((survivor) => {
           return (
             <View>
               <Text>{survivor.name}</Text>
               <Button title="Protect" onPress={healByDoctor.bind(survivor.name)} />
             </View>
           )
          })
        }
     </View>
    )
  }

  renderSeerPhase(today) {
    const { currentDay, currentShift, days, seeBySeer} = this.props

    return (
      <View>
        {
          today.survivors.map((survivor) => {
            return (
              <View>
                <Text>{survivor.name}</Text>
                <Button title="Predict" onPress={seeBySeer.bind(survivor.name)} />
              </View>
            )
          })
        }
     </View>
    )

  }
  renderPhase(today) {
    switch (this.props.order) {
      case 0: return this.renderWerewolfPhase(today)
      case 1: return this.renderWitchPhase(today)
      case 2: return this.renderDoctorPhase(today)
      case 3: return this.renderSeerPhase(today)
      default: return <View></View>
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
              <Text>{currentShift ? 'Day' : 'Night'}</Text>
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
