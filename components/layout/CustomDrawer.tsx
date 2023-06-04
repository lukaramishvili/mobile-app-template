import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native'
import React from 'react'
import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer'

import { useAppSelector } from '../../store'
import api from '../../api'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loader from '../Loader'

import { UserPrivateRoute } from '../../navigation'
import { UnauthorizedRoute } from '../../navigation'
// @ts-ignore
import BurgerCloseIcon from '../../assets/burger-close.svg'
import Colors from '../../style/Colors'

const DrawerContentScrollViewStyle = DrawerContentScrollView

const CustomDrawer = ({ navigation }: DrawerContentComponentProps) => {
  const auth = useAppSelector((data) => data.auth)

  const [logout, { isLoading }] = api.useLogoutMutation()

  // logout
  const Logout = async (event: any) => {
    event.preventDefault()
    try {
      await logout({}).unwrap()
      AsyncStorage.clear()
      navigation.navigate(`LoginScreen` as never)
    } catch (error) {
      alert('logout error | ' + error)
    }
  }

  return isLoading ? (
    <Loader />
  ) : (
    <View style={{ flex: 1, paddingLeft: 25, paddingRight: 25 }}>
      <DrawerContentScrollViewStyle>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: Colors.White,
            marginBottom: 24,
          }}
        >
          <Text style={{ color: Colors.Dark, fontSize: 18, fontWeight: 'bold', marginTop: 8 }}>Menu</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.dispatch(DrawerActions.closeDrawer())
              // navigation.closeDrawer();// does not work here
            }}
          >
            <BurgerCloseIcon />
          </TouchableOpacity>
        </View>
        <View style={{ height: 150 }}></View>
        {/* Every type of user */}
        <MenuItem onPress={() => navigation.navigate('Home' as any)}>
          <Text>Home</Text>
        </MenuItem>
        {/*Authorized user*/}
        <UserPrivateRoute>
          <Text>
            {auth.user?.firstName} {auth.user?.lastName}
          </Text>
          <TouchableOpacity onPress={Logout}>
            <Text>Log out</Text>
          </TouchableOpacity>
          <MenuItem onPress={() => navigation.navigate('Profile' as any)}>
            <Text>Profile</Text>
          </MenuItem>
        </UserPrivateRoute>
        {/*Unauthorized user*/}
        <UnauthorizedRoute>
          <>
            <MenuItem onPress={() => navigation.navigate('Login' as any)}>
              <Text>Log in</Text>
            </MenuItem>
            <MenuItem onPress={() => navigation.navigate('Register' as any)}>
              <Text>Register</Text>
            </MenuItem>
            <MenuItem onPress={() => navigation.navigate('ResetPassword' as any)}>
              <Text>Reset Password</Text>
            </MenuItem>
          </>
        </UnauthorizedRoute>
      </DrawerContentScrollViewStyle>
    </View>
  )
}

const MenuItem = ({ children, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        marginBottom: 10,
        paddingVertical: 5,
      }}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  )
}
export default CustomDrawer
