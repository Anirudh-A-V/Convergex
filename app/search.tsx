import React, { useState, useMemo } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { Stack } from 'expo-router';
import { useEvents } from '../context/EventsContext';
import EventCard from '../components/EventCard'; // Reuse our EventCard component

export default function SearchScreen() {
  const { state } = useEvents();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = useMemo(() => {
    if (!searchQuery) {
      return []; // Don't show any events until the user starts typing
    }
    const lowercasedQuery = searchQuery.toLowerCase();
    return state.events.filter(event => 
      event.title.toLowerCase().includes(lowercasedQuery) ||
      event.clubName.toLowerCase().includes(lowercasedQuery)
    );
  }, [searchQuery, state.events]);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Searchbar
        placeholder="Search for events or clubs"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
        autoFocus={true}
      />
      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EventCard event={item} />}
        contentContainerStyle={{ paddingVertical: 8 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F5F7FA' 
  },
  searchbar: {
    margin: 16,
    borderRadius: 12,
  },
});