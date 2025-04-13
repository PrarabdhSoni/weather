import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function AddCityScreen({ navigation }) {

    const [city, setCity] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const fetchSuggestions = async (text) => {
      if (text) {
          const apiKey = 'ae05868a412080e0bc741f1c70d7f645'; // Use your own API key
          try {
              const response = await fetch(
                  `http://api.openweathermap.org/geo/1.0/direct?q=${text}&limit=5&appid=${apiKey}`
              );
              const data = await response.json();
              setSuggestions(data); // Update suggestions based on API response
          } catch (error) {
              console.error('Error fetching city suggestions:', error);
          }
      } else {
          setSuggestions([]); // Clear suggestions if input is empty
      }
    };

    const handleSelectCity = async (cityObj) => {
        try {
          const storedCities = await AsyncStorage.getItem('cities');
          const parsedCities = storedCities ? JSON.parse(storedCities) : [];
      
          // Avoid duplicates
          const alreadyExists = parsedCities.find(
            c => c.name === cityObj.name && c.lat === cityObj.lat && c.lon === cityObj.lon
          );
          if (alreadyExists) {
            navigation.navigate('Home')
          };
      
          parsedCities.push(cityObj);
          await AsyncStorage.setItem('cities', JSON.stringify(parsedCities));
          console.log("City saved:", cityObj);
      
          // Optionally navigate back
          navigation.navigate('Home')
      
        } catch (error) {
          console.log("Error saving city:", error);
        }
    };
      

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
        <View style={styles.container}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: "#169976" }}>Weather Volt</Text>
        <TextInput
            placeholder="Enter city name"
            placeholderTextColor="#fff"
            value={city}
            style={styles.input}
            onChangeText={(text) => {
                setCity(text);
                fetchSuggestions(text); 
            }}
        />
        {suggestions.length > 0 && (
            <FlatList
            data={suggestions}
            keyExtractor={(item) => `${item.lat}-${item.lon}`} // Using lat and lon for unique key
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelectCity(item)}>
                <Text style={styles.suggestion}>{item.name}, {item.state ? `${item.state}, ` : ''}{item.country}</Text>
              </TouchableOpacity>
            )}
          />
          
        )}
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: { 
        padding: 20,
    },
  input: {
    borderWidth: 1,
    borderColor: '#169976',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    color: '#fff',
    marginTop: 50,
  },
  suggestion: {
    padding: 10,
    color: '#169976',
    backgroundColor: '#333',
    marginTop: 5,
    borderRadius: 5,
},
addButton: {
    backgroundColor: '#169976',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
},
})