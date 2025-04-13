import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Picker} from "@react-native-picker/picker";

const CitySelector = ({ cities, selectedCity, onCitySelect }) => {
  return (
    <View style={styles.wrapper}>
    <View style={styles.dropdownContainer}>
        <Picker
          selectedValue={selectedCity}
          onValueChange={onCitySelect}
          style={styles.picker}
          dropdownIconColor="#fff"
        >
          {cities.map((city, index) => (
            <Picker.Item
              key={`${city.lat}-${city.lon}`}
              label={`${city.name}, ${city.state ? city.state + ', ' : ''}${city.country}`}
              value={city} // Store the entire city object as the value
            />
          ))}
        </Picker>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',    // Center vertically
    alignItems: 'center',        // Center horizontally
  },
  dropdownContainer: {
    marginTop: 50,
    marginBottom: 20,
    width: 200,
    height: 50,
    backgroundColor: '#000',
    borderRadius: 25,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  picker: {
    color: '#fff',
    width: '100%',
    height: '100%',
    paddingVertical: 10,
  },
  noCitiesText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default CitySelector;
