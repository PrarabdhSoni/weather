import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, SafeAreaView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WeatherForm from '../components/WeatherForm';
import WeatherCard from '../components/WeatherCard';
import AddCity from '../components/AddCity';
import CitySelector from '../components/CitySelector';
import GradientMap from '../components/GradientMap';
import WeatherStatCard from '../components/WeatherStateCard';

const HomeScreen = ({navigation}) => {

  const [weatherData, setWeatherData] = useState(null);
  const [cities, setCities] = useState([])
  const [selectedCity, setSelectedCity] = useState(null);

  const fetchWeather = async (city) => {
    const cityName = typeof city === 'string' ? city : city.name;
    try {
      const apiKey = 'ae05868a412080e0bc741f1c70d7f645';
  
      // Step 1: Get latitude and longitude of the city
      const geocodeResponse = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`
      );
      const geocodeData = await geocodeResponse.json();

      console.log(geocodeData);
  
      if (geocodeData.length === 0) {
        console.log('City not found');
        return;
      }
  
      const { lat, lon } = geocodeData[0];
      console.log(`Coordinates for ${city}: lat=${lat}, lon=${lon}`);
  
      // Step 2: Use lat/lon to fetch weather data
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
      );
      const weatherData = await weatherResponse.json();
      console.log(weatherData);
      setWeatherData(weatherData);

  
      // Use the weatherData however you like (update state etc.)
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  useEffect(() =>{
    const fetchCities = async () => {
      const storedCities = await AsyncStorage.getItem('cities');
      const parsedCities = storedCities ? JSON.parse(storedCities) : [];
      setCities(parsedCities);

      if (parsedCities.length > 0) {
        setSelectedCity(parsedCities[0]);
      } else {
        setSelectedCity(defaultCity);
      }
    }
    fetchCities();
  },[]);

  useEffect(() => {
    if (selectedCity) {
      fetchWeather(selectedCity);
      console.log("hi")
    }
  }, [selectedCity]);
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
    <ScrollView contentContainerStyle={{ paddingTop: 10, margin: 20, backgroundColor: '#000' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: "#169976" }}>Weather Volt</Text>
        <AddCity navigation={navigation}/>
      </View>
      {cities && cities.length > 0 ? (
  <>
    <CitySelector 
      cities={cities} 
      selectedCity={selectedCity} 
      onCitySelect={(city) => setSelectedCity(city)}
    />

    {weatherData ? (
      <View>
        <GradientMap
          condition={weatherData.weather[0].main}
          temperature={(weatherData.main.temp - 273.15).toFixed(1)}
        />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
          <WeatherStatCard icon="water-percent" label="Humidity" value={weatherData.main.humidity} unit="%" />
          <WeatherStatCard icon="weather-windy" label="Wind" value={weatherData.wind.speed} unit=" m/s" />
          <WeatherStatCard icon="thermometer" label="Feels Like" value={(weatherData.main.feels_like - 273.15).toFixed(1)} unit="°C" />
          <WeatherStatCard icon="speedometer" label="Pressure" value={weatherData.main.pressure} unit=" hPa" />
          <WeatherStatCard icon="eye" label="Visibility" value={weatherData.visibility / 1000} unit=" km" />
        </View>
      </View>
          ) : (
            <Text style={styles.loadingText}>Loading Please Wait...</Text>
          )}
        </>
      ) : (
        <Text style={{ color: '#fff', marginTop: 20, textAlign: 'center' }}>
          Tap the <Text style={{ fontWeight: 'bold' }}>+</Text> above to add your first city!
        </Text>
    )}

      {/* {cities && cities.length > 0 ? (
          <CitySelector 
            cities={cities} 
            selectedCity={selectedCity} 
            onCitySelect={(city) => setSelectedCity(city)}
          />
        ) : (
          <Text style={{ color: '#fff', marginTop: 20, textAlign: 'center' }}>
            Tap the <Text style={{ fontWeight: 'bold' }}>+</Text> above to add your first city!
          </Text>
        )}
      {console.log(selectedCity)}
      {weatherData ? (
        <View>
        <GradientMap
          condition={weatherData.weather[0].main}
          temperature={(weatherData.main.temp- 273.15).toFixed(1)}
        />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
    <WeatherStatCard
      icon="water-percent"
      label="Humidity"
      value={weatherData.main.humidity}
      unit="%"
    />
    <WeatherStatCard
      icon="weather-windy"
      label="Wind"
      value={weatherData.wind.speed}
      unit=" m/s"
    />
    <WeatherStatCard
      icon="thermometer"
      label="Feels Like"
      value={(weatherData.main.feels_like - 273.15).toFixed(1)}
      unit="°C"
    />
    <WeatherStatCard
      icon="speedometer"
      label="Pressure"
      value={weatherData.main.pressure}
      unit=" hPa"
    />
    <WeatherStatCard
      icon="eye"
      label="Visibility"
      value={weatherData.visibility / 1000}
      unit=" km"
    />
  </View>
  </View>
      ) : (
        <Text style={styles.loadingText}>Loading Please Wait...</Text>
      )} */}

    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default HomeScreen;