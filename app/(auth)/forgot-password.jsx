import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Link, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../components/FormField';

const ForgotPassword = () => {
    const router = useRouter();
    const [form, setForm] = useState({
        email: '',
    });

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView>
                <View className="flex-1 px-4">
                    <Text className="text-black font-['Urbanist-Bold'] text-4xl mt-[50px]">    
                        Forgot Password?
                    </Text>
                    <Text className="text-gray-500 font-['Urbanist-Bold'] text-lg mt-2">
                        Don't worry! It occurs. Please enter the email address linked with your account.
                    </Text>
                    
                    <FormField 
                        title="Enter your email" 
                        value={form.email} 
                        handleChangeText={(e) => setForm({...form, email: e})} 
                        otherStyles="mt-7" 
                        keyboardType="email-address" 
                    />
                    
                    <TouchableOpacity 
                        className="w-full bg-[#FB2355] py-4 rounded-lg mt-7"
                        onPress={() => {}}
                    >
                        <Text className="text-white text-center font-['Urbanist-Bold'] text-lg">
                            Send Code
                        </Text>
                    </TouchableOpacity>

                    <View className="flex-row justify-center items-center mt-7">
                        <Text className="text-black font-['Urbanist-Bold']">
                            Remember Password?{' '}
                        </Text>
                        <TouchableOpacity onPress={() => router.push('/(auth)/sign-up')}>
                            <Text className="text-[#FB2355] font-['Urbanist-Bold']">
                                Login Now
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({});

export default ForgotPassword;