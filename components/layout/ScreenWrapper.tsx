import React from 'react'
import { View } from 'react-native'
import Colors from '../../style/Colors'

const ScreenWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <View style={{ flex: 1, backgroundColor: Colors.Background, padding: 12 }}>{children}</View>
}

export default ScreenWrapper
