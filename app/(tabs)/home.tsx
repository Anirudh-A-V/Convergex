import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { useEvents } from '../../context/EventsContext';
import EventCard from '../../components/EventCard';
import { SegmentedButtons } from 'react-native-paper';

export default function HomeScreen() {
  const { state, dispatch } = useEvents();
  const { events, filter, followedClubNames } = state;

  const filteredEvents = filter === 'all'
    ? events
    : events.filter(event => followedClubNames.has(event.clubName));

  return (
    <View style={styles.container}>
      <SegmentedButtons
        value={filter}
        onValueChange={(value) => dispatch({ type: 'SET_FILTER', payload: value as 'all' | 'subscribed' })}
        buttons={[
          { value: 'all', label: 'General Feed' },
          { value: 'subscribed', label: 'Subscribed' },
        ]}
        style={styles.filterButtons}
      />

      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={{ pathname: "/event/[id]", params: { id: item.id } }} asChild>
            <TouchableOpacity activeOpacity={0.7} style={styles.touchable}>
              <EventCard event={item} />
            </TouchableOpacity>
          </Link>
        )}
        contentContainerStyle={{ paddingVertical: 8 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F5F7FA' },
    filterButtons: {
      paddingHorizontal: 16,
      paddingBottom: 8,
      paddingTop: 10,
    },
    touchable: {
      marginHorizontal: 2,
      marginVertical: 1,
      borderRadius: 12,
    },
});