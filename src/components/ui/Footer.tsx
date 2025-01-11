import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { FONTS } from '../../utils/Constants'

const Footer = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => Linking.openURL('https://github.com/ddheer29')}>
        <Text style={styles.text}>
          Made with ♥︎
        </Text>
        <Text style={styles.text2}>
          by - Divyang Dheer
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default Footer

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
  },
  text: {
    // fontFamily: FONTS.twinkle,
    fontSize: RFValue(12),
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {
      width: 2,
      height: 2,
    },
    textShadowRadius: 2
  },
  text2: {
    // fontFamily: FONTS.twinkle,
    fontSize: RFValue(16),
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {
      width: 2,
      height: 2,
    },
    textShadowRadius: 2
  }
})