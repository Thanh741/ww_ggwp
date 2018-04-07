import React from 'react'
import { View, Text, Image, TextInput, Dimensions, Button } from 'react-native';
import styled from 'styled-components'
import Clock from '../util/clock.js'

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
    this.renderStatus = this.renderStatus.bind(this)
    this.renderWhoWillDie = this.renderWhoWillDie.bind(this)
  }

  renderWerewolfPhase(today) {
    const { currentDay, currentShift, days, killByWerewolf } = this.props
    return (
      <ViewContainer>
        <View>
          <Text>WEREWOLF</Text>
        </View>
        {
          today.survivors.map((survivor, index) => {
            console.log(survivor);
            return (
              <View key={survivor.name}>
                <Text>{survivor.name}</Text>
                <Button title="KIll" onPress={killByWerewolf.bind('', survivor.name)} />
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
        <View>
          <Text>WITCH</Text>
        </View>
        {
          today.survivors.filter(survivor => (survivor.status.indexOf('deadByWerewolf') > -1)).map((survivor) => {
           return (
             <View>
               <Text>{survivor.name}</Text>
               <Button title="Save" onPress={saveByWitch.bind('', survivor.name)} />
             </View>
           )
          })
        }
        {
          today.survivors.map((survivor) => {
           return (
             <View>
               <Text>{survivor.name}</Text>
               <Button title="Kill" onPress={killByWitch.bind('', survivor.name)} />
             </View>)
          })
        }
     </View>
    )}

  renderDoctorPhase(today) {
    const { currentDay, currentShift, days, healByDoctor} = this.props
    return (
      <View>
        <View>
          <Text>DOCTOR</Text>
        </View>
        {
          today.survivors.map((survivor) => {
           return (
             <View>
               <Text>{survivor.name}</Text>
               <Button title="Protect" onPress={healByDoctor.bind('', survivor.name)} />
             </View>
           )
          })
        }
     </View>
    )}

  renderSeerPhase(today) {
    const { currentDay, currentShift, days, seeBySeer} = this.props

    return (
      <View>
        <View>
          <Text>SEER</Text>
        </View>
        {
          today.survivors.map((survivor) => {
            return (
              <View>
                <Text>{survivor.name}</Text>
                <Button title="Predict" onPress={seeBySeer.bind('', survivor.name)} />
              </View>
            )
          })
        }
     </View>
    )}

  renderPhase(today) {
    switch (this.props.order) {
      case 0: return this.renderWerewolfPhase(today)
      case 1: return this.renderWitchPhase(today)
      case 2: return this.renderDoctorPhase(today)
      case 3: return this.renderSeerPhase(today)
      default: return <View></View>
      }
  }

  renderStatus() {
    const { days, currentDay } = this.props
    const yesterday = days.filter(i => i.day === (currentDay - 1))[0]
    const survivor =  yesterday.survivors.filter(survivor => this.props.checkStatus(survivor.status)).map((one) => {
      return <View><Text>{one.name}</Text></View>
    })
    return survivor || ''
  }

  renderWhoWillDie(today) {
    return today.survivors.map((survivor) => {
      <View>
        <Text>
          {survivor.name}
        </Text>
        <Button title="DIE" onPress={this.props.killByPeople('', survivor.name)}/>
      </View>
    })
  }

  render() {
    const { currentDay, currentShift, days = [], discussion, killingDiscussion } = this.props
    const today = days.filter(i => i.day === currentDay)[0]
    return (
      <GameView>
        <Text>It is day {currentDay} on {currentShift ? 'Day' : 'Night'} </Text>
        <Text>There are {today.survivorsAmount} survivors left</Text>
        {
           currentShift  ?
           <View>
              <View>
                <Text>WHO DIES LAST NIGHT: </Text>
              </View>
              {this.renderStatus()}

              {discussion ? <Clock data={clock} changeShift={this.props.changeShift} /> : <View></View>}
              {killingDiscussion ? this.renderWhoWillDie(today) : <View></View>}

           </View> :
           <View>
              {this.renderPhase(today)}
           </View>
        }
      </GameView>
    )

  }
}

export default Games
