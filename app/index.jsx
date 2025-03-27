import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { Link, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from './components/FormField';
import { createUser } from '../lib/appwrite';

const App = () => {
    const router = useRouter();
    const [form, setForm] = useState({
        email: '',
        password: '',
        confirm_password: '',
        username: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submit = async () => {
        if (form.password !== form.confirm_password) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }
        if(!form.username || !form.email || !form.password || !form.confirm_password) {
            Alert.alert('Error', 'Please fill all the fields');
            return;
        }
        try {
            setIsSubmitting(true);
            await createUser(form.email, form.password, form.username);
            router.replace('/(tabs)/home');
        } catch (error) {
            console.error('Registration error:', error);
            Alert.alert('Error', error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView>
                <View className="flex-1 px-4">
                    <Text className="text-black font-['Urbanist-Bold'] text-4xl mt-[50px]">    
                        Hello! Register to get in the Cherrizbox.
                    </Text>
                    <FormField title="Username" value={form.username} handleChangeText={(e) => setForm({...form, username: e})} otherStyles="mt-7" />
                    <FormField title="Email" value={form.email} handleChangeText={(e) => setForm({...form, email: e})} otherStyles="mt-7" keyboardType="email-address" />
                    <FormField 
                        title="Password" 
                        value={form.password} 
                        handleChangeText={(e) => setForm({...form, password: e})} 
                        otherStyles="mt-7"
                        secureTextEntry={!showPassword}
                        onTogglePassword={() => setShowPassword(!showPassword)}
                        showPassword={showPassword}
                    />
                    <FormField 
                        title="Confirm Password" 
                        value={form.confirm_password} 
                        handleChangeText={(e) => setForm({...form, confirm_password: e})} 
                        otherStyles="mt-7"
                        secureTextEntry={!showConfirmPassword}
                        onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
                        showPassword={showConfirmPassword}
                    />
                    <TouchableOpacity 
                        className="w-full bg-[#FB2355] py-4 rounded-lg mt-7"
                        onPress={submit}
                        disabled={isSubmitting}
                    >
                        <Text className="text-white text-center font-['Urbanist-Bold'] text-lg">
                            {isSubmitting ? 'Signing up...' : 'Register'}
                        </Text>
                    </TouchableOpacity>

                    <View className="flex-row items-center justify-center mt-7">
                        <View className="flex-1 h-[1px] bg-gray-300" />
                        <Text className="text-gray-500 font-['Urbanist-Bold'] mx-4">
                            Or register with
                        </Text>
                        <View className="flex-1 h-[1px] bg-gray-300" />
                    </View>

                    <View className="flex-row justify-center items-center space-x-4 mt-4">
                        <TouchableOpacity>
                            <Image 
                                source={require('../assets/images/facebook.png')}
                                className="w-28 h-28"
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image 
                                source={require('../assets/images/google.png')}
                                className="w-28 h-28"
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image 
                                source={require('../assets/images/apple.png')}
                                className="w-28 h-28"
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </View>

                    <View className="flex-row justify-center items-center mt-1">
                        <Text className="text-black font-['Urbanist-Bold']">
                            Already have an account?{' '}
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

export default App;


