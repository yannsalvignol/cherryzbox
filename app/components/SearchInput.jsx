import { View, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';

const SearchInput = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = (text) => {
    setSearchQuery(text);
    if (onSearch) {
      onSearch(text);
    }
  };
  
  return (
    <View className="relative w-full">
      <TextInput 
        className="w-full bg-[#1A1A1A] rounded-full px-4 py-3 pr-10 font-['Urbanist-Regular'] text-white"
        placeholder="Search ..."
        placeholderTextColor="#666666"
        value={searchQuery}
        onChangeText={handleSearch}
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
  );
};

export default SearchInput;