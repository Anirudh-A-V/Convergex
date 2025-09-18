import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Chip, Avatar, Text } from 'react-native-paper';
import { Stack, useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useUser } from '../../context/UserContext';

export default function EditProfileScreen() {
  const router = useRouter();
  const { state, dispatch } = useUser();
  
  const [formData, setFormData] = useState(state.profile);
  const [newInterest, setNewInterest] = useState('');

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddInterest = () => {
    if (newInterest && !formData.interests.includes(newInterest)) {
      setFormData(prev => ({ ...prev, interests: [...prev.interests, newInterest] }));
      setNewInterest('');
    }
  };
  
  const handleRemoveInterest = (interest: string) => {
    setFormData(prev => ({ ...prev, interests: prev.interests.filter(i => i !== interest) }));
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) handleInputChange('profilePictureUrl', result.assets[0].uri);
  };

  const handleSaveChanges = () => {
    dispatch({ type: 'UPDATE_PROFILE', payload: formData });
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: 'Edit Details' }} />
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <Avatar.Image size={100} source={{ uri: formData.profilePictureUrl }} />
        <Button onPress={pickImage} icon="camera">Change Photo</Button>
      </View>
      <TextInput label="Name *" value={formData.name} onChangeText={text => handleInputChange('name', text)} style={styles.input} />
      <TextInput label="Email (college mail ID) *" value={formData.email} disabled style={styles.input} />
      <TextInput label="Phone Number *" value={formData.phone} onChangeText={text => handleInputChange('phone', text)} style={styles.input} keyboardType="phone-pad" />
      <TextInput label="Department" value={formData.course} onChangeText={text => handleInputChange('course', text)} style={styles.input} right={<TextInput.Icon icon="chevron-down" />} />
      <TextInput label="Year of Study" value={formData.year} onChangeText={text => handleInputChange('year', text)} style={styles.input} right={<TextInput.Icon icon="chevron-down" />} />
      <Text style={styles.interestTitle}>Manage Interests</Text>
      <View style={styles.chipsContainer}>
        {formData.interests.map(interest => (
          <Chip key={interest} style={styles.chip} onClose={() => handleRemoveInterest(interest)}>{interest}</Chip>
        ))}
      </View>
      <View style={styles.addInterestContainer}>
        <TextInput label="Add New Interest" value={newInterest} onChangeText={setNewInterest} style={{ flex: 1 }} />
        <Button onPress={handleAddInterest} style={{ marginLeft: 8, alignSelf: 'center' }}>Add</Button>
      </View>
      <Button mode="contained" onPress={handleSaveChanges} style={styles.saveButton} buttonColor="#34C759">Save Changes</Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  input: { marginBottom: 12, backgroundColor: '#F5F7FA' },
  interestTitle: { fontSize: 16, marginTop: 20, marginBottom: 10, color: 'gray' },
  chipsContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10 },
  chip: { margin: 4 },
  addInterestContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  saveButton: { paddingVertical: 6, marginTop: 20, borderRadius: 8 },
});