import React from 'react'
import { View, Text, Button } from 'react-native'
import styled from 'styled-components'

const AssignView = styled.View`
`
const RoleText = styled.Text`

`

class Assigning extends React.Component {
  constructor() {
    super();
    this.state = {
      showRole: false
    }
  }
  render() {
    const { player, nextPlayer } = this.props
    const { showRole } = this.state
    return (
      <View>
        <Text>{player.name}</Text>
        {
          showRole
          ?
            <View>
              <RoleText>{player.role}</RoleText>
              <Button
                title="HIDE"
                onPress={() => {
                  this.setState({showRole: false})
                  nextPlayer()
                }}
              />
            </View>
          :
          <Button
            title="SHOW"
            onPress={() => {this.setState({showRole: true})}}
          />
        }
      </View>
    )
  }
}
export default Assigning
