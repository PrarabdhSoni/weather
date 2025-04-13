import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const WeatherStatCard = ({ icon, label, value, unit }) => (
  <View style={styles.card}>
    <MaterialCommunityIcons name={icon} size={28} color="#169976" />
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}{unit}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#111',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    margin: 8,
    width: 100,
    shadowColor: '#169976',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5
  },
  label: {
    fontSize: 14,
    color: '#aaa',
    marginTop: 4
  },
  value: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold'
  }
});

export default WeatherStatCard;
