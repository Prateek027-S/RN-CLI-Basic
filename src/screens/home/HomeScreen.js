import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import SuggestionList from './components/SuggestionList';
import useDebounce from '../../hooks/useDebouncedValue';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const debouncedValue = useDebounce(search, 500);
  
  const handleSearch = async() => {
    try {
      setIsFetching(true);
      if(debouncedValue.trim().length === 0) {
        setFilteredData([]);
      } else {
        const res = await fetch(`https://dummyjson.com/users/search?q=${debouncedValue.trim()}`);
        if (!res.ok) {
          throw new Error("HTTP error " + res.status);
        }
        const data = await res.json();
        console.log('Search results: ', data);
        setFilteredData(data?.users?.map(user => ({userId: user.id, fullName: user.firstName+' '+user.lastName})) || []);
      }
    } catch (err) {
      console.error('Error in handleSearch: ', err);
    } finally {
      setIsFetching(false);
    }
  }

  useEffect(() => {
    handleSearch();
  }, [debouncedValue]);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     handleSearch(search);
  //   }, 500);

  //   return () => clearTimeout(timer);
  // }, [search]);
  
  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      <TextInput
        value={search}
        onChangeText={(text) => {
          setIsFetching(true);
          setSearch(text);
        }}
        placeholder='Search'
        style={styles.searchInput}
       />
       {(search.trim().length > 0) && <View style={{width: '90%', alignItems: 'center'}}>
        <SuggestionList data={filteredData} isFetching={isFetching} />
       </View>}
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
  },
  searchInput: {
    borderWidth: 1,
    width: '90%',
    borderRadius: 8,
    padding: 6,
  }
})