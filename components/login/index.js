import React, { Component } from 'react';

import { View, Text, Image, TextInput, Dimensions, Button } from 'react-native';

import styled from 'styled-components'
// import { Actions } from 'react-native-router-flux'

import { LOGO } from '../../resource/';

const win = Dimensions.get('window');

const LoginView = styled.View`
  flex: 1;
  alignItems: center;
`
const StartButtonView = styled.View`
  position: absolute;
  justifyContent: center;
  width: ${win.width / 3};
  top: ${win.height / 2.5};
`

const ImageContainer = styled.Image`
    flex: 1;
    opacity: 0.1;
`

class Login extends Component {
  constructor() {
    super();
    this.redirectToHome = this.redirectToHome.bind(this);
  }
  redirectToHome() {
    // Actions.home()
  }
  render() {
    return (
      <LoginView>
        <ImageContainer source={LOGO}  resizeMode={'contain'} />
        <StartButtonView>
          <Button
            title="PRESS ME"
            color="#841584"
            onPress={this.redirectToHome}
          />
        </StartButtonView>
      </LoginView>
    )
  }
}

export default Login;
