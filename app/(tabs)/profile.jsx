import { Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'

export default function Profile() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }} edges={['top']}>
      {/* Header with cherry icon and title */}
      <View className="flex-row items-center px-4 pt-2 pb-4">
        <Image 
          source={require('../../assets/images/cherry-icon.png')}
          className="w-9 h-9"
          resizeMode="contain"
        />
        
        <Text className='flex-1 text-center text-2xl font-bold text-white font-["questrial"]'>
          Cherrybox<Text className="text-[#FB2355]">.</Text>
        </Text>
      </View>

      {/* Profile Picture Section */}
      <View className="items-center mb-6">
        <View className="w-32 h-32 rounded-full bg-[#1A1A1A] items-center justify-center mb-3">
          <Text className="text-4xl text-white font-bold">P</Text>
        </View>
        <View className="flex-row items-center">
          <Text className="text-white text-xl font-questrial">Profile Name</Text>
          <TouchableOpacity onPress={() => router.push('/settings')}>
            <Image 
              source={require('../../assets/icons/settings.png')}
              className="w-7 h-7 ml-2"
              resizeMode="contain"
              style={{ tintColor: 'white' }}
            />
          </TouchableOpacity>
        </View>
        <Text className="text-gray-400 text-sm font-questrial mb-4">@username</Text>
        
        {/* Action Buttons */}
        <View className="w-full px-6 space-y-3">
          <TouchableOpacity 
            className="w-full bg-[#1A1A1A] py-3 rounded-lg items-center flex-row justify-center"
            onPress={() => router.push('/edit-profile')}
          >
            <Text className="text-white font-questrial">Edit Profile</Text>
            <Image 
              source={require('../../assets/icons/down_arrow.png')}
              className="w-5 h-5 ml-2"
              resizeMode="contain"
              style={{ tintColor: 'white' }}
            />
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="w-full bg-[#1A1A1A] py-3 rounded-lg items-center"
            onPress={() => router.push('/payment-methods')}
          >
            <Text className="text-white font-questrial">Add Payment Methods</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Profile Content */}
      <View className="flex-1 items-center justify-center">
        <Text className="text-white font-questrial">Profile</Text>
      </View>
    </SafeAreaView>
  )
}

