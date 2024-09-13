import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, AsyncStorage } from 'react-native';
import { Video } from 'expo-av';

const FavoriteVideo = () => {
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    (async () => {
      const savedUrl = await AsyncStorage.getItem('videoUrl');
      if (savedUrl) {
        setVideoUrl(savedUrl);
      }
    })();
  }, []);

  const saveVideoUrl = async () => {
    await AsyncStorage.setItem('videoUrl', videoUrl);
  };

  return (
    <View>
      <TextInput
        value={videoUrl}
        onChangeText={setVideoUrl}
        placeholder="Enter video URL"
      />
      <Button title="Save Video" onPress={saveVideoUrl} />
      {videoUrl ? <Video source={{ uri: videoUrl }} useNativeControls /> : null}
    </View>
  );
};

export default FavoriteVideo;
