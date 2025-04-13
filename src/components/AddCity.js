import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AddCity = ({ navigation }) => {

    const HandleAddCity = () => {
        navigation.navigate('AddCity');
    }
  return (
    <View style={styles.card}>
      <Text onPress={HandleAddCity} style={styles.plus}>+</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    card: {
      backgroundColor: '#1DCD9F',
      borderRadius: 50, // circular
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    plus: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff',
    },
  });

export default AddCity;
