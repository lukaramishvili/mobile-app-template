import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import ScreenWrapper from '../components/layout/ScreenWrapper'

const Home: React.FC = () => {
  return (
    <ScreenWrapper>
      <Text>Open up Home.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </ScreenWrapper>
  )
}

export default Home
