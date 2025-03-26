import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { Link, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../components/FormField';

const SignUp = () => {
    const router = useRouter();
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView>
                <View className="flex-1 px-4">
                    <Text className="text-black font-['Urbanist-Bold'] text-4xl mt-[50px]">    
                        Welcome back! Glad to see you, Again!
                    </Text>
                    <FormField title="Email" value={form.email} handleChangeText={(e) => setForm({...form, email: e})} otherStyles="mt-7" keyboardType="email-address" />
                    <FormField title="Password" value={form.password} handleChangeText={(e) => setForm({...form, password: e})} otherStyles="mt-7" />
                    
                    <TouchableOpacity className="self-end mt-2" onPress={() => router.push('/(auth)/forgot-password')}>
                        <Text className="text-[#FB2355] font-['Urbanist-Bold']">
                            Forgot password?
                        </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        className="w-full bg-[#FB2355] py-4 rounded-lg mt-7"
                        onPress={() => {}}
                    >
                        <Text className="text-white text-center font-['Urbanist-Bold'] text-lg">
                            Login
                        </Text>
                    </TouchableOpacity>

                    <View className="flex-row items-center justify-center mt-7">
                        <View className="flex-1 h-[1px] bg-gray-300" />
                        <Text className="text-gray-500 font-['Urbanist-Bold'] mx-4">
                            Or login with
                        </Text>
                        <View className="flex-1 h-[1px] bg-gray-300" />
                    </View>

                    <View className="flex-row justify-center items-center space-x-4 mt-4">
                        <TouchableOpacity>
                            <Image 
                                source={require('../../assets/images/facebook.png')}
                                className="w-28 h-28"
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image 
                                source={require('../../assets/images/google.png')}
                                className="w-28 h-28"
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image 
                                source={require('../../assets/images/apple.png')}
                                className="w-28 h-28"
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </View>

                    <View className="flex-row justify-center items-center mt-1">
                        <Text className="text-black font-['Urbanist-Bold']">
                            Don't have an account?{' '}
                        </Text>
                        <TouchableOpacity onPress={() => router.push('/')}>
                            <Text className="text-[#FB2355] font-['Urbanist-Bold']">
                                Register Now
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({});

export default SignUp;