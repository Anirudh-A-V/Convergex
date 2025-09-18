import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { Link, useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();
  const handleLogin = () => router.replace('/(tabs)/home');

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Log In</Text>
      <TextInput label="Email ID" style={styles.input} />
      <TextInput label="Password" secureTextEntry style={styles.input} />
      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Login
      </Button>
      <Link href="/signup" asChild>
        <Button>Create an Account</Button>
      </Link>
    </View>
  );
}
const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
    title: { textAlign: 'center', marginBottom: 20 },
    input: { marginBottom: 12 },
    button: { marginTop: 10, paddingVertical: 6 },
});