import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import * as Contacts from 'expo-contacts';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Asegúrate de tener AsyncStorage instalado

export default function ContactsScreen() {
  const [contacts, setContacts] = useState([]);
  const [emergencyNumber, setEmergencyNumber] = useState('');

  useEffect(() => {
    const fetchEmergencyNumber = async () => {
      try {
        const number = await AsyncStorage.getItem('emergencyNumber');
        if (number) {
          setEmergencyNumber(formatPhoneNumber(number));
        }
      } catch (error) {
        console.error('Error al obtener el número de emergencia:', error);
      }
    };

    fetchEmergencyNumber();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync();
        if (data.length > 0) {
          setContacts(data);
        } else {
          Alert.alert('No se encontraron contactos');
        }
      } else {
        Alert.alert('Permiso para acceder a los contactos denegado');
      }
    })();
  }, []);

  // Función para formatear el número eliminando todo lo que no sea dígito y tomando los últimos 8 dígitos solo para comparar
  const formatPhoneNumber = (phoneNumber) => {
    const digitsOnly = phoneNumber.replace(/\D/g, ''); // Elimina todo excepto dígitos
    return digitsOnly.slice(-8); // Devuelve los últimos 8 dígitos
  };

  const renderItem = ({ item }) => {
    const originalPhoneNumber = item.phoneNumbers ? item.phoneNumbers[0].number : 'Sin número';
    const formattedPhoneNumber = item.phoneNumbers ? formatPhoneNumber(item.phoneNumbers[0].number) : '';
    const isEmergencyContact = formattedPhoneNumber === emergencyNumber;

    return (
      <View style={styles.contactItem}>
        <Text>{item.name}</Text>
        <Text style={isEmergencyContact ? styles.emergencyNumber : null}>
          {originalPhoneNumber}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  contactItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  emergencyNumber: {
    color: 'red',
  },
});
