import { StyleSheet, Text, View } from 'react-native'
import { store } from './store'
import { Provider } from 'react-redux'
import { Navigation } from './navigation'

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
