import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  roundness: 12,
  colors: {
    ...DefaultTheme.colors,
    primary: '#5D5FEE',
    background: '#F5F7FA',
    surface: '#FFFFFF',
    onSurface: '#1C1C1E',
    onSurfaceVariant: '#8A8A8E',
    primaryContainer: '#EAEAFE',
    outline: '#D1D1D6',
  },
};