import { Alert, Vibration } from 'react-native';

const errorHandler = (message) => {
  Vibration.vibrate();
  Alert.alert('Alerta', message, [{ text: 'OK' }]);
};

export default errorHandler