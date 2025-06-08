import { Stack } from 'expo-router';
import { Text } from 'react-native';
import { useFonts } from '../hooks/useFonts';
import './global.css';

export default function RootLayout() {
  const fontsLoaded = useFonts();

  if (!fontsLoaded) {
    return <Text style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading fonts...</Text>;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Define screens here if needed */}
    </Stack>
  );
}
