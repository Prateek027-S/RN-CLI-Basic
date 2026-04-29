import React, { useEffect, useState } from "react"
import { StyleSheet, Text, View } from "react-native"

const Clock = React.memo(({type = "12"}) => {
    const [currentTime, setCurrentTime] = useState(() => new Date());
    
    function formatTime(date) {
        let hours = date?.getHours();
        if (type === "12") {
            hours = (hours % 12) || 12;
        }
        return `${String(hours)?.padStart(2, "0")}:${String(date?.getMinutes())?.padStart(2, "0")}:${String(date?.getSeconds())?.padStart(2, "0")}`
    }
    
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000)

        return () => {clearInterval(timer)}
    }, [])

    return (
        <View style={styles.clockContainer}>
            <Text>{formatTime(currentTime)}</Text>
        </View>
    )
})

export default Clock;

const styles = StyleSheet.create({
    clockContainer: {
        borderWidth: 1,
        padding: 8,
        marginTop: 20
    }
})