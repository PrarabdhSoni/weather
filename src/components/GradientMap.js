import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';

const weatherBackgrounds = {
  Clear: ['#fbc2eb', '#a6c1ee'],
  Clouds: ['#d7d2cc', '#304352'],
  Rain: ['#4e54c8', '#8f94fb'],
  Thunderstorm: ['#141E30', '#243B55'],
  Snow: ['#e6dada', '#274046'],
  Mist: ['#3E5151', '#DECBA4'],
};

const weatherAnimations = {
  Clear: require('../../assets/lottie/sunny.json'),
  Rain: require('../../assets/lottie/rainy.json'),
  Clouds: require('../../assets/lottie/cloudy.json'),
  Snow: require('../../assets/lottie/snow.json'),
  Thunderstorm: require('../../assets/lottie/strom.json'),
};

const GradientMap = ({ condition, temperature }) => {
  const backgroundColors = weatherBackgrounds[condition] || ['#000', '#000'];
  const animation = weatherAnimations[condition];

  if (!animation) {
    return <Text style={{ color: '#fff' }}>No animation available</Text>;
  }

  return (
    <LinearGradient colors={backgroundColors} style={styles.container}>
      <LottieView source={animation} autoPlay loop style={styles.animation} />
      <Text style={styles.temp}>{temperature}°C</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    borderRadius: 20,
    marginVertical: 20,
  },
  animation: {
    width: 150,
    height: 150,
  },
  temp: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
});

export default GradientMap;
