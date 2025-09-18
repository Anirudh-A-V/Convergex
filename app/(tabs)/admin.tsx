import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Alert, Image } from 'react-native';
import { Button, Card, Text, IconButton } from 'react-native-paper';
import { Link } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useEvents, Event } from '../../context/EventsContext';

export default function AdminScreen() {
  const { state, dispatch } = useEvents();
  
  // This would typically be a separate "Add Event" screen, 
  // but for simplicity, we can manage the form state here if needed.

  const handleDelete = (id: string) => {
    Alert.alert('Delete Event', 'Are you sure?', [
      { text: 'Cancel' },
      { text: 'Delete', onPress: () => dispatch({ type: 'DELETE_EVENT', payload: id }) },
    ]);
  };

  return (
    <View style={styles.container}>
      <Link href="/event/add" asChild>
        <Button mode="contained" style={styles.addButton}>
          Add New Event
        </Button>
      </Link>
      <FlatList
        data={state.events}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Title
              title={item.title}
              right={() => (
                <IconButton icon="delete" onPress={() => handleDelete(item.id)} />
              )}
            />
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  addButton: { margin: 10 },
  card: { marginVertical: 5 },
});