// redux
import React from 'react'
import { View, Text, TouchableOpacity, ViewStyle } from 'react-native'
import { Provider } from 'react-redux'
import 'react-native-gesture-handler'
import { DrawerHeaderProps, DrawerNavigationProp } from '@react-navigation/drawer'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import Logo from '../../assets/logo.svg'
import { ParamListBase } from '@react-navigation/native'
import Colors from '../../style/Colors'
import { shadowCrossPlatform } from '../../style/Shadow'

const LayoutStyles: Record<string, ViewStyle> = {
  WhiteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingVertical: 20,
    backgroundColor: Colors.White,
    ...shadowCrossPlatform({
      elevation: 10,
      color: '#9799C1',
      opacity: 0.18,
      offsetY: 2,
    }),
  },
}

const BurgerMenu = ({ navigation }: { navigation: DrawerNavigationProp<ParamListBase, string, undefined> }) => {
  return (
    <TouchableOpacity onPress={() => navigation.openDrawer()}>
      {/* 3 padding and background for providing clickable area */}
      <View style={{ padding: 3, backgroundColor: Colors.White }}>
        <View style={{ width: 16, height: 2, backgroundColor: Colors.Dark, marginBottom: 4 }}></View>
        <View style={{ width: 10, height: 2, backgroundColor: Colors.Dark, marginBottom: 4 }}></View>
        <View style={{ width: 12, height: 2, backgroundColor: Colors.Dark, marginBottom: 0 }}></View>
      </View>
    </TouchableOpacity>
  )
}

const Header: React.FC<DrawerHeaderProps> = ({ layout, options, route, navigation }) => {
  // gives error: (so also disabled provider in App.tsx)
  //  React has detected a change in the order of Hooks called by
  // const insets = useSafeAreaInsets();
  return (
    <SafeAreaView edges={['top']}>
      {/* <View style={{ paddingTop: insets.top }}> */}
      <View style={LayoutStyles.WhiteHeader}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Logo />
        </TouchableOpacity>
        <BurgerMenu navigation={navigation} />
      </View>
      {/* </View> */}
    </SafeAreaView>
  )
}

export default Header
