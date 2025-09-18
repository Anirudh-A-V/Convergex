import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { Card, Title } from 'react-native-paper';
import { useEvents } from '../../context/EventsContext';

export default function SavedScreen() {
  const { state } = useEvents();
  const savedEvents = state.events.filter(event => state.savedEventIds.has(event.id));

  if (savedEvents.length === 0) {
    return <View style={styles.emptyContainer}><Text>No saved events yet.</Text></View>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={savedEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}><Card.Content><Title>{item.title}</Title></Card.Content></Card>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  card: { margin: 16 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});