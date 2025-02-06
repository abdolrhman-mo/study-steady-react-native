import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider'
import { router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface Slide {
  key: string
  title: string
  text: string
  image: any
}

const { width, height } = Dimensions.get('window')

const slides: Slide[] = [
    {
      key: '1',
      title: 'Welcome to the App!',
      text: 'Browse products easily and buy what you want with a click of a button.',
      image: require('../assets/images/onboarding/onboarding1.png'),
    },
    {
      key: '2',
      title: 'Easy Payment',
      text: 'Safe and fast payment methods to ensure an enjoyable shopping experience.',
      image: require('../assets/images/onboarding/onboarding2.png'),
    },
    {
      key: '3',
      title: 'Fast Delivery',
      text: 'We will deliver your order quickly and safely to your doorstep.',
      image: require('../assets/images/onboarding/onboarding3.png'),
    },
  ]

export default function OnboardingScreen() {
  const [showHome, setShowHome] = useState<boolean>(false)

  const handleDone = async () => {
    // await AsyncStorage.setItem('onboardingCompleted', 'true')
    router.replace('/')
  }

  if (showHome) return null // Skip if onboarding is already seen

  return (
    <AppIntroSlider
      data={slides}
      renderItem={({ item }: { item: Slide }) => (
        <View style={styles.slide}>
          <Image source={item.image} style={styles.image} />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{item.text}</Text>
        </View>
      )}
      onDone={handleDone}
      showSkipButton
      onSkip={handleDone}
    />
  )
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 20,
  },
  image: {
    width: width,
    height: height,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
})