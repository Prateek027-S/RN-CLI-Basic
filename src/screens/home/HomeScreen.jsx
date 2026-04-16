import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList } from 'react-native'
import TaskItem from './components/TaskItem'
import AsyncStorage from '@react-native-async-storage/async-storage'

const HomeScreen = () => {
  const [inputTask, setInputTask] = useState('')
  const [tasksList, setTasksList] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  const handleAddTask = () => {
    if(inputTask?.trim().length) {
      const newTaskId = Date.now()
      setTasksList(prevTasks => [...prevTasks, {id: newTaskId, task: inputTask.trim(), completed: false}]);
      setInputTask('');
    }
  }

  const handleToggleComplete = (item) => {
    const newTasksList = tasksList.map(itm => ({...itm, completed: (itm.id === item.id) ? !itm.completed : itm.completed}))
    
    setTasksList(newTasksList)
  }

  const handleDeleteTask = (item) => {
    const newTasksList = tasksList.filter(itm => itm.id !== item.id)
    setTasksList(newTasksList)
  }
  /*
  useEffect(() => {
    const loadSavedTasks = async() => {
      const tasksData = await AsyncStorage.getItem('TASKS');
      if(tasksData) {
        setTasksList(JSON.parse(tasksData))
      }
      setIsLoaded(true)
    }

    loadSavedTasks()
  }, [])

  useEffect(() => {
    if(!isLoaded) return

    const saveTasks = async() => {
      await AsyncStorage.setItem('TASKS', JSON.stringify(tasksList))
    }
    saveTasks()
  }, [tasksList, isLoaded])
  */

  return (
    <View style={styles.container}>
      <Text style={{marginVertical: 20}}>To Do List</Text>
      <View style={{flexDirection: 'row', gap: 10, marginBottom: 10}}>
        <TextInput
          value={inputTask}
          onChangeText={setInputTask}
          placeholder='Enter your task'
          style={styles.taskInput}
        />
        <TouchableOpacity style={styles.button} onPress={handleAddTask}>
          <Text style={{color: 'white'}}>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasksList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => <TaskItem item={item} toggleComplete={() => handleToggleComplete(item)} deleteTask={() => handleDeleteTask(item)} />} 
      />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: 'blue',
    borderRadius: 5,
    alignItems: 'center'
  },
  taskInput: {
    width: '70%',
    borderRadius: 16,
    padding: 8,
    borderWidth: 1
  }
})