import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { EventsProvider } from '../context/EventsContext';
import { UserProvider } from '../context/UserContext';
import { theme } from '../theme';

export default function RootLayout() {
  return (
    <PaperProvider theme={theme}>
      <UserProvider>
        <EventsProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="search" options={{ headerShown: true, presentation: 'modal' }}/>
            <Stack.Screen name="notifications" options={{ headerShown: true, presentation: 'modal' }}/>
            <Stack.Screen name="login" options={{ presentation: 'fullScreenModal' }}/>
            <Stack.Screen name="signup" options={{ presentation: 'fullScreenModal' }}/>
            <Stack.Screen name="event/[id]" options={{ headerShown: true }} />
            <Stack.Screen name="profile/edit" options={{ headerShown: true }}/>
            <Stack.Screen name="profile/settings" options={{ headerShown: true }} />
            <Stack.Screen name="event/add" options={{ headerShown: true }} />
          </Stack>
        </EventsProvider>
      </UserProvider>
    </PaperProvider>
  );
}