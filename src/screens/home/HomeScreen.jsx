import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

const HomeScreen = () => {
  const navigation = useNavigation();
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if(isRunning) {
      // But will not consider the time the app was in bg because JS thread pauses
      /* timerRef.current = setInterval(() => {
        setTime(prevTime => prevTime+1);
      }, 1000); */

      startTimeRef.current = Date.now() - time * 1000; //convert the time when timer started/app sent to bg into timestamp

      timerRef.current = setInterval(() => {
        const elapsedTime = Math.floor((Date.now() - startTimeRef.current) / 1000);
        setTime(elapsedTime);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => {clearInterval(timerRef.current)}
  }, [isRunning])

  function handleToggleTimer() {
    setIsRunning(!isRunning);
  }

  function resetTime() {
    setIsRunning(false);
    setTime(0);
  }

  function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const sec = Math.floor(seconds % 60);
    
    return String(hours).padStart(2, "0") + ':'+ String(minutes).padStart(2, "0")+ ':' + String(sec).padStart(2, "0");
  }

  return (
    <View style={styles.container}>
      <Text>{formatTime(time)}</Text>
      <TouchableOpacity style={styles.button} onPress={handleToggleTimer}>
        <Text style={{color: 'white'}}>Start/Pause</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={resetTime}>
        <Text style={{color: 'white'}}>Reset</Text>
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