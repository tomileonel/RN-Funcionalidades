import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import showError from '../helpers/errorHandler.js';

export default function TemperatureScreen() {
  const [location, setLocation] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [dateTime, setDateTime] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const optionsDate = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric'
      };
      const optionsTime = { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      };
      const formattedDate = now.toLocaleDateString('es-ES', optionsDate);
      const formattedTime = now.toLocaleTimeString('es-ES', optionsTime);
      setDateTime({ date: formattedDate, time: formattedTime });
    };

    const intervalId = setInterval(updateDateTime, 1000);

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permiso de ubicación denegado');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);

      const { latitude, longitude } = loc.coords;
      const apiKey = '989614a8f5ad010e430304b554547c1b'; 
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

      try {
        const response = await axios.get(url);
        setTemperature(response.data.main.temp);
      } catch (error) {
        showError('Error obteniendo la temperatura');
      }
      setLoading(false);
    })();

    return () => clearInterval(intervalId);
  }, []);

  const getTemperatureColor = (temp) => {
    if (temp <= 0) return '#00bcd4'; // Azul frío
    if (temp <= 15) return '#03a9f4'; // Azul claro
    if (temp <= 30) return '#ffeb3b'; // Amarillo
    return '#f44336'; // Rojo caliente
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#00bcd4" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Temperatura Actual</Text>
      {location ? (
        <Text style={styles.text}>Ubicación: {location.coords.latitude.toFixed(2)}, {location.coords.longitude.toFixed(2)}</Text>
      ) : (
        <Text style={styles.text}>Ubicación no disponible</Text>
      )}
      {temperature !== null ? (
        <Text style={[styles.temperature, { color: getTemperatureColor(temperature) }]}>
          Temperatura: {temperature.toFixed(1)}°C
        </Text>
      ) : (
        <Text style={styles.text}>Temperatura no disponible</Text>
      )}
      {dateTime ? (
        <View style={styles.dateTimeContainer}>
          <Text style={styles.date}>Fecha: {dateTime.date}</Text>
          <Text style={styles.time}>Hora: {dateTime.time}</Text>
        </View>
      ) : (
        <Text style={styles.text}>Fecha y Hora no disponible</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#e0f7fa',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00796b',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    color: '#004d40',
    marginBottom: 10,
  },
  temperature: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dateTimeContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  date: {
    fontSize: 18,
    fontWeight: '500',
    color: '#004d40',
    marginBottom: 5,
  },
  time: {
    fontSize: 18,
    fontWeight: '500',
    color: '#004d40',
  },
});

