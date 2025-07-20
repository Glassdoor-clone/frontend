import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Font from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import './global.css';

export default function RootLayout() {
  const router = useRouter();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const hasInitialized = useRef(false);

  useEffect(() => {
    // Prevent multiple initializations
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const initialize = async () => {
      try {
        // Load fonts first
        await Font.loadAsync({
          'Inter': require('../assets/fonts/Inter_18pt-Regular.ttf'),
          'Poppins': require('../assets/fonts/Poppins-Bold.ttf'),
        });
        setFontsLoaded(true);
        
        // Check auth status
        const userToken = await AsyncStorage.getItem('userToken');
        const userData = await AsyncStorage.getItem('userData');

        // Use setTimeout to avoid synchronous navigation during render
        setTimeout(() => {
          if (userData) {
            if (userToken) {
              router.replace('/(tabs)');
            } else {
              router.replace('/(auth)/login');
            }
          } else {
            router.replace('/(auth)/register');
          }
        }, 100);
        
      } catch (error) {
        console.error('Initialization failed:', error);
        // Fallback navigation
        setTimeout(() => {
          router.replace('/(auth)/register');
        }, 100);
      } finally {
        setIsAuthChecked(true);
      }
    };

    initialize();
  }, []); // Empty dependency array is crucial

  // Show loading screen until both fonts are loaded and auth is checked
  if (!fontsLoaded || !isAuthChecked) {
    return (
      <View style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#ffffff'
      }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}