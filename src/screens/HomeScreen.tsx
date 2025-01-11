import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { FC, useEffect } from 'react'
import { commonStyles } from '../styles/commonStyles'
import { screenHeight, screenWidth } from '../utils/Constants'
import { useIsFocused } from '@react-navigation/native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { UseSound } from '../navigation/SoundContext'
import LottieView from 'lottie-react-native'

const HomeScreen: FC = () => {
  const { playSound } = UseSound()
  const isFocused = useIsFocused();
  const translateY = useSharedValue(-200);


  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }]
    }
  })

  // useEffect(() => {
  //   if (isFocused) {
  //     playSound('bg', true)
  //   }
  // }, [isFocused])

  useEffect(() => {
    translateY.value = withTiming(0, { duration: 2600 })
  }, [isFocused])


  return (
    <ImageBackground source={require('../assets/images/b2.png')} style={commonStyles.simpleContainer}>
      <Animated.Image
        source={require('../assets/images/banner.png')}
        style={[styles.img, animatedStyle]}
      />
      <LottieView
        source={require('../assets/animations/bird.json')}
        speed={1}
        loop
        autoPlay
        hardwareAccelerationAndroid
        style={styles.lottieView}
      />
    </ImageBackground>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  img: {
    width: screenWidth,
    height: screenWidth * 0.8,
    position: 'absolute',
    top: -20,
    resizeMode: 'contain',
  },
  lottieView: {
    width: 200,
    height: 200,
    position: 'absolute',
    left: -20,
    top: '30%',
    transform: [{ scaleX: -1 }]
  }
})