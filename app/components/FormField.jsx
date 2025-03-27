import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native'
import React, { useState } from 'react'

const FormField = ({ title, value, handleChangeText, otherStyles, keyboardType }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View className={`${otherStyles}`}>
            <View className="flex-row items-center bg-[#ECECEC] rounded-lg">
                <TextInput
                    placeholder={title}
                    value={value}
                    onChangeText={handleChangeText}
                    keyboardType={keyboardType}
                    className="flex-1 px-5 py-5 font-['Urbanist-Regular']"
                    placeholderTextColor="#9CA3AF"
                    secureTextEntry={title.toLowerCase().includes('password') && !showPassword}
                />
                {title.toLowerCase().includes('password') && (
                    <TouchableOpacity 
                        className="px-4"
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Image 
                            source={showPassword ? require('../../assets/icons/eye_hide.png') : require('../../assets/icons/eye.png')}
                            className="w-6 h-6"
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

export default FormField