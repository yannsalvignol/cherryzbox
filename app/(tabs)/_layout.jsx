import { View } from 'react-native'
import { Tabs } from 'expo-router'
import React from 'react'

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen 
        name="home" 
        options={{
          title: "Home",
          headerShown: false
        }} 
      />
      <Tabs.Screen 
        name="create" 
        options={{
          title: "Create",
          headerShown: false
        }} 
      />
      <Tabs.Screen 
        name="bookmark" 
        options={{
          title: "Bookmarks",
          headerShown: false
        }} 
      />
      <Tabs.Screen 
        name="profile" 
        options={{
          title: "Profile",
          headerShown: false
        }} 
      />
    </Tabs>
  )
}