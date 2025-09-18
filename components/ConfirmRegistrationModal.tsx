import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Modal, Portal, Text, TextInput, Button } from 'react-native-paper';
import { useUser } from '../context/UserContext';

interface Props {
  visible: boolean;
  onDismiss: () => void;
  onConfirm: () => void;
}

export default function ConfirmRegistrationModal({ visible, onDismiss, onConfirm }: Props) {
  const { state } = useUser();
  
  const [name, setName] = useState(state.profile.name);
  const [email, setEmail] = useState(state.profile.email);
  const [phone, setPhone] = useState(state.profile.phone);

  const handleConfirm = () => {
    // Here you could dispatch an action to update the user's profile if needed
    onConfirm();
  };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.container}>
        <Text variant="headlineSmall" style={styles.title}>Confirm Details</Text>
        <TextInput label="Name" value={name} onChangeText={setName} style={styles.input} />
        <TextInput label="Email" value={email} onChangeText={setEmail} style={styles.input} />
        <TextInput label="Phone Number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" style={styles.input} />
        <View style={styles.buttonRow}>
          <Button onPress={onDismiss} style={styles.button}>Back</Button>
          <Button mode="contained" onPress={handleConfirm} style={styles.button}>Confirm registration</Button>
        </View>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: 'white', padding: 20, margin: 20, borderRadius: 12 },
  title: { marginBottom: 20, textAlign: 'center' },
  input: { marginBottom: 12 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  button: { flex: 1, marginHorizontal: 4 },
});