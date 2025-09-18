import React, { useState, useMemo } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { Card, Title } from 'react-native-paper';
import { Calendar, DateData } from 'react-native-calendars';
import { useEvents } from '../../context/EventsContext';

const toDateString = (date: Date) => date.toISOString().split('T')[0];

export default function CalendarScreen() {
  const { state } = useEvents();
  const [selectedDate, setSelectedDate] = useState(toDateString(new Date()));

  const markedDates = useMemo(() => {
    const marks: { [key: string]: { marked: boolean; dotColor: string } } = {};
    state.events.forEach(event => {
      marks[toDateString(event.date)] = { marked: true, dotColor: '#6200ee' };
    });
    return marks;
  }, [state.events]);
  
  const eventsOnSelectedDate = useMemo(() => {
    return state.events.filter(event => toDateString(event.date) === selectedDate);
  }, [state.events, selectedDate]);

  const onDayPress = (day: DateData) => setSelectedDate(day.dateString);

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={onDayPress}
        markedDates={{
          ...markedDates,
          [selectedDate]: { ...markedDates[selectedDate], selected: true, selectedColor: '#5D5FEE' }
        }}
      />
      <View style={styles.eventList}>
        {eventsOnSelectedDate.length > 0 ? (
          <FlatList
            data={eventsOnSelectedDate}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <Card style={styles.card}>
                <Card.Content>
                  <Title>{item.title}</Title>
                  <Text>{item.location} at {item.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                </Card.Content>
              </Card>
            )}
          />
        ) : (
          <View style={styles.emptyContainer}><Text>No events on this day.</Text></View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  eventList: { flex: 1, padding: 10 },
  card: { marginVertical: 5 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});