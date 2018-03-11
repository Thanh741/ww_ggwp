import React, { Component } from 'react';

import { View, Text, Image, TextInput, Dimensions, Button, TouchableOpacity } from 'react-native';

import styled from 'styled-components'
import { Actions } from 'react-native-router-flux'
import { color } from '../../resource'


const win = Dimensions.get('window');

const SetUpView = styled.View`
  flex: 1;
  background-color: ${color.yellow};
`
const PickerContainer = styled.View`
  height: ${win.height / 2};
  background: ${color.black};
  padding: 5px 20px;
`
const TextContainer = styled.View`
  flex: 1;
  margin: 5px 20px;
`
const TextNumber = styled.Text`
  font-size: 20px;
  alignItems: center;
  color: ${color.black};
  alignItems: center;
`;
const TextName = styled.Text`
  font-size: 20px;
  alignItems: center;
  color: ${color.black};
  alignItems: center;
`;
const ListPickers = styled.View`
  margin: 0;
  padding: 0;
  flex: 1;
  flexDirection: row
  height: 100px;
`
const PlayersNumber = styled.TouchableOpacity`
  flex: 1;
  border: 1px solid ${color.yellow};
  alignItems: center;
  justifyContent: center;
  height: 50;
  backgroundColor: ${(props) => props.active ? color.yellow : color.black}
`;
const InputStyling = styled.TextInput`
`;
const PlayerNumberText = styled.Text`
  color: ${(props) => props.active ? color.black : color.white}
`;
class SetUp extends Component {
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
  }
  setPlayerNumber(number) {
    console.log(number);
    this.setState({
      playerNumber: number
    })
  }
  setRoles(roles) {
    let currentRoles = this.state.roles;
    currentRoles = currentRoles.map((role) => {
      if (role.name == roles) {
        role.active = !role.active
      }
      return role
    })
    currentRoles
    this.setState({
      roles: currentRoles
    })
  }
  setPlayerNames(value) {
    const playerLength = value.trim().split(',').filter((item) => !!item).length
    this.setState({
      playerNames: value,
      playerLength
    })

  }
  render() {
    return (
      <SetUpView>
        <PickerContainer>
          <TextNumber>Players Numbers</TextNumber>
          <ListPickers>
            {[7, 8, 9, 10, 11, 12].map((i) =>
              i == this.state.playerNumber ?
              <PlayersNumber
                active
                key={i}
                onPress={()=> {this.setPlayerNumber(i)}}
                >
                <PlayerNumberText active>{i}</PlayerNumberText>
              </PlayersNumber>
            :
              <PlayersNumber
                key={i}
                onPress={()=> {this.setPlayerNumber(i)}}
                >
                <PlayerNumberText>{i}</PlayerNumberText>
              </PlayersNumber>
            )}
          </ListPickers>
          <TextNumber>Bonus Characters</TextNumber>
          <ListPickers>
            {this.state.roles.map((i) =>
              <PlayersNumber
                key={i.name}
                onPress={()=> {this.setRoles(i.name)}}
                active={i.active}
              >
                <PlayerNumberText active={i.active}>{i.name}</PlayerNumberText>
              </PlayersNumber>
            )}
          </ListPickers>
        </PickerContainer>
        <TextContainer>
          <TextName>Player Names ({this.state.playerLength})</TextName>
          <TextInput
            multiline={true}
            numberOfLines={4}
            placeholder={'Alex, Bella, Charles, ...'}
            placeholderColor={color.black}
            onChangeText={this.setPlayerNames}
            value={this.state.playerNames}
          />
        </TextContainer>
      </SetUpView>
    )
  }
}

export default SetUp;
