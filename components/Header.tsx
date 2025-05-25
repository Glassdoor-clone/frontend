import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Image, Pressable, TextInput, View } from 'react-native';

export default function Header() {
  return (
    <View
      style={{ paddingTop: 20 }}
      className="flex-row items-center justify-between px-4 py-3 bg-white dark:bg-neutral-900"
    >
      {/* Logo */}
      <Image
        source={require('@/assets/images/fake-logo.jpg')}
        style={{ width: 32, height: 32 }}
        resizeMode="contain"
      />

      {/* Search bar */}
      <View className="flex-1 mx-3">
        <TextInput
          placeholder="Search"
          placeholderTextColor="#aaa"
          className="bg-gray-100 dark:bg-neutral-800 text-black dark:text-white px-4 py-2 rounded-full text-sm"
          accessibilityLabel="Search"
          returnKeyType="search"
        />
      </View>

      {/* Icons */}
      <View className="flex-row items-center space-x-6">

        <Pressable
          accessibilityRole="button"
          android_ripple={{ color: '#0CAA41' }} //happens only on android
          className="p-1 rounded-full">
          <Ionicons name="notifications-outline" size={24} color="#0CAA41" />
        </Pressable>
      
        <Pressable
          accessibilityRole="button"
          android_ripple={{ color: '#0CAA41' }}
          className="p-1 rounded-full">
          <FontAwesome name="user-circle-o" size={24} color="#0CAA41" />
        </Pressable>
      </View>
    </View>
  );
}
