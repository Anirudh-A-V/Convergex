import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Avatar, Chip, IconButton, Menu } from 'react-native-paper';
import { Stack, useRouter } from 'expo-router';
import { useUser } from '../../context/UserContext';

export default function ProfileScreen() {
  const router = useRouter();
  const { state } = useUser();
  const { name, year, course, profilePictureUrl, interests } = state.profile;
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const handleLogout = () => {
    closeMenu();
    router.replace('/login');
  };

  const handleEdit = () => {
    closeMenu();
    router.push('/profile/edit');
  };

  // Add a new handler for the settings screen
  const handleSettings = () => {
    closeMenu();
    router.push('/profile/settings');
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={
            <IconButton icon="cog-outline" size={24} onPress={openMenu} />
          }>
          <Menu.Item onPress={handleSettings} title="Account Settings" />
          <Menu.Item onPress={handleEdit} title="Edit Profile" />
          <Menu.Item onPress={handleLogout} title="Logout" />
        </Menu>
      </View>
      
      <Avatar.Image size={100} source={{ uri: profilePictureUrl }} />
      <Text variant="headlineSmall" style={styles.name}>{name}</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailText}>{year}</Text>
        <Text style={styles.detailSeparator}>•</Text>
        <Text style={styles.detailText}>{course}</Text>
      </View>

      <Text variant="titleMedium" style={styles.interestTitle}>Your Interests</Text>
      <View style={styles.chipsContainer}>
        {interests.map(interest => (
          <Chip key={interest} style={styles.chip} selected>{interest}</Chip>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'center', 
    backgroundColor: '#fff', 
    paddingTop: 60 
  },
  header: { 
    position: 'absolute', 
    top: 50, 
    right: 10, 
  },
  name: { 
    marginTop: 16,
    fontWeight: 'bold' 
  },
  detailsContainer: { 
    flexDirection: 'row', 
    marginTop: 8,
    alignItems: 'center'
  },
  detailText: { 
    color: 'gray' 
  },
  detailSeparator: {
    marginHorizontal: 8,
    color: 'gray'
  },
  interestTitle: { 
    marginTop: 40, 
    marginBottom: 16 
  },
  chipsContainer: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'center', 
    paddingHorizontal: 20 
  },
  chip: { 
    margin: 4 
  },
});