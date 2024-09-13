import { Alert, Vibration } from 'react-native';

export const errorHandler = (message) => {
  Vibration.vibrate();
  Alert.alert('Error', message, [{ text: 'OK' }]);
};
