import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';

const DateTimeWeather = () => {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestPermissionsAsync();
      if (status === 'granted') {
        const loc = await Location.getCurrentPositionAsync({});
        setLocation(loc);
        const { data } = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${loc.coords.latitude}&lon=${loc.coords.longitude}&appid=YOUR_API_KEY&units=metric`
        );
        setWeather(data);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.time}>{new Date().toLocaleString()}</Text>
      {weather && (
        <View style={styles.weatherContainer}>
          <Text style={styles.tempText}>Temperature: {weather.main.temp}°C</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e9ecef',
  },
  time: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  weatherContainer: {
    alignItems: 'center',
  },
  tempText: {
    fontSize: 20,
    color: '#007bff',
  },
});

export default DateTimeWeather;
