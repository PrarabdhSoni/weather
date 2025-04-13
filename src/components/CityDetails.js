// components/CityDetails.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CityDetails = ({ selectedCity }) => {
  if (!selectedCity) return null;

  return (
    <View style={styles.cityDetails}>
      <Text style={styles.cityText}>City: {selectedCity.name}</Text>
      <Text style={styles.cityText}>State: {selectedCity.state}</Text>
      <Text style={styles.cityText}>Country: {selectedCity.country}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cityDetails: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#333',
    borderRadius: 5,
  },
  cityText: {
    color: '#169976',
    fontSize: 16,
  },
});

export default CityDetails;
