import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { Link, useRouter } from 'expo-router';

export default function SignupScreen() {
  const router = useRouter();
  const handleSignup = () => router.replace('/(tabs)/home');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Sign Up</Text>
      <TextInput label="Name" style={styles.input} />
      <TextInput label="Email" style={styles.input} keyboardType="email-address" />
      <TextInput label="Password" secureTextEntry style={styles.input} />
      <Button mode="contained" onPress={handleSignup} style={styles.button}>
        Continue
      </Button>
      <Link href="/login" asChild>
        <Button>Existing Account? Login</Button>
      </Link>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { textAlign: 'center', marginBottom: 20 },
  input: { marginBottom: 12 },
  button: { marginTop: 10, paddingVertical: 6 },
});