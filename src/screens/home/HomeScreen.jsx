import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import {MyThemeContext} from "../../../ThemeContext"

const HomeScreen = () => {
  const navigation = useNavigation();
  const {theme} = useContext(MyThemeContext);
  const isDark = theme === "dark";

  return (
    <View style={[
      styles.container, 
      { backgroundColor: isDark ? '#44444E' : 'white' }
    ]}>
      <Text style={{color: isDark ? "white" : "black"}}>HomeScreen</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Details')}>
        <Text style={{color: 'white'}}>Go to Details</Text>
      </TouchableOpacity>
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