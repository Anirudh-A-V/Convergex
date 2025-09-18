import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme, // Inherit the default theme
  roundness: 12, // Optional: rounder corners for components
  colors: {
    ...DefaultTheme.colors, // Inherit the default colors

    // --- OVERRIDE COLORS HERE ---
    primary: '#5D5FEE', // The main brand color for buttons, active tabs, etc.
    background: '#F5F7FA', // The background color for screens
    surface: '#FFFFFF', // The background color for components like Card, Modal

    // Text colors
    onSurface: '#1C1C1E', // Main text color
    onSurfaceVariant: '#8A8A8E', // Secondary text color

    // Other colors
    primaryContainer: '#EAEAFE',
    outline: '#D1D1D6',
  },
};