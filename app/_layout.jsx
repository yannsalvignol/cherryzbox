import { View } from 'react-native';
import { SplashScreen, Stack, Redirect } from 'expo-router';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { NativeWindStyleSheet } from "nativewind";

// Force NativeWind to use native styling on web
NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    'Questrial': require('../assets/fonts/Questrial-Regular.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <>
      <Stack 
        screenOptions={{ 
          headerShown: false,
          animation: 'fade',
        }}
      >
        <Stack.Screen 
          name="_loading" 
          options={{ 
            animation: 'none',
            gestureEnabled: false
          }} 
        />
        <Stack.Screen 
          name="index"
          options={{
            gestureEnabled: false
          }}
        />
      </Stack>
      <Redirect href="/_loading" />
    </>
  );
}
