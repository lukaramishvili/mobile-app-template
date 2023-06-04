import AsyncStorage from '@react-native-async-storage/async-storage'

export const getAuthToken = async () => {
  try {
    const data = await AsyncStorage.getItem('authToken')
    if (data !== null) {
      return data
    }
  } catch (error) {
    console.log(error)
  }
}

export const setAuthToken = (token: string) => {
  if (token) {
    AsyncStorage.setItem('authToken', token)
  } else {
    AsyncStorage.removeItem('authToken')
  }
}
