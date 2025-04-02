import { Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'

export default function EditProfile() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }} edges={['top']}>
      {/* Header with cherry icon and title */}
      <View className="flex-row justify-between items-center px-4 pt-2 pb-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Image 
            source={require('../assets/icons/back.png')}
            className="w-6 h-6"
            resizeMode="contain"
            style={{ tintColor: 'white' }}
          />
        </TouchableOpacity>
        
        <Text className='text-2xl font-bold text-white font-["questrial"]'>
          Edit Profile
        </Text>
      </View>

      {/* Edit Profile Content */}
      <View className="flex-1 px-4">
        <Text className="text-white font-questrial">Edit Profile Page</Text>
      </View>
    </SafeAreaView>
  )
} 