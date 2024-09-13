import React, { useState, useEffect } from 'react';
import { View, Button, ImageBackground, AsyncStorage, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const BackgroundImagePicker = () => {
  const [backgroundImage, setBackgroundImage] = useState(null);

  useEffect(() => {
    const loadBackgroundImage = async () => {
      const storedImage = await AsyncStorage.getItem('backgroundImage');
      if (storedImage) {
        setBackgroundImage(storedImage);
      }
    };
    loadBackgroundImage();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      setBackgroundImage(result.uri);
      await AsyncStorage.setItem('backgroundImage', result.uri);
    }
  };

  return (
    <ImageBackground source={{ uri: backgroundImage }} style={styles.background}>
      <View style={styles.container}>
        <Button title="Select Background Image" onPress={pickImage} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    borderRadius: 10,
  },
});

export default BackgroundImagePicker;
