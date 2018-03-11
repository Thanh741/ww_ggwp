import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';


class Navigator extends React.Component {
  render() {
    return (
      <View style={styles.navigator}>
        <Text>A</Text>
        <Text>B</Text>
        <Text>C</Text>
      </View>
    )
  }
}

const styles =  StyleSheet.create({
  navigator: {
    // flexDirection: 'row',
    // justifyContent: 'flex-end',
    // alignItems: 'center',
    height: 100,
    width: 100,
    left: 0,
    right: 0,
    bottom: 2,
    position: 'absolute',

  },
  element: {

  }
})

export default Navigator;
