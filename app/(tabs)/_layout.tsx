import React from 'react';
import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';

export default function TabLayout() {
  const isAdmin = true;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#5D5FEE',
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home" color={color} size={26} />,
          
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{ title: 'Saved', headerTitle: 'Saved Posts', tabBarIcon: ({ color }) => <MaterialCommunityIcons name="bookmark" color={color} size={26} /> }}
      />
      <Tabs.Screen
        name="calendar"
        options={{ title: 'Calendar', headerTitle: 'My Registered Events', tabBarIcon: ({ color }) => <MaterialCommunityIcons name="calendar" color={color} size={26} /> }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: 'Profile', headerShown: false, tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account" color={color} size={26} /> }}
      />
      {isAdmin && (
        <Tabs.Screen
          name="admin"
          options={{ title: 'Admin', headerTitle: 'Admin Dashboard', tabBarIcon: ({ color }) => <MaterialCommunityIcons name="shield-crown" color={color} size={26} /> }}
        />
      )}
    </Tabs>
  );
}