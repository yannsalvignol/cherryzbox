import { Stack, useRouter } from 'expo-router';
import React from 'react';

export default function TabsLayout() {
  const router = useRouter();
  
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="create" />
      <Stack.Screen name="bookmark" />
      <Stack.Screen name="profile" />
    </Stack>
  );
}