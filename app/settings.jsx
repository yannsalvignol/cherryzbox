import { Text, View, Image, TouchableOpacity, Switch, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { logout } from '../lib/appwrite'

export default function Settings() {
  const router = useRouter();
  const [pushNotifications, setPushNotifications] = useState(true);

  const handleLogout = async () => {
    try {
      // Try to logout, but proceed regardless of result
      await logout();
      // First navigate to loading page
      router.replace('/_loading');
      // Then after a short delay, navigate to sign-up in (auth) directory
      setTimeout(() => {
        router.replace('/(auth)/sign-up');
      }, 1000);
    } catch (error) {
      console.error('Logout error:', error);
      // Even if there's an error, we should still navigate through loading
      router.replace('/_loading');
      setTimeout(() => {
        router.replace('/(auth)/sign-up');
      }, 1000);
    }
  };

  const handleChangePassword = () => {
    router.push('/forgot-password');
  };

  const renderSettingItem = (title, onPress, hasSwitch = false, isLogout = false) => (
    <TouchableOpacity 
      className={`flex-row items-center justify-between py-4 ${!isLogout ? 'border-b border-[#333333]' : ''}`}
      onPress={onPress}
      disabled={hasSwitch}
    >
      <Text className={`font-questrial text-base ${isLogout ? 'text-[#FB2355]' : 'text-white'}`}>{title}</Text>
      {hasSwitch ? (
        <Switch
          value={pushNotifications}
          onValueChange={setPushNotifications}
          trackColor={{ false: '#333333', true: '#FB2355' }}
          thumbColor={'white'}
        />
      ) : isLogout ? (
        <Image 
          source={require('../assets/icons/logout.png')}
          className="w-5 h-5"
          resizeMode="contain"
          style={{ tintColor: '#FB2355' }}
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
            {renderSettingItem('Change Password', handleChangePassword)}
            {renderSettingItem('Add a payment method', () => router.push('/payment-methods'))}
            {renderSettingItem('Push Notifications', null, true)}
            {renderSettingItem('Logout', handleLogout, false, true)}
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