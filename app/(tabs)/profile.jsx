import { Text, View, Image, TouchableOpacity, Pressable } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'

export default function Profile() {
  const router = useRouter();
  const [isPaidContent, setIsPaidContent] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }} edges={['top']}>
      {/* Header with cherry icon and title */}
      <View className="flex-row items-center px-4 pt-2 pb-4">
        <TouchableOpacity onPress={() => router.push('/')}>
          <Image 
            source={require('../../assets/images/cherry-icon.png')}
            className="w-9 h-9"
            resizeMode="contain"
          />
        </TouchableOpacity>
        
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
          
          {/* Custom Content Type Toggle */}
          <View className="w-full items-center">
            <View className="flex-row bg-[#1A1A1A] rounded-full overflow-hidden relative p-1">
              {/* Sliding pink background */}
              <View 
                className={`absolute w-1/2 h-full rounded-full bg-[#FB2355] top-1 ${
                  isPaidContent ? 'right-1' : 'left-1'
                }`}
              />
              
              {/* Toggle options */}
              <Pressable 
                onPress={() => setIsPaidContent(false)}
                className="flex-1 py-2 px-8 items-center z-10"
              >
                <Text className={`font-questrial ${!isPaidContent ? 'text-white' : 'text-gray-400'}`}>
                  All content
                </Text>
              </Pressable>
              <Pressable 
                onPress={() => setIsPaidContent(true)}
                className="flex-1 py-2 px-8 items-center z-10"
              >
                <Text className={`font-questrial ${isPaidContent ? 'text-white' : 'text-gray-400'}`}>
                  Paid content
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

