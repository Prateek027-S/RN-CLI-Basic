import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList } from 'react-native'
import TaskItem from './components/TaskItem'
// import { AsyncStorage } from '@react-native-async-storage/async-storage'

const HomeScreen = () => {
  const [inputTask, setInputTask] = useState('')
  const [tasksList, setTasksList] = useState([])

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
  
  /* useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('TASKS');
        if (storedTasks) {
          setTasksList(JSON.parse(storedTasks));
        }
      } catch (err) {
        console.error('Error while fetching tasks from Async Storage: ', err)
      }
    }
    loadTasks()
  }, [])

  useEffect(() => {
    const saveTasksList = async () => {
      try {
        await AsyncStorage.setItem('TASKS', JSON.stringify(tasksList))
      } catch(err) {
        console.error('Error while saving in Async Storage: ', err)
      }
    }
    saveTasksList()
  }, [tasksList]) */

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