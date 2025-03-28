import { View, TextInput, TouchableOpacity, Image, Keyboard, Text } from 'react-native';
import React, { useState } from 'react';

const SearchInput = ({ onSearch, onFocus }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  
  const handleSearch = (text) => {
    setSearchQuery(text);
    if (onSearch) {
      onSearch(text);
    }
  };
  
  const handleFocus = () => {
    setIsFocused(true);
    console.log('Search input focused');
    onFocus && onFocus(true);
  };
  
  const handleBackPress = () => {
    // Dismiss keyboard and exit search mode
    Keyboard.dismiss();
    setIsFocused(false);
    onFocus && onFocus(false);
  };
  
  return (
    <View className="relative w-full flex-row items-center">
      {/* Back arrow - only visible when focused */}
      {isFocused && (
        <TouchableOpacity 
          onPress={handleBackPress}
          className="mr-3"
        >
          <Image 
            source={require('../../assets/icons/back.png')}
            className="w-5 h-5"
            resizeMode="contain"
            style={{ tintColor: 'white' }}
          />
        </TouchableOpacity>
      )}
      
      {/* Search input */}
      <View className={`relative flex-1 ${isFocused ? '' : 'w-full'}`}>
        <TextInput 
          className="w-full bg-[#1A1A1A] rounded-full px-4 py-3 pr-10 font-['Urbanist-Regular'] text-white"
          placeholder="Search videos..."
          placeholderTextColor="#666666"
          value={searchQuery}
          onChangeText={handleSearch}
          onFocus={handleFocus}
        />
        <View className="absolute right-3 top-3">
          <Image 
            source={require('../../assets/icons/search.png')}
            className="w-5 h-5"
            resizeMode="contain"
            style={{ tintColor: '#666666' }}
          />
        </View>
        {searchQuery.length > 0 && (
          <TouchableOpacity 
            className="absolute right-10 top-3"
            onPress={() => handleSearch('')}
          >
            <Image
              source={require('../../assets/icons/close.png')}
              className="w-5 h-5"
              resizeMode="contain"
              style={{ tintColor: '#666666' }}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SearchInput;