import { Text, View, Image, TouchableOpacity, TextInput, ScrollView, Modal, Dimensions } from 'react-native'
import React, { useState, useMemo } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { Picker } from '@react-native-picker/picker'

// Country data
const countries = [
  { name: 'United States', code: '+1', flag: '🇺🇸' },
  { name: 'Canada', code: '+1', flag: '🇨🇦' },
  { name: 'United Kingdom', code: '+44', flag: '🇬🇧' },
  { name: 'France', code: '+33', flag: '🇫🇷' },
  { name: 'Germany', code: '+49', flag: '🇩🇪' },
  { name: 'Italy', code: '+39', flag: '🇮🇹' },
  { name: 'Spain', code: '+34', flag: '🇪🇸' },
  { name: 'China', code: '+86', flag: '🇨🇳' },
  { name: 'Japan', code: '+81', flag: '🇯🇵' },
  { name: 'South Korea', code: '+82', flag: '🇰🇷' },
  { name: 'India', code: '+91', flag: '🇮🇳' },
  { name: 'Australia', code: '+61', flag: '🇦🇺' },
  { name: 'Brazil', code: '+55', flag: '🇧🇷' },
  { name: 'Mexico', code: '+52', flag: '🇲🇽' },
  { name: 'Russia', code: '+7', flag: '🇷🇺' },
  // Add more countries as needed
];

export default function EditProfile() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    dateOfBirth: '',
    email: '',
    phoneCountry: '+1',
    phoneNumber: '',
    gender: ''
  });

  const [focusedInput, setFocusedInput] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGenderPicker, setShowGenderPicker] = useState(false);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  
  // Date picker state
  const [selectedMonth, setSelectedMonth] = useState('1');
  const [selectedDay, setSelectedDay] = useState('1');
  const [selectedYear, setSelectedYear] = useState('2000');

  // Generate arrays for picker data
  const months = useMemo(() => Array.from({length: 12}, (_, i) => {
    const month = i + 1;
    return {
      label: new Date(2000, i).toLocaleString('default', { month: 'long' }),
      value: month.toString()
    };
  }), []);

  const years = useMemo(() => Array.from({length: 100}, (_, i) => {
    const year = new Date().getFullYear() - i;
    return { label: year.toString(), value: year.toString() };
  }), []);

  const getDaysInMonth = (month, year) => {
    return new Date(year, parseInt(month), 0).getDate();
  };

  const days = useMemo(() => {
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
    return Array.from({length: daysInMonth}, (_, i) => {
      const day = i + 1;
      return { label: day.toString().padStart(2, '0'), value: day.toString() };
    });
  }, [selectedMonth, selectedYear]);

  const handleDateConfirm = () => {
    const formattedDate = `${selectedMonth.padStart(2, '0')}/${selectedDay.padStart(2, '0')}/${selectedYear}`;
    setFormData({...formData, dateOfBirth: formattedDate});
    setShowDatePicker(false);
  };

  const genderOptions = ['Male', 'Female', 'Others', 'Prefer not to say'];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }} edges={['top']}>
      {/* Header */}
      <View className="flex-row items-center px-4 pt-2 pb-4">
        <View className="flex-row items-center flex-1">
          <TouchableOpacity onPress={() => router.back()} className="mr-3">
            <Image 
              source={require('../assets/icons/back.png')}
              className="w-6 h-6"
              resizeMode="contain"
              style={{ tintColor: 'white' }}
            />
          </TouchableOpacity>
          <Text className='text-xl text-white font-["questrial"]'>
            Edit Profile
          </Text>
        </View>

        <TouchableOpacity onPress={() => router.push('/settings')}>
          <Image 
            source={require('../assets/icons/settings.png')}
            className="w-6 h-6"
            resizeMode="contain"
            style={{ tintColor: 'white' }}
          />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4">
        {/* Profile Picture Section */}
        <View className="items-center my-6 relative">
          <View className="w-32 h-32 rounded-full bg-[#1A1A1A] items-center justify-center relative">
            <Text className="text-4xl text-white font-bold">P</Text>
            <TouchableOpacity 
              className="absolute bottom-0 right-0"
              onPress={() => {/* Handle image edit */}}
            >
              <Image 
                source={require('../assets/icons/edit.png')}
                className="w-6 h-6"
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Input Fields */}
        <View className="space-y-4">
          {/* Username */}
          <View className={`flex-row items-center bg-[#1A1A1A] rounded-lg px-4 py-3 ${
            focusedInput === 'username' ? 'border border-[#FB2355]' : ''
          }`}>
            <Image 
              source={require('../assets/icons/name.png')}
              className="w-5 h-5 mr-3"
              resizeMode="contain"
              style={{ tintColor: focusedInput === 'username' ? '#FB2355' : '#666' }}
            />
            <TextInput
              value={formData.username}
              onChangeText={(text) => setFormData({...formData, username: text})}
              className="flex-1 text-white font-questrial"
              placeholderTextColor="#666"
              placeholder="Enter username"
              onFocus={() => setFocusedInput('username')}
              onBlur={() => setFocusedInput(null)}
            />
          </View>

          {/* Date of Birth */}
          <TouchableOpacity 
            onPress={() => setShowDatePicker(true)}
            className="flex-row items-center bg-[#1A1A1A] rounded-lg px-4 py-3"
          >
            <Image 
              source={require('../assets/icons/calendar.png')}
              className="w-5 h-5 mr-3"
              resizeMode="contain"
              style={{ tintColor: '#666' }}
            />
            <Text className={`flex-1 font-questrial ${formData.dateOfBirth ? 'text-white' : 'text-[#666]'}`}>
              {formData.dateOfBirth || 'Date of birth'}
            </Text>
          </TouchableOpacity>

          {/* Date Picker Modal */}
          <Modal
            visible={showDatePicker}
            transparent={true}
            animationType="slide"
          >
            <View className="flex-1 justify-end bg-black/50">
              <View className="bg-[#1A1A1A] rounded-t-3xl">
                <View className="flex-row justify-between items-center p-4 border-b border-gray-800">
                  <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                    <Text className="text-gray-400 font-questrial">Cancel</Text>
                  </TouchableOpacity>
                  <Text className="text-white font-questrial text-lg">Date of Birth</Text>
                  <TouchableOpacity onPress={handleDateConfirm}>
                    <Text className="text-[#FB2355] font-questrial">Done</Text>
                  </TouchableOpacity>
                </View>
                
                <View className="flex-row h-48">
                  {/* Month Picker */}
                  <View className="flex-1">
                    <Picker
                      selectedValue={selectedMonth}
                      onValueChange={(value) => setSelectedMonth(value)}
                      itemStyle={{ color: 'white', fontSize: 20, fontFamily: 'Questrial' }}
                    >
                      {months.map((item) => (
                        <Picker.Item key={item.value} label={item.label} value={item.value} color="white" />
                      ))}
                    </Picker>
                  </View>

                  {/* Day Picker */}
                  <View className="flex-1">
                    <Picker
                      selectedValue={selectedDay}
                      onValueChange={(value) => setSelectedDay(value)}
                      itemStyle={{ color: 'white', fontSize: 20, fontFamily: 'Questrial' }}
                    >
                      {days.map((item) => (
                        <Picker.Item key={item.value} label={item.label} value={item.value} color="white" />
                      ))}
                    </Picker>
                  </View>

                  {/* Year Picker */}
                  <View className="flex-1">
                    <Picker
                      selectedValue={selectedYear}
                      onValueChange={(value) => setSelectedYear(value)}
                      itemStyle={{ color: 'white', fontSize: 20, fontFamily: 'Questrial' }}
                    >
                      {years.map((item) => (
                        <Picker.Item key={item.value} label={item.label} value={item.value} color="white" />
                      ))}
                    </Picker>
                  </View>
                </View>
              </View>
            </View>
          </Modal>

          {/* Email */}
          <View className={`flex-row items-center bg-[#1A1A1A] rounded-lg px-4 py-3 ${
            focusedInput === 'email' ? 'border border-[#FB2355]' : ''
          }`}>
            <Image 
              source={require('../assets/icons/mail.png')}
              className="w-5 h-5 mr-3"
              resizeMode="contain"
              style={{ tintColor: focusedInput === 'email' ? '#FB2355' : '#666' }}
            />
            <TextInput
              value={formData.email}
              onChangeText={(text) => setFormData({...formData, email: text})}
              className="flex-1 text-white font-questrial"
              placeholderTextColor="#666"
              placeholder="Enter email"
              keyboardType="email-address"
              onFocus={() => setFocusedInput('email')}
              onBlur={() => setFocusedInput(null)}
            />
          </View>

          {/* Phone Number */}
          <View>
            <View className="flex-row space-x-2">
              <TouchableOpacity 
                className="bg-[#1A1A1A] rounded-lg px-4 py-3 w-32 flex-row items-center justify-between"
                onPress={() => setShowCountryPicker(true)}
              >
                <Text className="text-white font-questrial">{selectedCountry.flag} {selectedCountry.code}</Text>
                <Image 
                  source={require('../assets/icons/down_arrow.png')}
                  className="w-4 h-4"
                  resizeMode="contain"
                  style={{ tintColor: '#666' }}
                />
              </TouchableOpacity>
              <TextInput
                value={formData.phoneNumber}
                onChangeText={(text) => setFormData({...formData, phoneNumber: text})}
                className={`flex-1 bg-[#1A1A1A] rounded-lg px-4 py-3 text-white font-questrial ${
                  focusedInput === 'phone' ? 'border border-[#FB2355]' : ''
                }`}
                placeholderTextColor="#666"
                placeholder="(308) 555-0121"
                keyboardType="phone-pad"
                onFocus={() => setFocusedInput('phone')}
                onBlur={() => setFocusedInput(null)}
              />
            </View>
          </View>

          {/* Country Picker Modal */}
          <Modal
            visible={showCountryPicker}
            transparent={true}
            animationType="slide"
          >
            <View className="flex-1 justify-end bg-black/50">
              <View className="bg-[#1A1A1A] rounded-t-3xl">
                <View className="flex-row justify-between items-center p-4 border-b border-gray-800">
                  <TouchableOpacity onPress={() => setShowCountryPicker(false)}>
                    <Text className="text-gray-400 font-questrial">Cancel</Text>
                  </TouchableOpacity>
                  <Text className="text-white font-questrial text-lg">Select Country</Text>
                  <TouchableOpacity onPress={() => {
                    setFormData({...formData, phoneCountry: selectedCountry.code});
                    setShowCountryPicker(false);
                  }}>
                    <Text className="text-[#FB2355] font-questrial">Done</Text>
                  </TouchableOpacity>
                </View>
                
                <ScrollView className="max-h-96">
                  {countries.map((country) => (
                    <TouchableOpacity 
                      key={`${country.name}-${country.code}`}
                      className={`flex-row items-center px-4 py-3 border-b border-gray-800 ${
                        selectedCountry.code === country.code ? 'bg-[#FB2355]/10' : ''
                      }`}
                      onPress={() => {
                        setSelectedCountry(country);
                        setFormData({...formData, phoneCountry: country.code});
                        setShowCountryPicker(false);
                      }}
                    >
                      <Text className="text-2xl mr-3">{country.flag}</Text>
                      <View>
                        <Text className="text-white font-questrial">{country.name}</Text>
                        <Text className="text-gray-400 font-questrial">{country.code}</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
          </Modal>

          {/* Gender */}
          <TouchableOpacity 
            className="w-full bg-[#1A1A1A] rounded-lg px-4 py-3 flex-row items-center justify-between"
            onPress={() => setShowGenderPicker(true)}
          >
            <Text className={`font-questrial ${formData.gender ? 'text-white' : 'text-gray-400'}`}>
              {formData.gender || 'Select gender'}
            </Text>
            <Image 
              source={require('../assets/icons/right_arrow.png')}
              className="w-5 h-5"
              resizeMode="contain"
              style={{ tintColor: '#666' }}
            />
          </TouchableOpacity>

          {/* Gender Picker Modal */}
          <Modal
            visible={showGenderPicker}
            transparent={true}
            animationType="slide"
          >
            <View className="flex-1 justify-end bg-black/50">
              <View className="bg-[#1A1A1A] rounded-t-3xl p-4">
                <View className="flex-row justify-between items-center mb-4">
                  <Text className="text-white font-questrial text-lg">Select Gender</Text>
                  <TouchableOpacity onPress={() => setShowGenderPicker(false)}>
                    <Text className="text-[#FB2355] font-questrial">Done</Text>
                  </TouchableOpacity>
                </View>
                {genderOptions.map((option) => (
                  <TouchableOpacity 
                    key={option}
                    className="py-3"
                    onPress={() => {
                      setFormData({...formData, gender: option});
                      setShowGenderPicker(false);
                    }}
                  >
                    <Text className={`font-questrial text-base ${
                      formData.gender === option ? 'text-[#FB2355]' : 'text-white'
                    }`}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
} 