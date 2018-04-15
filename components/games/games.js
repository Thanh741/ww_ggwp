import React from 'react'
import {
    View,
    Text,
    Image,
    TextInput,
    Dimensions,
    Button,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import styled from 'styled-components'
import Clock from '../util/clock.js'
import {checkDeadStatus, checkDeadByPeople, checkDeadStatusLastNight, findPersonByRole} from '../util/helper'
const win = Dimensions.get('window');

const RulesView = styled.View `
  flex: 1;
  alignItems: flex-start;
  height: 300;
  backgroundColor: rgb(255, 204, 0);
`
const GameView = styled.View `
  background-color: white;
  height: ${win.height};
`
const ViewContainer = styled.View `
  display: flex;
  flexDirection: column;
  alignItems: flex-start;
`
const DayCard = styled.View`
background-color: #F8E71C;
height: ${win.height - 200};
margin: 18px 20px;
border-radius: 4px;
box-shadow: 1px 2px 2px #aaaa;
display: flex;
flexDirection: column;
`
const NightCard = styled.View`
  background-color: #30435A;
  height: ${win.height - 200};
  margin: 18px 20px;
  border-radius: 4px;
  box-shadow: 1px 2px 2px #aaaa;
  display: flex;
  flexDirection: column;
`
const CurrentDay = styled.View`
  margin: 40px 30px;
  alignItems: flex-end;
`
const CurrentDayText = styled.Text`
  font-size: 30px;
  font-weight: bold;
`
const SurvivorLeft = styled.Text`
  margin-top: 15px;
  font-size: 18px;
`
const QuestionView = styled.View`
  height: ${(props) => { return props.height || '75px' }};
  background-color: #F8E71C;
  alignItems: flex-end;
  width: 100%;
  padding: 0px 10px;
`
const QuestionRole = styled.Text`
  font-weight: bold;
  margin-top: 5px;
  text-align: right;
`

const QuestionText = styled.Text`
  margin-top: 10px;
  font-size: 13px;
`
const BoldText =  styled.Text`
  font-weight: bold;
  color: #FF5F5F;
`
const BoldColorText = styled.Text`
  font-weight: bold;
  color: black;
`
const Character = styled.TouchableOpacity`
  height: 60px;
  background-color: #D8D8D8;
  alignItems: center;
  justifyContent: center;
  margin: 5px 5px;
  border-radius: 5px;
  width: 60px;
`
const CharacterContainer = styled.View`
  flex: 1;
  flex-wrap: wrap;
  flexDirection: row;
  margin-top: 20px;
  justifyContent: center;
`
const CustomText = styled.Text`
  font-size: 14px;
`
const CustomTextRole = styled.Text`
  font-size: 14px;
  font-weight: bold;
`
const CustomView = styled.View`
  alignItems: center;
  justifyContent: center;
`
const CustomButton = styled.Button`
  color: black;
  font-weight: bold;
`
const CenterView = styled.View`
  justifyContent: center;
  alignItems: center;
  display: flex;
`

class Games extends React.Component {
    constructor() {
        super();
        this.state = {
          witchSave: '',
          witchKill: '',
        }
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
        let wereWolfs = players.filter(player => player.role == 'Werewolf')
        let wereWolfNames = '';
        for(let wereWolf of wereWolfs) {
          if (wereWolfNames == '') {
            wereWolfNames = wereWolf.name
          } else {
            wereWolfNames = wereWolfNames + ', ' + wereWolf.name
          }
        }
        return (
            <ViewContainer>
                <QuestionView>
                  <QuestionRole>{wereWolfNames}</QuestionRole>
                  <CenterView>
                    <QuestionText>Werewolf, who do you want to <BoldText>kill</BoldText> this night ?</QuestionText>
                  </CenterView>
                </QuestionView>
                <CharacterContainer>
                  {today.survivors.filter((survivor) => !checkDeadByPeople(survivor.status)).map((survivor, index) => {
                      return (
                          <Character key={survivor.name} onPress={killByWerewolf.bind('', survivor.name)}>
                              <CustomText>{survivor.name}</CustomText>
                          </Character>
                      )
                  })}
                </CharacterContainer>
            </ViewContainer>
        )
    }

    renderWitchPhase(today) {
        const {
            currentDay,
            currentShift,
            days,
            saveByWitch,
            killByWitch,
            witchUseSave,
            witchUseKill,
            players
        } = this.props
        const witchNames = players.filter(player => player.role == 'Witch').map(player => <Text>{player.name}</Text>)
        const witch = findPersonByRole('Witch', days, currentDay)[0]
        const witchIsAlive = witch && !checkDeadByPeople(witch.status)
        return (
            <ViewContainer>
                <QuestionView>
                  <QuestionRole>{witchNames}</QuestionRole>
                  <QuestionText>Witch, this guy was bitten by Werewolf, do you want to heal him ?</QuestionText>
                </QuestionView>
                {
                  witchIsAlive
                        ?
                        <CustomView>
                          {
                            today.survivors.filter(survivor => (survivor.status.indexOf('deadByWerewolf') > -1 && !checkDeadByPeople(survivor.status))).map((survivor) => {
                              if (witchUseSave) return <View>{survivor.name}</View>
                              return (
                                  <Character key={survivor.name} onPress={() => { this.setState({witchSave: survivor.name}) } }>
                                    <CustomText>
                                      { this.state.witchSave === survivor.name ? <BoldColorText>{survivor.name}</BoldColorText> : survivor.name }
                                    </CustomText>
                                  </Character>
                              )
                          })
                        }
                        </CustomView>
                        : <View>
                            <Text>DEAD</Text>
                        </View>}
                <QuestionView height={30}>
                  <QuestionText>Anyone you want to kill ?</QuestionText>
                </QuestionView>
                { witchIsAlive ?
                        <ScrollView horizontal>
                          {today.survivors.filter((survivor) => !checkDeadByPeople(survivor.status)).map((survivor) => {
                              if(witchUseKill) return <View></View>
                              return (
                                  <Character key={survivor.name} onPress={() => {this.setState({witchKill: survivor.name})}}>
                                    <CustomText>{ this.state.witchKill === survivor.name ? <BoldColorText>{survivor.name}</BoldColorText> : survivor.name}</CustomText>
                                  </Character>
                              )
                          })}
                        </ScrollView>
                       :
                      <View>DEAD</View>
                }
                <QuestionView height={30}>
                  <TouchableOpacity onPress={() => {
                      const {witchSave, witchKill} = this.state;
                      if (witchSave) this.props.saveByWitch(witchSave)
                      if (witchKill) this.props.killByWitch(witchKill)
                      this.props.nextOrder()
                    }}>
                    <QuestionText>Next</QuestionText>
                  </TouchableOpacity>
                </QuestionView>
            </ViewContainer>
        )
    }

    renderDoctorPhase(today) {
        const {
            currentDay,
            currentShift,
            days,
            healByDoctor,
            healedYesterday,
            players
        } = this.props
        const doctorNames = players.filter(player => player.role == 'Doctor').map(player => <Text>{player.name}</Text>)
        const doctor = findPersonByRole('Doctor', days, currentDay)[0]
        const doctorIsAlive = doctor && !checkDeadByPeople(doctor.status)
        return (
            <ViewContainer>
                <QuestionView>
                  <QuestionRole>{doctorNames}</QuestionRole>
                  <QuestionText>Doctor, who do you want to heal ? </QuestionText>
                </QuestionView>
                {doctorIsAlive ?
                  <CharacterContainer>
                    {today.survivors.filter((survivor) => !checkDeadByPeople(survivor.status) && healedYesterday !== survivor.name).map((survivor) => {
                      return (
                        <Character key={survivor.name} onPress={healByDoctor.bind('', survivor.name)}>
                          <CustomText>{survivor.name}</CustomText>
                        </Character>
                      )
                    })}
                  </CharacterContainer>
                    : <View>
                        <Button title="Next Role" onPress={this.props.nextOrder}/>
                    </View>}
            </ViewContainer>
        )
    }

    renderSeerPhase(today) {
        const {currentDay, currentShift, days, seeBySeer, players} = this.props
        const seerNames = players.filter(player => player.role == 'Seer').map(player => <Text>{player.name}</Text>)
        const seer = findPersonByRole('Seer', days, currentDay)[0]
        const seerIsAlive = seer && !checkDeadByPeople(seer.status)
        return (
            <ViewContainer>
              <QuestionView>
                <QuestionRole>{seerNames}</QuestionRole>
                <QuestionText>Seer, who do you want to predict this night ?</QuestionText>
              </QuestionView>
                    {seerIsAlive
                        ? <CharacterContainer>
                                {today.survivors.filter((survivor) => !checkDeadByPeople(survivor.status)).map((survivor) => {
                                    return (
                                        <Character key={survivor.name} onPress={this.props.nextOrder}>
                                            <CustomText>{survivor.name}</CustomText>
                                            <CustomTextRole>{survivor.role}</CustomTextRole>
                                            {/*<Button title="Predict" onPress={seeBySeer.bind('', survivor.name)}/>  */}
                                        </Character>
                                    )
                                })}
                            </CharacterContainer>
                        : <View>
                            <Text>DEAD</Text>
                        </View>}

            </ViewContainer>
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
        const survivor = yesterday.survivors.filter(survivor => checkDeadStatusLastNight(survivor.status))
        if (survivor.length === 1) {
          return survivor[0].name
        } else if (survivor.length > 1) {
          let string = ''
          for (let x = 0; x < survivor.length;   x++ ) {
            if (x === 0) {
              string = string + survivor[x].name
            }
            else {
              string = string + ' and ' + survivor[x].name
            }
          }
          return string
        }
        return 'No one'
    }

    renderWhoWillDie(today) {
        return today.survivors.map((survivor) => {
            return (
                  <Character onPress={this.props.killByPeople.bind('', survivor.name)} key={survivor.name}>
                      <CustomText>
                        {survivor.name}
                      </CustomText>
                  </Character>
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
                {currentShift
                    ? <DayCard>
                        <CurrentDay>
                          <CurrentDayText> Day {currentDay} </CurrentDayText>
                          <SurvivorLeft>
                            <BoldColorText> {this.renderWhoDieLastNight()}</BoldColorText> was dead last night
                          </SurvivorLeft>
                          <SurvivorLeft>There are <BoldColorText>{today.survivorsAmount} </BoldColorText>survivors left</SurvivorLeft>
                        </CurrentDay>
                        {discussion
                            ? <View></View>
                            :
                            <CenterView>
                              <TouchableOpacity onPress={this.props.toggleDiscussion}>
                                <BoldColorText>Discuss</BoldColorText>
                              </TouchableOpacity>
                            </CenterView>

                        }
                        {discussion
                            ? <Clock toggleDiscussion={this.props.toggleDiscussion}/>
                            : <View></View>}
                        {killingDiscussion
                            ? <View></View>
                            :
                            <CenterView>
                              <TouchableOpacity onPress={this.props.toggleVoting}>
                                <BoldColorText>Vote</BoldColorText>
                              </TouchableOpacity>
                            </CenterView>
                        }
                        {killingDiscussion
                            ?
                            <CharacterContainer>
                              {
                                this.renderWhoWillDie(today)
                              }
                          </CharacterContainer>
                            : <View></View>}
                      </DayCard>
                    : <NightCard>
                        <CurrentDay>
                          <CurrentDayText> Night {currentDay} </CurrentDayText>
                          <SurvivorLeft>There are <BoldColorText>{today.survivorsAmount} </BoldColorText>survivors left</SurvivorLeft>
                        </CurrentDay>
                        {this.renderPhase(today)}
                    </NightCard>
                  }
            </GameView>
        )
    }
}

export default Games
