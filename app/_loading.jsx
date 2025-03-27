import { Text, View, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Loading() {
  const router = useRouter();

  useEffect(() => {
    const navigateToIndex = () => {
      router.push('/'); // Navigate to the root index
    };

    // Set a longer timeout for better visibility
    const timer = setTimeout(navigateToIndex, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <ImageBackground 
      source={require('../assets/images/cherry.png')}
      className="flex-1"
      resizeMode="cover"
    >
      <SafeAreaView className="flex-1">
        <View className="w-full justify-center items-center h-full px-4">
          <Text className="text-white font-questrial text-5xl mt-[335px]">    
            Cherrizbox
          </Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
} 