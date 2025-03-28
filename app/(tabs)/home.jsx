import { Text, View, FlatList, TouchableOpacity, Image, Keyboard, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchInput from '../components/SearchInput';
import Trending from '../components/trending';
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();
  const [searchResults, setSearchResults] = useState([{id: 1}, {id: 2}, {id: 3}]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  // Add keyboard listener to dismiss trending when keyboard is dismissed
  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsSearchFocused(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);
  
  const handleSearch = (query) => {
    // In a real app, this would filter your data based on the query
    console.log('Searching for:', query);
    // For demonstration, we're just keeping the data the same
  };
  
  const handleSearchFocus = (focused) => {
    console.log('Search focus changed to:', focused);
    setIsSearchFocused(focused);
  };
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      {/* Header with cherry icon, title, and profile button */}
      <View className="flex-row justify-between items-center px-4 pt-2 pb-4">
        <Image 
          source={require('../../assets/images/cherry-icon.png')}
          className="w-9 h-9"
          resizeMode="contain"
        />
        
        <Text className='text-2xl font-bold text-white font-["Urbanist-Bold"]'>
          Cherrybox<Text className="text-[#FB2355]">.</Text>
        </Text>
        
        <TouchableOpacity 
          onPress={() => router.push('/(tabs)/profile')}
          className="bg-[#FB2355] w-8 h-8 rounded-full items-center justify-center"
        >
          <Text className="text-white font-bold">P</Text>
        </TouchableOpacity>
      </View>
      
      {/* Search input */}
      <View className='px-4 mb-4'>
        <SearchInput onSearch={handleSearch} onFocus={handleSearchFocus} />
      </View>
      
      {/* Content */}
      <ScrollView>
        {/* Trending section - always visible when search is focused */}
        {isSearchFocused && (
          <View className="px-4 mb-4">
            <Text className="text-white font-['Urbanist-Bold'] text-lg mb-3">Trending</Text>
            
            <View className="flex-row flex-wrap">
              {["Podcast", "Business", "Sports", "Music", "Beauty", 
                "Mum", "Education", "Inspiration", "Fun", "Games"].map((topic, index) => (
                <TouchableOpacity 
                  key={index}
                  className="bg-[#1A1A1A] py-2 px-4 rounded-full mr-2 mb-3"
                >
                  <Text className="text-white font-['Urbanist-Regular']">{topic}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
        
        {/* Videos section */}
        <View className="px-4 mb-4">
          <Text className="text-white font-['Urbanist-Bold'] text-lg mb-3">
            {isSearchFocused ? 'Search Results' : 'For You'}
          </Text>
          
          {searchResults.map(item => (
            <View 
              key={item.id.toString()} 
              className="bg-[#1A1A1A] rounded-lg mb-3 p-4"
            >
              <Text className="font-['Urbanist-Regular'] text-white">
                Video {item.id}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}