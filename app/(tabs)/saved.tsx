import React from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import { useEvents } from '../../context/EventsContext';
import EventCard from '../../components/EventCard';
import { Link } from 'expo-router';

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
            <Link 
                href={{
                    pathname: "/event/[id]", // Use the route pattern
                    params: { id: item.id }   // Pass the dynamic part as a param
                }} 
                asChild
            >
                <TouchableOpacity activeOpacity={0.7} style={styles.touchable}>
                    <EventCard event={item} />
                </TouchableOpacity>
            </Link>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  touchable: { marginHorizontal: 16, marginVertical: 8, borderRadius: 12 },
});