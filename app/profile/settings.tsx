import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { Stack, useRouter } from 'expo-router';
import { useUser } from '../../context/UserContext';

export default function AccountSettingsScreen() {
  const router = useRouter();
  const { state } = useUser();
  const { name, email, phone, year, course } = state.profile;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Account Settings' }} />
      <View style={styles.field}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{name}</Text>
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{email}</Text>
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Phone Number</Text>
        <Text style={styles.value}>{phone}</Text>
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Year of Study</Text>
        <Text style={styles.value}>{year}</Text>
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Department</Text>
        <Text style={styles.value}>{course}</Text>
      </View>

      <Button mode="contained" onPress={() => router.push('/profile/edit')} style={styles.button}>
        Update
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    field: { marginBottom: 24 },
    label: { fontSize: 14, color: 'gray', marginBottom: 4 },
    value: { fontSize: 18, fontWeight: '500' },
    button: { marginTop: 30, paddingVertical: 6, borderRadius: 8 },
});