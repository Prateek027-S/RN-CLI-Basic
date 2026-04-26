import { View, StyleSheet } from 'react-native'
import Countdown from './components/Countdown'

const HomeScreen = () => {

  return (
    <View style={styles.container}>
      <Countdown initial={15} />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
    width: 150,
    alignItems: 'center'
  }
})