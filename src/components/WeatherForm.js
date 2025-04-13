import React, { useState } from 'react';
import { TextInput, Button, View, StyleSheet } from 'react-native';

const WeatherForm = ({ onSubmit }) => {
  const [city, setCity] = useState('');

  const handleSearch = () => {
    if (city.trim() !== '') {
      onSubmit(city);
    }
  };

  

  return (
    <View style={styles.container}>
      <TextInput
        style={{
          height: 40,
          borderColor: '#ccc',
          borderWidth: 1,
          width: '80%',
          marginBottom: 10,
          paddingLeft: 10,
        }}
        placeholder="Enter city name"
        value={city}
        onChangeText={setCity}
      />
      <Button title="Search Weather" onPress={handleSearch} />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        padding: '20px',
        backgroundColor: '#fff',
        alignItems: 'center',
    },
})

export default WeatherForm;
