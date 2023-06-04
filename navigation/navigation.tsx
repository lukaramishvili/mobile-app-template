import { useAppSelector } from '../store'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator, DrawerToggleButton } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import Home from '../screens/Home'
import Header from '../components/layout/Header'
import CustomDrawer from '../components/layout/CustomDrawer'
import Login from '../screens/auth/Login'
import Register from '../screens/auth/Register'
import ForgotPassword from '../screens/auth/ForgotPassword'

const Stack = createNativeStackNavigator()
export const Drawer = createDrawerNavigator()

export function UserPrivateRoute({ children }: any) {
  // const auth = useAuth();
  const auth = useAppSelector((data) => data.auth)
  if (auth.userLoading) {
    return
  }
  return auth.token ? (
    children
  ) : (
    <>
      <Stack.Screen name="LoginScreen" component={Login} options={{ headerShown: false, title: 'გასვლა' }} />
    </>
  )
}

export function UnauthorizedRoute({ children }: any) {
  // const auth = useAuth();
  const auth = useAppSelector((data) => data.auth)
  if (auth.userLoading) {
    return children
  }
  return auth.token ? (
    <>
      <Stack.Screen name="LoginScreen" component={Login} options={{ headerShown: false, title: 'გასვლა' }} />
    </>
  ) : (
    children
  )
}

const StandardScreensNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  )
}

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerShown: true,
          swipeEnabled: true,
          // header: Header,
        }}
        drawerContent={(props) => <CustomDrawer {...props} />}
      >
        <Drawer.Screen name="Mobile App Template" component={StandardScreensNavigator} />
        {/* <Drawer.Screen name="Contact" component={Contact} /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  )
}
