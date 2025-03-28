import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2; // 2 cards per row with padding

const PhotoCard = ({ photo }) => {
  const router = useRouter();

  // Extract title from the photo object
  const photoTitle = photo.title || 'Untitled';
  
  return (
    <TouchableOpacity 
      className="mb-3"
      style={{ width: cardWidth }}
      onPress={() => router.push(`/post/${photo.$id}?type=photo`)}
    >
      <View className="rounded-lg overflow-hidden relative">
        {/* Photo Image */}
        {photo.thumbnail || photo.imageUrl || photo.fileUrl ? (
          <Image 
            source={{ uri: photo.thumbnail || photo.imageUrl || photo.fileUrl }}
            className="w-full h-56"
            resizeMode="cover"
          />
        ) : (
          <View className="w-full h-56 bg-gray-800 flex items-center justify-center">
            <Text className="text-gray-400 font-medium">No Image</Text>
          </View>
        )}
        
        {/* Title in oval overlay */}
        <View className="absolute bottom-2 left-2 bg-black/70 px-3 py-1 rounded-full">
          <Text 
            className="text-white text-xs font-['Urbanist-Regular']"
            numberOfLines={1}
          >
            {photoTitle}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PhotoCard;

