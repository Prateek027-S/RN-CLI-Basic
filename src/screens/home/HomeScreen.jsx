import { useNavigation } from '@react-navigation/native';
import { memo, useCallback, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

const ItemList = memo(({items, handlePress}) => {
  console.log('List rendered...')
  return (
    <View>
      {
        items.map((item) => (
          <TouchableOpacity key={item} onPress={() => handlePress(item)}>
            <Text>{item}</Text>
          </TouchableOpacity>
        ))
      }
    </View>
  )
})

const HomeScreen = () => {
  const navigation = useNavigation();
  const [count, setCount] = useState(0);
  const [numbers] = useState([1, 2, 5, 6, 12]);

  const squaredNumbers = useMemo(() => {
     console.log("Calculating squares.");
    return numbers.map(num => num*num);
  }, [numbers]);

  const handleItemPress = useCallback((item) => {
    console.log('Clicked: ', item);
  }, [])

  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      <Text>Count: {count}</Text>
      <TouchableOpacity onPress={() => {setCount(count + 1)}} style={{backgroundColor: 'cyan', padding: 6, borderRadius: 6}}>
        <Text>Increment Count</Text>
      </TouchableOpacity>
      
      <ItemList items={squaredNumbers} handlePress={handleItemPress} />

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