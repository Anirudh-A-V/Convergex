import React from 'react';
import { Redirect } from 'expo-router';

export default function StartPage() {
  // For now, we'll assume the user is not logged in and redirect to login.
  // Later, we'll add real authentication logic here.
  const isLoggedIn = false;

  if (isLoggedIn) {
    return <Redirect href="/(tabs)/home" />;
  } else {
    return <Redirect href="/login" />;
  }
}