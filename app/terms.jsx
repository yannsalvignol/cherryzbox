import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'

export default function Terms() {
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
        <Text className="text-xl text-white font-questrial">Terms and Conditions</Text>
      </View>

      <ScrollView className="flex-1 px-4">
        <Text className="text-white font-questrial text-base mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </Text>

        {renderSection(
          "Acceptance of Terms",
          "By accessing or using Cherrybox, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access the service."
        )}

        {renderSection(
          "User Accounts",
          "You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account."
        )}

        {renderSection(
          "Content Guidelines",
          "Users must not post content that is illegal, offensive, or violates any third-party rights. Cherrybox reserves the right to remove content that violates these guidelines."
        )}

        {renderSection(
          "Subscription and Payments",
          "Subscription fees are billed in advance. You agree to pay all fees associated with your use of the service. Refunds are handled according to our refund policy."
        )}

        {renderSection(
          "Intellectual Property",
          "The service and its original content, features, and functionality are owned by Cherrybox and are protected by international copyright, trademark, and other intellectual property laws."
        )}

        {renderSection(
          "Termination",
          "We may terminate or suspend your account immediately, without prior notice or liability, for any reason, including breach of these Terms."
        )}

        {renderSection(
          "Limitation of Liability",
          "In no event shall Cherrybox be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service."
        )}

        {renderSection(
          "Changes to Terms",
          "We reserve the right to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page."
        )}

        {renderSection(
          "Contact Us",
          "If you have any questions about these Terms, please contact us at legal@cherrybox.com"
        )}
      </ScrollView>
    </SafeAreaView>
  );
} 