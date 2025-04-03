import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'

export default function PrivacyPolicy() {
  const router = useRouter();

  const renderSection = (title, content) => (
    <View className="mb-6">
      <Text className="text-[#FB2355] font-questrial text-lg mb-2">{title}</Text>
      <Text className="text-white font-questrial text-base leading-6">{content}</Text>
    </View>
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
        <Text className="text-xl text-white font-questrial">Privacy Policy</Text>
      </View>

      <ScrollView className="flex-1 px-4">
        <Text className="text-white font-questrial text-base mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </Text>

        {renderSection(
          "Information We Collect",
          "We collect information you provide directly to us, including name, email address, and payment information when you register for an account. We also collect data about your usage of the app and device information."
        )}

        {renderSection(
          "How We Use Your Information",
          "We use the information we collect to provide, maintain, and improve our services, process your transactions, communicate with you, and ensure platform security."
        )}

        {renderSection(
          "Information Sharing",
          "We do not sell your personal information. We may share your information with third-party service providers who assist in operating our platform and processing payments."
        )}

        {renderSection(
          "Data Security",
          "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, or destruction."
        )}

        {renderSection(
          "Your Rights",
          "You have the right to access, correct, or delete your personal information. You can also opt out of marketing communications and modify your notification preferences."
        )}

        {renderSection(
          "Changes to Policy",
          "We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page."
        )}

        {renderSection(
          "Contact Us",
          "If you have any questions about this privacy policy, please contact us at privacy@cherrybox.com"
        )}
      </ScrollView>
    </SafeAreaView>
  );
} 