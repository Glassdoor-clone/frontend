import { Ionicons } from '@expo/vector-icons';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function PostCard({ post, onLike, onComment, onShare, isDark }) {
  const handleReadMore = () => {
    // Handle expand/collapse logic
    console.log('Read more clicked for post', post.id);
  };

  return (
    <View className={`mx-4 mb-4 rounded-lg}`}>
      {/* Header */}
      <View className="flex-row items-center mb-3">
        <View className={`w-12 h-12 rounded-full items-center justify-center ${isDark ? 'bg-neutral-700' : 'bg-gray-200'}`}>
          <Text className="text-lg">{post.avatar}</Text>
        </View>
        
        <View className="flex-1 ml-3">
          <View className="flex-row items-center">
            <Text className={`font-bold ${isDark ? 'text-green-400' : 'text-green-600'}`}>
              {post.user}
            </Text>
            {post.isAnonymous && (
              <View className="ml-2 px-2 py-1 rounded-full bg-gray-500">
                <Text className="text-sm text-white">Anonymous</Text>
              </View>
            )}
          </View>
          <Text className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {post.role}
          </Text>
        </View>
        
        <View className="flex-row items-center">
          <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {post.timeAgo}
          </Text>
          <TouchableOpacity className="ml-2 p-1">
            <Ionicons 
              name="ellipsis-horizontal" 
              size={20} 
              color={isDark ? '#9CA3AF' : '#6B7280'} 
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <View className="mb-3">
        <Text className={`text-base leading-6 ${isDark ? 'text-white' : 'text-black'}`}>
          {post.content}
        </Text>
        {post.content.length > 200 && (
          <TouchableOpacity onPress={handleReadMore} className="mt-1">
            <Text className={`${isDark ? 'text-green-400' : 'text-green-600'}`}>
              read more
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Images */}
      {post.images && post.images.length > 0 && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-3">
          {post.images.map((image, index) => (
            <Image
              key={index}
              source={{ uri: image }}
              className="w-48 h-32 rounded-lg mr-2"
              resizeMode="cover"
            />
          ))}
        </ScrollView>
      )}

      {/* Actions */}
      <View className="flex-row items-center justify-between pb-3 border-b mb-3 border-gray-200 dark:border-gray-700">
        <TouchableOpacity 
          onPress={() => onLike(post.id)}
          className="flex-row items-center"
        >
          <Ionicons 
            name={post.isLiked ? "heart" : "heart-outline"} 
            size={20} 
            color={post.isLiked ? "#EF4444" : (isDark ? '#9CA3AF' : '#6B7280')} 
          />
          <Text className={`ml-1 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {post.likes > 0 ? post.likes : 'Like'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => onComment(post.id)}
          className="flex-row items-center"
        >
          <Ionicons 
            name="chatbubble-outline" 
            size={20} 
            color={isDark ? '#9CA3AF' : '#6B7280'} 
          />
          <Text className={`ml-1 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {post.comments > 0 ? `${post.comments} Comments` : 'Comment'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => onShare(post.id)}
          className="flex-row items-center"
        >
          <Ionicons 
            name="share-outline" 
            size={20} 
            color={isDark ? '#9CA3AF' : '#6B7280'} 
          />
          <Text className={`ml-1 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {post.shares > 0 ? post.shares : 'Share'}
          </Text>
        </TouchableOpacity>

        {/* Reaction indicators */}
        {(post.likes > 0 || post.comments > 0) && (
          <View className="flex-row items-center">
            {post.likes > 0 && (
              <View className="flex-row items-center">
                <View className="w-6 h-6 rounded-full bg-red-500 items-center justify-center">
                  <Text className="text-xs">❤️</Text>
                </View>
                {post.comments > 0 && (
                  <View className="w-6 h-6 rounded-full bg-blue-500 items-center justify-center -ml-1">
                    <Text className="text-xs">💬</Text>
                  </View>
                )}
                <Text className={`ml-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {post.likes + post.comments}
                </Text>
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
}