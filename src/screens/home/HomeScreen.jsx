import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Clock from './component/Clock'

const HomeScreen = () => {
  const navigation = useNavigation();
  
  /* 
  Red light: 4000ms
  Yellow light: 500ms
  Green light: 3000ms
  */

  const trafficLightColors = [
    {id: 0, color: "red", duration: 4000},
    {id: 1, color: "yellow", duration: 500},
    {id: 2, color: "green", duration: 3000},
  ]
  const [currentLightIndex, setCurrentLightIndex] = useState(0);
  const timerRef = useRef(null);
  const [runTrafficLight, setRunTrafficLight] = useState(false);

  function startTrafficLight() {
    if(!runTrafficLight) {
      setRunTrafficLight(true);
    }
  }

  useEffect(() => {
    if (runTrafficLight) {
      timerRef.current = setTimeout(() => {
        setCurrentLightIndex(prevIndex => (prevIndex + 1) % trafficLightColors.length);
      }, trafficLightColors[currentLightIndex].duration)
    }

    return () => clearTimeout(timerRef.current)
  }, [currentLightIndex, runTrafficLight])


  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      <TouchableOpacity style={styles.button} onPress={() => {startTrafficLight()}}>
        <Text style={{color: 'white'}}>Start</Text>
      </TouchableOpacity>
      <View style={styles.trafficLightContainer}>
        {
          trafficLightColors.map((item) => {
            return (
            <View key={item.id} style={{
              width: 20, 
              height: 20, 
              borderRadius: 60, 
              backgroundColor: (trafficLightColors[currentLightIndex].id === item.id) ? item.color : "white"}} 
            />
          )})
        }
      </View>
      <Clock />
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
  },
  trafficLightContainer: {
    borderWidth: 1,
    padding: 8,
    gap: 10,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "gray"
  },
  light: (color) => ({
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: color
  })
})