import React from 'react';
import { Alert, Vibration } from 'react-native';

export const showError = (message) => {
  Vibration.vibrate();
  Alert.alert('Error', message);
};
