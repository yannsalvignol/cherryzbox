import { Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchInput from '../components/SearchInput';
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();
  const [searchResults, setSearchResults] = useState([{id: 1}, {id: 2}, {id: 3}]);
  
  const handleSearch = (query) => {
    // In a real app, this would filter your data based on the query
    console.log('Searching for:', query);
    // For demonstration, we're just keeping the data the same
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
      
      <FlatList
        data={searchResults}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View className="px-4 py-2 bg-[#1A1A1A] rounded-lg mx-4 mb-3">
            <Text className="font-['Urbanist-Regular'] text-white">Video {item.id}</Text>
          </View>
        )}
        ListHeaderComponent={() => (
          <View className='px-4 mb-6'>
            <SearchInput onSearch={handleSearch} />
          </View>
        )}
      />
    </SafeAreaView>
  );
}