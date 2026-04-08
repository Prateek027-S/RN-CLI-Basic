import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

const Box = ({isSelected, onSelect}) => {
  return (
    <TouchableOpacity
      onPress={onSelect}
      style={{width: 50, height: 50, margin: 5, backgroundColor: isSelected ? 'blue': 'transparent', borderWidth: 1}}
     />
  )
}

const Grid = ({n}) => {
  const [grid, setGrid] = useState(Array(n).fill().map(() => Array(n).fill(false)));

  const handlePress = (row, col) => {
    setGrid(prevGrid => {
      const newGrid = prevGrid.map((r) => [...r]);
      newGrid[row][col] = !newGrid[row][col];
      return newGrid;
    })
  }

  const rows = []
  for (let i = 0; i < n; i++) {
    const cols = [];
    for(let j = 0; j < n; j++) {
      cols.push(<Box key={`${i}-${j}`} onSelect={() => handlePress(i, j)} isSelected={grid[i][j]} />)
    }
    rows.push(
      <View style={{flexDirection: 'row'}}>
        {cols}
      </View>
    )
  }

  return (
    <View>
      {rows}
    </View>
  )
}

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      <Grid n={4} />
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