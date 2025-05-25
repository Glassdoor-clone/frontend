import Header from '@/components/Header';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

export default function CommunityScreen() {
  const [activeTab, setActiveTab] = useState<'feed' | 'bowls'>('feed');

  return (
    <View className="flex-1 bg-white dark:bg-neutral-900 px-4 pt-10">
      
      <Header />
      

      {/* Tab buttons */}
      <View className="flex-row justify-around mb-4">
        <Pressable onPress={() => setActiveTab('feed')}>
          <Text className={`text-lg ${activeTab === 'feed' ? 'text-green-600 font-bold' : 'text-gray-500 dark:text-gray-400'}`}>
            Feed
          </Text>
        </Pressable>
        <Pressable onPress={() => setActiveTab('bowls')}>
          <Text className={`text-lg ${activeTab === 'bowls' ? 'text-green-600 font-bold' : 'text-gray-500 dark:text-gray-400'}`}>
            Bowls
          </Text>
        </Pressable>
      </View>

      {/* Content */}
      {activeTab === 'feed' ? (
        <View>
          <Text className="text-black dark:text-white">Feed content goes here</Text>
        </View>
      ) : (
        <View>
          <Text className="text-black dark:text-white">Boost content goes here</Text>
        </View>
      )}
    </View>
  );
}
