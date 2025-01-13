import { Alert, Animated, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { FC, useEffect, useRef, useState } from 'react'
import { commonStyles } from '../styles/commonStyles'
import GamerHeader from '../components/game/GamerHeader'
import { useRoute } from '@react-navigation/native'
import { UseSound } from '../navigation/SoundContext'
import GameFooter from '../components/game/GameFooter'
import GameTile from '../components/game/GameTile'
import { goBack } from '../utils/NavigationUtil'
import { screenWidth } from '../utils/Constants'
import LottieView from 'lottie-react-native'
import { useLevelStore } from '../state/useLevelStore'

const GameScreen: FC = () => {

  const route = useRoute();
  const item = route?.params as any;

  const { playSound } = UseSound()

  const [gridData, setGridData] = useState<any>(null);
  const [totalCount, setTotalCount] = useState<number>(0)
  const [time, setTimer] = useState<any>(null)
  const [collectedCandies, setCollectedCandies] = useState<number>(0)

  const [showAnimation, setShowAnimation] = useState<boolean>(false);
  const [firstAnimation, setFirstAnimation] = useState<boolean>(false);

  const { completedLevel, unlockLevel } = useLevelStore();

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;



  useEffect(() => {
    if (item?.level) {
      setGridData(item?.level?.grid)
      setTotalCount(item?.level?.pass)
      setTimer(item?.level?.time)
    }
  }, [])


  useEffect(() => {
    if (time === 0) {
      handleGameOver()
    }
  }, [time])


  const handleGameOver = () => {
    if (collectedCandies >= totalCount) {
      completedLevel(item?.level?.id, collectedCandies);
      unlockLevel(item?.level?.id + 1);
      Alert.alert('Congratulations!', 'You have completed the level!', [
        {
          text: 'Next Level',
          onPress: () => goBack()
        }
      ])
    } else {
      Alert.alert('Game Over!', 'You have failed to complete the level!', [
        {
          text: 'Phew! I will win next time',
          onPress: () => goBack()
        }
      ])
    }
  }

  useEffect(() => {
    if (time && time > 0) {
      const timeInterval = setInterval(() => {
        setTimer((prev: number) => {
          if (prev === 1000) {
            clearInterval(timeInterval)
            return 0;
          }
          return prev - 1000;
        })
      }, 1000);
      return () => clearInterval(timeInterval)
    }
  }, [time])

  useEffect(() => {
    if (collectedCandies >= totalCount && totalCount > 0 && !firstAnimation) {
      setShowAnimation(true);
      startHeartBeatAnimation();
    }
  }, [collectedCandies, totalCount])

  const startHeartBeatAnimation = () => {
    playSound('cheer', false);
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true
          }),
          Animated.timing(scaleAnim, {
            toValue: 1.2,
            duration: 800,
            useNativeDriver: true
          }),
        ]),
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 0.8,
            duration: 800,
            useNativeDriver: true
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true
          }),
        ])
      ]), { iterations: 2 }
    ).start(() => {
      setFirstAnimation(true);
      setShowAnimation(false);
    })
  }

  return (
    <ImageBackground style={commonStyles.simpleContainer} source={require('../assets/images/b1.png')}>
      <GamerHeader totalCount={totalCount} collectedCandies={collectedCandies} times={time} />

      {
        gridData && (
          <GameTile
            data={gridData}
            setData={setGridData}
            setCollectedCandies={setCollectedCandies}
          />
        )
      }

      {
        showAnimation && (
          <>
            <Animated.Image
              source={require('../assets/text/t2.png')}
              style={[
                styles.centerImage,
                { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }
              ]}
            />

            <LottieView
              source={require('../assets/animations/confetti_2.json')}
              style={styles.lottie}
              autoPlay
              loop
            />
          </>
        )
      }

      <GameFooter />
    </ImageBackground>
  )
}

export default GameScreen

const styles = StyleSheet.create({
  centerImage: {
    position: 'absolute',
    width: screenWidth * 0.8,
    height: 180,
    resizeMode: 'contain',
    alignSelf: 'center',
    top: '15%',
  },
  lottie: {
    position: 'absolute',
    width: screenWidth * 0.8,
    height: 180,
    resizeMode: 'contain',
    alignSelf: 'center',
    top: '10%',
  }
})
