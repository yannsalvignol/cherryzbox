import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'

export default function About() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }} edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center px-4 pt-2 pb-4">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Image 
            source={require('../assets/icons/back.png')}
            className="w-6 h-6"
            resizeMode="contain"
            style={{ tintColor: 'white' }}
          />
        </TouchableOpacity>
        <Text className="text-xl text-white font-questrial">About Us</Text>
      </View>

      <ScrollView className="flex-1 px-4">
        <View className="items-center mb-8">
          <Image 
            source={require('../assets/images/cherry-icon.png')}
            className="w-24 h-24 mb-4"
            resizeMode="contain"
          />
          <Text className="text-2xl text-white font-questrial mb-2">
            Cherrybox<Text className="text-[#FB2355]">.</Text>
          </Text>
          <Text className="text-gray-400 font-questrial text-base text-center">
            Version 1.0.0
          </Text>
        </View>

        <View className="space-y-6">
          <View>
            <Text className="text-[#FB2355] font-questrial text-lg mb-2">Our Mission</Text>
            <Text className="text-white font-questrial text-base leading-6">
              Cherrybox is dedicated to creating a safe and engaging platform for content creators and their audiences. We strive to provide innovative tools and features that enhance the connection between creators and their community.
            </Text>
          </View>

          <View>
            <Text className="text-[#FB2355] font-questrial text-lg mb-2">What We Do</Text>
            <Text className="text-white font-questrial text-base leading-6">
              We provide a platform where creators can share exclusive content with their subscribers, manage their content effectively, and build meaningful relationships with their audience. Our focus is on delivering a seamless, user-friendly experience while maintaining the highest standards of privacy and security.
            </Text>
          </View>

          <View>
            <Text className="text-[#FB2355] font-questrial text-lg mb-2">Contact Us</Text>
            <Text className="text-white font-questrial text-base leading-6">
              Have questions or suggestions? We'd love to hear from you. Reach out to our support team at support@cherrybox.com
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 