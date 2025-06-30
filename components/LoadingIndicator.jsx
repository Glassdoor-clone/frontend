import { ActivityIndicator, Text, View } from 'react-native';

export default function LoadingIndicator({ loading, isDark }) {
  if (!loading) return null;

  return (
    <View className={`absolute top-0 left-0 right-0 z-10 py-2 ${
      isDark ? 'bg-neutral-800' : 'bg-gray-50'
    } border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
      <View className="flex-row items-center justify-center">
        <ActivityIndicator 
          size="small" 
          color="#16a34a" 
          className="mr-2"
        />
        <Text className={`${isDark ? 'text-white' : 'text-black'} font-poppins text-sm`}>
          Loading...
        </Text>
      </View>
    </View>
  );
}