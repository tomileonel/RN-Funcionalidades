import React from 'react';
import { View, Text, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

const AboutApp = () => {
  const [hasPermission, setHasPermission] = useState(null);

  const handleBarCodeScanned = ({ data }) => {
    Alert.alert('Scanned Info', data);
  };

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  return (
    <View>
      <Text>About the App</Text>
      <BarCodeScanner onBarCodeScanned={handleBarCodeScanned} style={{ height: 200 }} />
      <Button title="Scan another app" />
    </View>
  );
};

export default AboutApp;
