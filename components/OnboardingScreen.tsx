import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider'
import { router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LinearGradient } from 'expo-linear-gradient'

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
    await AsyncStorage.setItem('onboardingCompleted', 'true')
    router.replace('/')
  }

  if (showHome) return null // Skip if onboarding is already seen

  const renderButton = (label: string) => (
    <LinearGradient
      colors={['#E87C39', '#FF9B50']}
      style={styles.gradientButton}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </LinearGradient>
  )


  return (
    <AppIntroSlider
      style={{ backgroundColor: "white" , display: "flex" }}
      data={slides}
      renderItem={({ item }: { item: Slide }) => (
        <View style={styles.slide}>
          <Image source={item.image} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.text}>{item.text}</Text>
          </View>
        </View>
      )}
      onDone={handleDone}
      // showSkipButton
      showPrevButton
      onSkip={handleDone}
      activeDotStyle={styles.activeDot}
      dotStyle={styles.dot}
      
      renderNextButton={() => renderButton('Next')}
      renderPrevButton={() => renderButton('Prev')}
      renderSkipButton={() => renderButton('Skip')}
      renderDoneButton={() => renderButton('Done')}
    />
  )
}

const styles = StyleSheet.create({
  slide: {
    // flex: 1,
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: '110%',
    // backgroundColor: '#FFF',
  },
  image: {
    // width: width * 0.9,
    // height: height * 0.55,
    // resizeMode: 'contain',
    flex: 1,
    // width: width,
    // height: height,
    // resizeMode: 'cover',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    color: '#333',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    color: '#555',
  },
  gradientButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  activeDot: {
    backgroundColor: '#E87C39',
    width: 20,
    height: 8,
    borderRadius: 4,
  },
  dot: {
    backgroundColor: 'gray',
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
  },
  button: {
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
  },
  // buttonText: {
  //   color: "#fff",
  //   fontSize: 16,
  // },
  pageIndicator: {
    fontSize: 16,
    fontWeight: "bold",
  },
})
