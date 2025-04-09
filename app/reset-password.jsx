import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { account } from '../lib/appwrite';

export default function ResetPassword() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1); // 1: email, 2: OTP, 3: new password
  const [userId, setUserId] = useState('');

  const handleRequestReset = async () => {
    try {
      // Request password reset
      const response = await account.createRecovery(
        email,
        'https://your-app.com/reset-password' // This URL is for web, not used in mobile
      );
      setUserId(response.userId);
      setStep(2);
      Alert.alert('Success', 'OTP has been sent to your email');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      // Verify OTP
      await account.updateRecovery(
        userId,
        otp,
        newPassword,
        confirmPassword
      );
      Alert.alert('Success', 'Password has been reset successfully');
      router.push('/login');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View className="flex-1 bg-black p-6">
      <View className="space-y-6">
        {step === 1 && (
          <>
            <Text className="text-white text-2xl font-questrial mb-4">Reset Password</Text>
            <TextInput
              className="bg-[#1A1A1A] text-white p-4 rounded-lg font-questrial"
              placeholder="Enter your email"
              placeholderTextColor="#666"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TouchableOpacity
              className="bg-[#FB2355] p-4 rounded-lg"
              onPress={handleRequestReset}
            >
              <Text className="text-white text-center font-questrial">Send OTP</Text>
            </TouchableOpacity>
          </>
        )}

        {step === 2 && (
          <>
            <Text className="text-white text-2xl font-questrial mb-4">Enter OTP</Text>
            <TextInput
              className="bg-[#1A1A1A] text-white p-4 rounded-lg font-questrial"
              placeholder="Enter OTP"
              placeholderTextColor="#666"
              value={otp}
              onChangeText={setOtp}
              keyboardType="number-pad"
            />
            <TextInput
              className="bg-[#1A1A1A] text-white p-4 rounded-lg font-questrial mt-4"
              placeholder="New Password"
              placeholderTextColor="#666"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
            />
            <TextInput
              className="bg-[#1A1A1A] text-white p-4 rounded-lg font-questrial mt-4"
              placeholder="Confirm New Password"
              placeholderTextColor="#666"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
            <TouchableOpacity
              className="bg-[#FB2355] p-4 rounded-lg"
              onPress={handleVerifyOtp}
            >
              <Text className="text-white text-center font-questrial">Reset Password</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
} 