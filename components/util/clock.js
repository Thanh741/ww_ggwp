import React from 'react'
import { View, Text, Image, TextInput, Dimensions, Button, TouchableOpacity } from 'react-native';
import styled from 'styled-components'

const CenterView = styled.View `
  alignItems: center;
  justifyContent: center;
  display:flex;
  flexDirection: column;
`
const BoldColorText = styled.Text`
  font-weight: bold;
  fontFamily: 'Avenir Next LT Pro';
  font-size: 25px
`
const DiscussButton = styled.View`
  background: orange;
  padding: 10px 15px;
  border-radius: 3px;
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
        <BoldColorText>{seconds + 's'}</BoldColorText>
        <DiscussButton>
          <TouchableOpacity onPress={this.props.toggleDiscussion}>
            <BoldColorText>Stop</BoldColorText>
          </TouchableOpacity>
        </DiscussButton>
      </CenterView>
    )
  }
}

export default Clock;
