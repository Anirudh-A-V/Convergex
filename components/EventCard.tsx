import React, { useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, Paragraph, Text } from 'react-native-paper';
import { Event, useEvents } from '../context/EventsContext';

interface Props {
  event: Event;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 32; // 16 padding on each side

export default function EventCard({ event }: Props) {
  const { state, dispatch } = useEvents();
  const [activeIndex, setActiveIndex] = useState(0);
  const isFollowing = state.followedClubNames.has(event.clubName);

  const onViewableItemsChanged = React.useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  return (
    <Card style={styles.card}>
      {/* Club Info Header */}
      <View style={styles.clubHeader}>
        <Avatar.Image size={40} source={{ uri: event.clubLogoUrl }} />
        <Text style={styles.clubName}>{event.clubName}</Text>
        <Button 
          mode={isFollowing ? "contained" : "outlined"} 
          compact 
          onPress={() => dispatch({ type: 'TOGGLE_FOLLOW', payload: event.clubName })}
        >
          {isFollowing ? 'Following' : 'Follow'}
        </Button>
      </View>

      {/* Event Details */}
      <Card.Content>
        <Paragraph style={styles.title}>{event.title}</Paragraph>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>{new Date(event.date).toLocaleDateString([], { day: '2-digit', month: 'short' })}</Text>
          <Text style={styles.infoText}>{new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
          <Text style={styles.infoText}>{event.location}</Text>
        </View>
      </Card.Content>

      {/* Image Carousel */}
      <FlatList
        data={event.imageUrls}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item }}
            style={styles.cover}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
      />
      
      {/* Dots */}
      {event.imageUrls.length > 1 && (
        <View style={styles.dotsContainer}>
          {event.imageUrls.map((_, index) => (
            <View key={index} style={[styles.dot, activeIndex === index && styles.dotActive]} />
          ))}
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { 
    marginVertical: 8, 
    marginHorizontal: 16, // Ensure margins are on the card itself
    borderRadius: 12 
  },
  clubHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 16, gap: 10 },
  clubName: { flex: 1, fontSize: 16, fontWeight: '500' },
  title: { fontSize: 20, fontWeight: 'bold', lineHeight: 28, marginTop: 8 },
  infoRow: { flexDirection: 'row', gap: 12, marginTop: 4 },
  infoText: { color: 'gray' },
  cover: {
    marginTop: 12,
    width: CARD_WIDTH,
    height: 300,
    resizeMode: 'cover',
  },
  dotsContainer: { flexDirection: 'row', justifyContent: 'center', padding: 12 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#d1d1d6', marginHorizontal: 3 },
  dotActive: { backgroundColor: '#5D5FEE' },
});