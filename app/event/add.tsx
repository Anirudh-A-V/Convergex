import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Stack, useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useEvents } from '../../context/EventsContext';

export default function AddEventScreen() {
  const router = useRouter();
  const { dispatch } = useEvents();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date());
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUrls(result.assets.map(asset => asset.uri));
    }
  };

  const handleAddEvent = () => {
    dispatch({
      type: 'ADD_EVENT',
      payload: {
        eventData: { title, description, imageUrls, location, date },
        adminClubInfo: {
            clubName: 'TinkerHub CET',
            clubLogoUrl: 'https://picsum.photos/100',
        }
      },
    });
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: 'Add New Event' }} />
      <TextInput label="Event Title" value={title} onChangeText={setTitle} style={styles.input} />
      <TextInput label="Description" value={description} onChangeText={setDescription} multiline style={styles.input} />
      <TextInput label="Location / Venue" value={location} onChangeText={setLocation} style={styles.input} />
      <Button icon="camera" mode="outlined" onPress={pickImage} style={styles.button}>Select Images</Button>
      <View style={styles.imagePreviewContainer}>
        {imageUrls.map((uri, index) => (
          <Image key={index} source={{ uri }} style={styles.thumbnail} />
        ))}
      </View>
      <Button mode="contained" onPress={handleAddEvent} style={styles.button}>Post Event</Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  input: { marginBottom: 12, backgroundColor: '#F5F7FA' },
  button: { marginTop: 10, paddingVertical: 6 },
  imagePreviewContainer: { flexDirection: 'row', flexWrap: 'wrap', marginVertical: 10 },
  thumbnail: { width: 80, height: 80, borderRadius: 8, margin: 4 },
});