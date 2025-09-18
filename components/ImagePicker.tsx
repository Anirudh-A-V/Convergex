import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text } from 'react-native-paper';

interface Props {
  onSelectionChange: (uris: string[]) => void;
}

const { width } = Dimensions.get('window');
const IMAGE_SIZE = width / 4;

export default function ImagePicker({ onSelectionChange }: Props) {
  const [photos, setPhotos] = useState<MediaLibrary.Asset[]>([]);
  const [selectedPhotos, setSelectedPhotos] = useState<Set<string>>(new Set());
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  useEffect(() => {
    const getPhotos = async () => {
      if (!permissionResponse) {
        await requestPermission();
      }
      if (permissionResponse?.granted) {
        const { assets } = await MediaLibrary.getAssetsAsync({ first: 20, mediaType: 'photo', sortBy: 'creationTime' });
        setPhotos(assets);
      }
    };
    getPhotos();
  }, [permissionResponse]);

  const toggleSelection = (asset: MediaLibrary.Asset) => {
    const newSelection = new Set(selectedPhotos);
    if (newSelection.has(asset.uri)) {
      newSelection.delete(asset.uri);
    } else {
      newSelection.add(asset.uri);
    }
    setSelectedPhotos(newSelection);
    onSelectionChange(Array.from(newSelection));
  };

  if (!permissionResponse) {
    return <View />;
  }

  if (!permissionResponse.granted) {
    return <View style={styles.centered}><Text>Please grant media library permissions.</Text></View>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={photos}
        numColumns={4}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toggleSelection(item)}>
            <Image source={{ uri: item.uri }} style={styles.image} />
            {selectedPhotos.has(item.uri) && (
              <View style={styles.overlay}>
                <MaterialCommunityIcons name="check-circle" size={24} color="#5D5FEE" />
              </View>
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { height: 400, borderWidth: 1, borderColor: '#eee' }, // Set a fixed height
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  image: { width: IMAGE_SIZE, height: IMAGE_SIZE },
  overlay: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
  },
});