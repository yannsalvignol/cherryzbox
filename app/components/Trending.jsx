import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'

const trendingTopics = [
  "Music", "Gaming", "Sports", "Comedy", 
  "Food", "Travel", "Fashion", "Tech", 
  "Movies", "Fitness"
];

const Trending = () => {
  return (
    <View className="px-4 mb-6">
      <Text className="text-white font-['Urbanist-Bold'] text-lg mb-3">Trending</Text>
      
      <View className="flex-row flex-wrap">
        {trendingTopics.map((topic, index) => (
          <TouchableOpacity 
            key={index}
            className="bg-[#1A1A1A] py-2 px-4 rounded-full mr-2 mb-3"
          >
            <Text className="text-white font-['Urbanist-Regular']">{topic}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

export default Trending