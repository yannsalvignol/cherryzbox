import { Text, View, Image, TouchableOpacity, Switch } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'

export default function Settings() {
  const router = useRouter();
  const [pushNotifications, setPushNotifications] = useState(true);

  const renderSettingItem = (title, onPress, hasSwitch = false) => (
    <TouchableOpacity 
      className="flex-row items-center justify-between py-4 border-b border-[#333333]"
      onPress={onPress}
      disabled={hasSwitch}
    >
      <Text className="text-white font-questrial text-base">{title}</Text>
      {hasSwitch ? (
        <Switch
          value={pushNotifications}
          onValueChange={setPushNotifications}
          trackColor={{ false: '#333333', true: '#FB2355' }}
          thumbColor={'white'}
        />
      ) : (
        <Image 
          source={require('../assets/icons/right_arrow.png')}
          className="w-5 h-5"
          resizeMode="contain"
          style={{ tintColor: '#666666' }}
        />
      )}
    </TouchableOpacity>
  );

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
        <Text className="text-xl text-white font-questrial">Settings</Text>
      </View>

      <View className="flex-1 px-4">
        {/* Account Settings Section */}
        <View className="mb-8">
          <Text className="text-[#FB2355] font-questrial text-lg mb-2">Account Settings</Text>
          <View className="bg-[#1A1A1A] rounded-lg px-4">
            {renderSettingItem('Edit Profile', () => router.push('/edit-profile'))}
            {renderSettingItem('Change Password', () => router.push('/change-password'))}
            {renderSettingItem('Add a payment method', () => router.push('/payment-methods'))}
            {renderSettingItem('Push Notifications', null, true)}
          </View>
        </View>

        {/* More Section */}
        <View>
          <Text className="text-[#FB2355] font-questrial text-lg mb-2">More</Text>
          <View className="bg-[#1A1A1A] rounded-lg px-4">
            {renderSettingItem('About us', () => router.push('/about'))}
            {renderSettingItem('Privacy Policy', () => router.push('/privacy-policy'))}
            {renderSettingItem('Terms and Conditions', () => router.push('/terms'))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
} 