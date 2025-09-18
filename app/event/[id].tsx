import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Image, Dimensions } from 'react-native';
import { Text, Title, Paragraph, Button, Avatar, TouchableRipple } from 'react-native-paper';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useEvents } from '../../context/EventsContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ConfirmRegistrationModal from '../../components/ConfirmRegistrationModal';

const { width } = Dimensions.get('window');

// --- NEW COMPONENT FOR RENDERING IMAGES ---
// Because this is a true React component, we can use Hooks inside it.
const EventImage = ({ uri }: { uri: string }) => {
  const [imageHeight, setImageHeight] = useState(250); // Default height

  useEffect(() => {
    Image.getSize(uri, (w, h) => {
      // Calculate height based on the screen width
      const calculatedHeight = (h / w) * width;
      setImageHeight(calculatedHeight);
    }, () => {
      // Keep default height if there's an error
      setImageHeight(250); 
    });
  }, [uri]);

  return <Image source={{ uri }} style={[styles.image, { height: imageHeight }]} />;
};


export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { state, dispatch } = useEvents();
  const [modalVisible, setModalVisible] = useState(false);

  const event = state.events.find(e => e.id === id);

  if (!event) return null;

  const isSaved = state.savedEventIds.has(event.id);
  const isRegistered = state.registeredEventIds.has(event.id);

  const handleRegisterPress = () => {
    if (!isRegistered) setModalVisible(true);
    else dispatch({ type: 'TOGGLE_REGISTRATION', payload: event.id });
  };

  const handleConfirmRegistration = () => {
    dispatch({ type: 'TOGGLE_REGISTRATION', payload: event.id });
    setModalVisible(false);
  };

  return (
    <>
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Stack.Screen options={{ title: 'Event Details' }} />
        <FlatList
          ListHeaderComponent={
            <>
              <View style={styles.clubHeader}>
                  <Avatar.Image size={40} source={{ uri: event.clubLogoUrl }} />
                  <Text style={styles.clubName}>{event.clubName}</Text>
                  <Button mode="text">Following</Button>
              </View>
              <Title style={styles.title}>{event.title}</Title>
            </>
          }
          data={event.imageUrls}
          renderItem={({ item }) => <EventImage uri={item} />} // Use the new component here
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            <Paragraph style={styles.description}>{event.description}</Paragraph>
          }
        />
      </View>

      <View style={styles.bottomBar}>
        <Button 
          mode={isRegistered ? "outlined" : "contained"} 
          onPress={handleRegisterPress}
          style={styles.registerButton}
        >
          {isRegistered ? 'Registered' : 'Register'}
        </Button>
        <TouchableRipple onPress={() => dispatch({ type: 'TOGGLE_SAVE', payload: event.id })} style={styles.saveButton}>
          <View style={{ alignItems: 'center' }}>
            <MaterialCommunityIcons name={isSaved ? "bookmark" : "bookmark-outline"} size={24} color={isSaved ? '#5D5FEE' : 'gray'} />
            <Text style={{ color: isSaved ? '#5D5FEE' : 'gray' }}>{isSaved ? 'Saved' : 'Save'}</Text>
          </View>
        </TouchableRipple>
      </View>

      <ConfirmRegistrationModal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        onConfirm={handleConfirmRegistration}
      />
    </>
  );
}

const styles = StyleSheet.create({
  clubHeader: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 10 },
  clubName: { flex: 1, fontSize: 16, fontWeight: 'bold' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, paddingHorizontal: 16 },
  image: { width: '100%', marginBottom: 8 },
  description: { fontSize: 16, lineHeight: 24, padding: 16, paddingBottom: 100 },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', padding: 16, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#eee', alignItems: 'center' },
  registerButton: { flex: 1, marginRight: 16 },
  saveButton: { padding: 8, borderRadius: 8 },
});