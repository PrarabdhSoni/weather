import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WeatherCard = ({ weatherData }) => {
    console.log("data", weatherData);
    const tempInCelsius = (weatherData.main.temp - 273.15).toFixed(1);
  return (
    <View style={styles.card}>
      <Text style={styles.temperature}>{tempInCelsius}°C</Text>
      <Text style={styles.description}>{weatherData.weather[0].description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#f9f9f9',
        padding: 20,
        borderRadius: 10,
        marginTop: 20,
        width: '80%',
        alignItems: 'center',
    },
    temperature: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#000',
    },
    description: {
        fontSize: 20,
        color: '#666',
    },
})

export default WeatherCard;
