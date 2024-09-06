import React, { useState } from 'react';
import { View, TextInput, Button, Text, AsyncStorage, StyleSheet } from 'react-native';

const EmergencyContact = () => {
  const [phone, setPhone] = useState('');

  const savePhoneNumber = async () => {
    try {
      await AsyncStorage.setItem('emergencyNumber', phone);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Emergency Number</Text>
      <TextInput
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        placeholder="Enter Emergency Number"
        style={styles.input}
      />
      <Button title="Save" onPress={savePhoneNumber} style={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#28a745',
    color: '#fff',
  },
});

export default EmergencyContact;
