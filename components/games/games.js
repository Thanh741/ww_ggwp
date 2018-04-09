import React from 'react'
import {
    View,
    Text,
    Image,
    TextInput,
    Dimensions,
    Button
} from 'react-native';
import styled from 'styled-components'
import Clock from '../util/clock.js'
import {checkDeadStatus, checkDeadByPeople, checkDeadStatusLastNight, findPersonByRole} from '../util/helper'

const RulesView = styled.View `
  flex: 1;
  alignItems: flex-start;
  height: 300;
  backgroundColor: rgb(255, 204, 0);
`
const GameView = styled.View `

`
const ViewContainer = styled.View `
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
        this.renderWhoDieLastNight = this.renderWhoDieLastNight.bind(this)
        this.renderWhoWillDie = this.renderWhoWillDie.bind(this)
    }

    renderWerewolfPhase(today) {
        const {currentDay, currentShift, days, killByWerewolf, players} = this.props
        const wereWolfNames = players.filter(player => player.role == 'Werewolf').map(player => <Text>{player.name}</Text>)
        return (
            <ViewContainer>
                <View>
                    <Text>WEREWOLF : </Text>
                    {wereWolfNames}
                </View>
                {today.survivors.filter((survivor) => !checkDeadByPeople(survivor.status)).map((survivor, index) => {
                    if (survivor.status === 'deadByPeople')
                        return (
                            <View></View>
                        )
                    return (
                        <View key={survivor.name}>
                            <Text>{survivor.name}</Text>
                            <Button title="KIll" onPress={killByWerewolf.bind('', survivor.name)}/>
                        </View>
                    )
                })
}
            </ViewContainer>
        )
    }

    renderWitchPhase(today) {
        const {currentDay, currentShift, days, saveByWitch, killByWitch, witchUseSave, witchUseKill, players} = this.props
        const witchNames = players.filter(player => player.role == 'Witch').map(player => <Text>{player.name}</Text>)
        const witch = findPersonByRole('Witch', days, currentDay)[0]
        const witchIsAlive = witch && !checkDeadByPeople(witch.status)
        return (
            <View>
                <View>
                    <Text>WITCH: </Text>
                    {witchNames}
                </View>
                <View>
                    {
                      witchIsAlive ?
                      <View>
                        {
                          today.survivors.filter(survivor => (survivor.status.indexOf('deadByWerewolf') > -1)).map((survivor) => {
                            if (survivor.status === 'deadByPeople')
                                return (
                                    <View></View>
                                )
                            return (
                                <View key={survivor.name}>
                                    <Text>{survivor.name} was attacked by WereWolf</Text>
                                  {!witchUseSave ? <Button title="Save" onPress={saveByWitch.bind('', survivor.name)}/> : <View></View>}
                                </View>
                            )
                          })
                        }
                        {
                          today.survivors.filter((survivor) => !checkDeadByPeople(survivor.status)).map((survivor) => {
                            if (survivor.status === 'deadByPeople')
                                return (
                                    <View></View>
                                )
                            return (
                                <View key={survivor.name}>
                                    <Text>{survivor.name}</Text>
                                    {!witchUseKill ? <Button title="Kill" onPress={killByWitch.bind('', survivor.name)}/> : <View></View>}
                                </View>
                            )
                          })
                        }
                      </View> :
                      <View><Text>DEAD</Text></View>
                    }
                   <View>
                        <Button title="Next Role" onPress={this.props.nextOrder}/>
                    </View>
                </View>
            </View>
        )
    }

    renderDoctorPhase(today) {
        const {currentDay, currentShift, days, healByDoctor, healedYesterday, players} = this.props
        const doctorNames = players.filter(player => player.role == 'Doctor').map(player => <Text>{player.name}</Text>)
        const doctor = findPersonByRole('Doctor', days, currentDay)[0]
        const doctorIsAlive = doctor && !checkDeadByPeople(doctor.status)
        return (
            <View>
                <View>
                    <Text>DOCTOR : </Text>
                    {doctorNames}
                </View>
                <View>
                    {doctorIsAlive
                        ? <View>

                                {today.survivors.filter((survivor) => !checkDeadByPeople(survivor.status)).map((survivor) => {
                                    return (
                                        <View key={survivor.name}>
                                            <Text>{survivor.name}</Text>
                                            {healedYesterday === survivor.name ? <View></View> : <Button title="Protect" onPress={healByDoctor.bind('', survivor.name)}/>}
                                        </View>
                                    )
                                })
}
                            </View>

                        : <View>
                            <Button title="Next Role" onPress={this.props.nextOrder}/>
                        </View>
}
                </View>
            </View>
        )
    }

    renderSeerPhase(today) {
        const {currentDay, currentShift, days, seeBySeer, players} = this.props
        const seerNames = players.filter(player => player.role == 'Seer').map(player => <Text>{player.name}</Text>)
        const seer = findPersonByRole('Seer', days, currentDay)[0]
        const seerIsAlive = seer && !checkDeadByPeople(seer.status)
        return (
            <View>
                <View>
                    <Text>SEER:</Text>
                    {seerNames}
                </View>
                <View>
                    {seerIsAlive
                        ? <View>
                            {today.survivors.filter((survivor) => !checkDeadByPeople(survivor.status)).map((survivor) => {
                                if (survivor.status === 'deadByPeople')
                                    return (
                                        <View></View>
                                    )
                                return (
                                    <View key={survivor.name}>
                                        <Text>{survivor.name} : {survivor.role}</Text>
                                        {/*<Button title="Predict" onPress={seeBySeer.bind('', survivor.name)}/>  */}
                                    </View>
                                )
                            })}
                      </View> : <View><Text>DEAD</Text></View>
                    }
                   <View>
                        <Button title="Next Role" onPress={this.props.nextOrder}/>
                    </View>
                </View>
            </View>
        )
      }

    renderPhase(today) {
        const {callOrder} = this.props
        switch (callOrder[this.props.order]) {
            case 'Werewolf':
                return this.renderWerewolfPhase(today)
            case 'Witch':
                return this.renderWitchPhase(today)
            case 'Doctor':
                return this.renderDoctorPhase(today)
            case 'Seer':
                return this.renderSeerPhase(today)
            default:
                return <View></View>
        }
    }

    renderWhoDieLastNight() {
        const {days, currentDay} = this.props
        const yesterday = days.filter(i => i.day === (currentDay - 1))[0]
        console.log('yesterday', yesterday);
        const survivor = yesterday.survivors.filter(survivor => checkDeadStatusLastNight(survivor.status)).map((one) => {
            return <View key={one.name}>
                <Text>{one.name}</Text>
            </View>
        })
        return survivor || 'no one'
    }

    renderWhoWillDie(today) {
        return today.survivors.map((survivor) => {
            return (
                <View key={survivor.name}>
                    <Text>
                        {survivor.name}
                    </Text>
                    <Button title="DIE" onPress={this.props.killByPeople.bind('', survivor.name)}/>
                </View>
            )
        })
    }

    render() {
        const {
            currentDay,
            currentShift,
            days = [],
            discussion,
            killingDiscussion
        } = this.props
        const today = days.filter(i => i.day === currentDay)[0]
        if (!today)
            return (
                <View></View>
            )
        return (
            <GameView>
                <Text>It is day {currentDay}
                    on {currentShift
                        ? 'Day'
                        : 'Night'}
                </Text>
                <Text>There are {today.survivorsAmount}
                    survivors left</Text>
                {currentShift
                    ? <View>
                            <View>
                                <Text>WHO DIES LAST NIGHT:
                                </Text>
                                {this.renderWhoDieLastNight()}
                            </View>
                            {discussion
                                ? <View></View>
                                : <Button title="START DISCUSSION" onPress={this.props.toggleDiscussion}/>}
                            {discussion
                                ? <Clock toggleDiscussion={this.props.toggleDiscussion}/>
                                : <View></View>}
                            {killingDiscussion
                                ? <View></View>
                                : <Button title="START VOTING" onPress={this.props.toggleVoting}/>}
                            {killingDiscussion
                                ? this.renderWhoWillDie(today)
                                : <View></View>}

                        </View>
                    : <View>
                        {this.renderPhase(today)}
                    </View>
}
            </GameView>
        )

    }
}

export default Games
