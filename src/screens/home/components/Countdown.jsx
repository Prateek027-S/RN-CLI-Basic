import { useEffect, useRef, useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

const Countdown  = ({initial}) => {
    const [time, setTime] = useState(initial);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);
    const endTimeRef = useRef(null);
    

    useEffect(() => {
        if (isRunning) {
            // intervalRef.current = setInterval(() => {
            //     setTime(prevTime => {
            //         if(prevTime <= 1) {
            //             clearInterval(intervalRef.current);
            //             return 0;
            //         }
            //         return prevTime - 1;
            //     })
            // }, 1000);

            endTimeRef.current = Date.now() + time * 1000;
            intervalRef.current = setInterval(() => {
                const remainingTime = Math.ceil((endTimeRef.current - Date.now()) / 1000);

                if(remainingTime <= 0) {
                    clearInterval(intervalRef.current);
                    setTime(0);
                    setIsRunning(false);
                } else {
                    setTime(remainingTime)
                }
            }, 1000);
        } else {
            clearInterval(intervalRef.current);
        }
        return () => clearInterval(intervalRef.current);
    }, [isRunning])

    function toggleCountdown() {
        setIsRunning(!isRunning);
    }

    function resetCountdown() {
        setIsRunning(false);
        setTime(initial);
    }

    function formatTime(seconds) {
        const hours = Math.floor((seconds / 3600));
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);

        return String(hours).padStart(2, "0")+":"+String(minutes).padStart(2, "0")+":"+String(secs).padStart(2, "0")
    }
    
    return (
        <View style={styles.container}>
            <Text>{formatTime(time)}</Text>
            <TouchableOpacity style={styles.button} onPress={toggleCountdown}>
                <Text style={{color: 'white'}}>Start/Pause</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={resetCountdown}>
                <Text style={{color: 'white'}}>Reset</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Countdown;

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