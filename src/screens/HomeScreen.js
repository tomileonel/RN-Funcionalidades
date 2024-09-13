import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a la App de Emergencia</Text>
      <Button title="Configuración de Emergencia" onPress={() => navigation.navigate('Emergency')} />
      <Button title="Contactos" onPress={() => navigation.navigate('Contacts')} />
      <Button title="Ver Temperatura y Ubicación" onPress={() => navigation.navigate('Temperature')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
