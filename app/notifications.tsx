import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Stack } from 'expo-router';

export default function NotificationsScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Notifications' }} />
      <Text>Notifications Screen</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});