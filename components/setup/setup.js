import React, { Component } from 'react';

import { View, Text, Image, TextInput, Dimensions, Button, TouchableOpacity } from 'react-native';

import styled from 'styled-components'
// import { Actions } from 'react-native-router-flux'
import { color } from '../../resource'


const win = Dimensions.get('window');

const SetUpView = styled.View`
  flex: 1;
  background-color: ${color.white};
  position: relative;
`
const TextNumber = styled.Text`
  color: #616161;
  padding-right: 15px
  text-align: right;
  font-size: 18px;
  font-family: 'Avenir Next LT Pro';

`;
const Container = styled.View`
  height: ${(prop) => prop.height};
  padding-top: ${(prop) => prop.paddingTop || 0};
`
const ListPickers = styled.View`
  margin: 0;
  padding: 0;
  flex: 1;
  flexDirection: row;
`
const Picker = styled.TouchableOpacity`
  flex: 1;
  alignItems: center;
  justifyContent: center;
  backgroundColor: ${(props) => props.active ? '#F8E71C' : '#D8D8D8'};
  border-radius: 5px;
  margin: 0px 12px
`;

const ListPlayerNumbers = styled.TouchableOpacity`
  margin: 0px 0px 50px 0px;
  flex: 1;
  flexDirection: row;
  height: 150;
`
const PlayersNumber = styled.TouchableOpacity`
  flex: 1;
  alignItems: center;
  background: #D8D8D8;
  justifyContent: center;
  backgroundColor: ${(props) => props.active ? '#F8E71C' : '#D8D8D8'};
  height: 35;
`;

const InputStyling = styled.TextInput`
`;
const PlayerNumberText = styled.Text`
  font-weight: ${(props) => props.active ? 'bold' : 'normal'};
  font-size: 12px;
  font-family: 'Avenir Next LT Pro';
`;
const PlayerRoleText = styled.Text`
  font-weight: ${(props) => props.active ? 'bold' : 'normal'};
  font-size: 20px;
  font-family: 'Avenir Next LT Pro';
`;
const PlayerNumberTextBold = styled.Text`
  font-weight: bold;
  font-size: 18px;
  font-family: 'Avenir Next LT Pro';
`
const PlayerNumberTextActive = styled.Text`
font-weight: bold;
font-family: 'Avenir Next LT Pro';
`;

const TextView = styled.View`
  margin-top: 40px;
  margin-bottom: 12px;
`
const TextViewBot = styled.View`
  margin-bottom: 40px;
`
const TextInputCustom = styled.TextInput`
  background: #D8D8D8;
  height: ${win.height - 400}
  padding: 20px 15px;
  font-size: 15px;
`
const NextButton = styled.Button`
  color: black
`
const NumberHelper = styled.View`
  position: absolute
  bottom: 0;
  right: 0;
  z-index: 99
`


class SetUp extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {}
    return {
      headerRight: (
        <NextButton
          title="Next"
          onPress={ params.nextScreen }
          color="#4A4A4A"
        />
      )
    }
  };
  constructor() {
    super();
    this.state = {
      playerNumber: 7,
      roles: [{name: 'Seer', active: true}, {name: 'Protector', active: false}, {name: 'Witch', active: false}],
      playerLength: 0
    }
    this.setPlayerNumber = this.setPlayerNumber.bind(this)
    this.setRoles = this.setRoles.bind(this)
    this.setPlayerNames = this.setPlayerNames.bind(this)
    this.nextScreen = this.nextScreen.bind(this)
  }
  componentWillMount() {
    this.props.navigation.setParams({ nextScreen: this.nextScreen });
  }
  setPlayerNumber(number) {
    this.setState({
      playerNumber: number
    })
  }
  setRoles(roles) {
    let currentRoles = this.props.roles;
    currentRoles = currentRoles.map((role) => {
      if (role.name == roles) {
        role.active = !role.active
      }
      return role
    })
    this.props.updateRoles(currentRoles)
  }
  setPlayerNames(value) {
    const playerLength = value.trim().split(',').filter((item) => !!item).length
    this.setState({
      playerLength
    })
    this.props.updatePlayerNames(value)
  }
  nextScreen() {
    const result = this.props.validateRules()
    if (result.valid) {
      this.props.randomRoles()
      this.props.navigation.navigate('Assigning')
    } else {
      alert(result.message)
    }
  }
  render() {
    return (
      <SetUpView>
          <Container height={180}>
            <TextView>
              <TextNumber>extended <PlayerNumberTextBold>roles</PlayerNumberTextBold></TextNumber>
            </TextView>
            <ListPickers>
              {this.props.roles.map((i) =>
                <Picker
                  key={i.name}
                  onPress={()=> {this.setRoles(i.name)}}
                  active={i.active}
                >
                  <PlayerRoleText active={i.active}>{i.name}</PlayerRoleText>
                </Picker>
              )}
            </ListPickers>
          </Container>
          <Container height={120}>
            <TextView>
              <TextNumber>player <PlayerNumberTextBold>numbers</PlayerNumberTextBold></TextNumber>
            </TextView>
            <ListPlayerNumbers>
              {[7, 8, 9, 10, 11, 12, 13, 14, 15].map((i) =>
                i == this.props.playerNumber ?
                <PlayersNumber
                  active
                  key={i}
                  onPress={()=> {this.props.updatePlayerNumber(i); this.setPlayerNumber(i)}}
                  >
                  <PlayerNumberTextBold>{i}</PlayerNumberTextBold>
                </PlayersNumber>
              :
                <PlayersNumber
                  key={i}
                  onPress={()=> {this.props.updatePlayerNumber(i); this.setPlayerNumber(i)}}
                  >
                  <PlayerNumberText>{i}</PlayerNumberText>
                </PlayersNumber>
              )}
            </ListPlayerNumbers>
          </Container>
          <Container height={100}>
            <TextView>
              <TextNumber>player <PlayerNumberTextBold>names</PlayerNumberTextBold>
              </TextNumber>
            </TextView>
            <NumberHelper>
              <TextNumber>{`${this.state.playerLength} / ${this.state.playerNumber}`}</TextNumber>
            </NumberHelper>
            <TextInputCustom
              multiline={true}
              numberOfLines={2}
              placeholder={'Alex, Bella, Charles, ...'}
              placeholderColor={color.black}
              onChangeText={this.setPlayerNames}
              value={this.props.playerNames}
            />
          </Container>
      </SetUpView>
    )
  }
}

export default SetUp;
