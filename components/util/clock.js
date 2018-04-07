import React from 'react'
import { View, Text, Image, TextInput, Dimensions, Button } from 'react-native';

class Clock extends React.Component {
  constructor() {
    super()
    this.state = {
      seconds: 9
    }
  }

  componentDidMount () {
    this._cancelInterval = setInterval(() => {
      const seconds = this.state.seconds - 1
      console.log('here', seconds);
      this.setState({seconds})
      if (seconds === 0) {
        clearInterval(this._cancelInterval)
        this.props.changeShift()
      }
    }, 1000)
  }

  componentWillUnmount () {
    clearInterval(this._cancelInterval)
  }

  render() {
    let { seconds } = this.state
    return (
      <View>
        <Text>{seconds}</Text>
        <Button
          onPress={() => {this.props.changeShift()}}
          title="NIGHT COME"
        />
      </View>
    )
  }
}

export default Clock;
