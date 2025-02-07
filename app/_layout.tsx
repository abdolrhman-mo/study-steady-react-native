import { Stack, Slot } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      {/* Define your screen options here */}
      <Stack.Screen name="/" />
      <Stack.Screen name="(files)" options={{ headerShown: false }} />
      {/* Render nested screens */}
      <Slot />
    </Stack>
  );
}
