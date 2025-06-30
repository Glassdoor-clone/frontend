import { Pressable, Text, View } from 'react-native';

export default function TabNavigation({ activeTab, setActiveTab, isDark }) {
  return (
    <View className="flex-row justify-center mb-4 mt-5">
      <Pressable 
        onPress={() => setActiveTab('feed')}
        className="mx-8"
      >
        <Text className={`text-lg text-center font-poppins ${
          activeTab === 'feed' 
            ? `font-bold ${isDark ? 'text-white' : 'text-black'}` 
            : `${isDark ? 'text-gray-400' : 'text-gray-500'}`
        }`}>
          Feed
        </Text>
        <View className={`h-0.5 mt-1 ${
          activeTab === 'feed' ? 'bg-green-600' : 'bg-transparent'
        }`} />
      </Pressable>
      
      <Pressable 
        onPress={() => setActiveTab('bowls')}
        className="mx-8"
      >
        <Text className={`text-lg text-center font-poppins ${
          activeTab === 'bowls' 
            ? `font-bold ${isDark ? 'text-white' : 'text-black'}` 
            : `${isDark ? 'text-gray-400' : 'text-gray-500'}`
        }`}>
          Bowls
        </Text>
        <View className={`h-0.5 mt-1 ${
          activeTab === 'bowls' ? 'bg-green-600' : 'bg-transparent'
        }`} />
      </Pressable>
      
      <View className={`absolute bottom-0 left-0 right-0 h-px ${
        isDark ? 'bg-gray-700' : 'bg-gray-200'
      }`} />
    </View>
  );
}