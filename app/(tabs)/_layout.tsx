import React from 'react';
import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabLayout() {
  // In a real app, this value would come from your user's state
  const isAdmin = true;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#6200ee', // Color for the active tab icon and label
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerTitle: 'General Feed',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home" color={color} size={26} />,
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: 'Saved',
          headerTitle: 'Saved Posts',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="bookmark" color={color} size={26} />,
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Calendar',
          headerTitle: 'My Registered Events',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="calendar" color={color} size={26} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerTitle: 'Profile',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account" color={color} size={26} />,
        }}
      />
      
      {/* This screen will only be rendered in the tab bar if isAdmin is true */}
      {isAdmin && (
        <Tabs.Screen
          name="admin"
          options={{
            title: 'Admin',
            headerTitle: 'Admin Dashboard',
            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="shield-crown" color={color} size={26} />,
          }}
        />
      )}
    </Tabs>
  );
}