import React from 'react'
import { View, Text, Image, TextInput, Dimensions, Button, TouchableOpacity } from 'react-native';
import styled from 'styled-components'

const CenterView = styled.View `
  flex: 1;
  alignItems: center;
  justifyContent: center;
`
const BoldColorText = styled.Text`
  font-weight: bold;
`
class Clock extends React.Component {
  constructor() {
    super()
    this.state = {
      seconds: 90
    }
  }

  componentDidMount () {
    this._cancelInterval = setInterval(() => {
      const seconds = this.state.seconds - 1
      console.log('here', seconds);
      this.setState({seconds})
      if (seconds === 0) {
        clearInterval(this._cancelInterval)
        this.props.toggleDiscussion()
      }
    }, 1000)
  }

  componentWillUnmount () {
    clearInterval(this._cancelInterval)
  }

  render() {
    let { seconds } = this.state
    return (
      <CenterView>
        <BoldColorText>{seconds}</BoldColorText>
        <TouchableOpacity onPress={this.props.toggleDiscussion}>
          <BoldColorText>Stop</BoldColorText>
        </TouchableOpacity>
      </CenterView>
    )
  }
}

export default Clock;
