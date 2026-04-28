/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar, StyleSheet, Text, TouchableOpacity } from 'react-native';
import {
  SafeAreaProvider
} from 'react-native-safe-area-context';
import DetailsScreen from './src/screens/details/DetailsScreen';
import HomeScreen from './src/screens/home/HomeScreen';
import { useState } from 'react';
import { MyThemeContext } from './ThemeContext';

const Stack = createNativeStackNavigator();

function App() {
  const [theme, setTheme] = useState("light");
  const isDark = (theme === "dark");

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
  }

  return (
    <SafeAreaProvider>
      <MyThemeContext.Provider value={{theme, toggleTheme}}>
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
        <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Details" component={DetailsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
        <TouchableOpacity
          onPress={toggleTheme} 
          style={styles.toggleButton(isDark)}>
          <Text style={{color: isDark ? "white" : "black"}}>Toggle Theme</Text>
        </TouchableOpacity>
      </MyThemeContext.Provider>
    </SafeAreaProvider>
  );
}

export default App;

const styles = StyleSheet.create({
  toggleButton: (isDark) => ({
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 6, 
    position: 'absolute', 
    bottom: 130, 
    right: 20, 
    borderWidth: 1, 
    borderRadius: 60,
    backgroundColor: isDark ? "gray" : "white" 
  })
})
