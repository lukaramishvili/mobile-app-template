import React from 'react'
import { View, Text } from 'react-native'

const Loader: React.FC = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Loading...</Text>
    </View>
  )
}

export default Loader
