import React, { useEffect } from 'react';
import { Accelerometer } from 'expo-sensors';
import { Alert, Linking } from 'react-native';

const EmergencyCall = () => {
  useEffect(() => {
    const subscription = Accelerometer.addListener((data) => {
      if (Math.abs(data.x) > 1.5 || Math.abs(data.y) > 1.5 || Math.abs(data.z) > 1.5) {
        // Simulando un mensaje de emergencia
        Alert.alert('Emergency Alert', 'Sending emergency message...');
        Linking.openURL(`whatsapp://send?text=Emergency!&phone=+YOUR_EMERGENCY_CONTACT`);
      }
    });
    return () => subscription.remove();
  }, []);

  return null;
};

export default EmergencyCall;
