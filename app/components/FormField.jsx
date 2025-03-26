import {View, Text, TextInput} from 'react-native'
import React from 'react'

const FormField = ({ title, value, handleChangeText, otherStyles, keyboardType }) => {
    return (
        <View className={`${otherStyles}`}>
            <TextInput
                placeholder={title}
                value={value}
                onChangeText={handleChangeText}
                keyboardType={keyboardType}
                className="w-full px-5 py-5 bg-[#ECECEC] rounded-lg font-['Urbanist-Regular']"
                placeholderTextColor="#9CA3AF"
            />
        </View>
    )
}

export default FormField