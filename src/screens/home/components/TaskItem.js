import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

const TaskItem = ({ item, toggleComplete, deleteTask }) => {
  return (
    <View style={styles.taskItem}>
      <TouchableOpacity onPress={toggleComplete}>
        <Text style={styles.taskText(item?.completed)}>{item?.task}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={deleteTask}>
        <Text style={{color: 'white'}}>Delete</Text>
      </TouchableOpacity>
    </View>
  )
}

export default TaskItem

const styles = StyleSheet.create({
    taskItem: {
      borderBottomWidth: 1,
      paddingVertical: 8,
      width: '80%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    taskText: (isCompleted) => ({
      textDecorationLine: isCompleted ? 'line-through' : null
    }),
    deleteButton: {
      backgroundColor: 'red',
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 6,
      alignItems: 'center'
    }
})