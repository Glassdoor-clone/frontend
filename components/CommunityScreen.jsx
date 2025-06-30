import CreatePostModal from '@/components/CreatePostModal';
import FloatingActionButton from '@/components/FloatingActionButton';
import LoadingIndicator from '@/components/LoadingIndicator';
import PostCard from '@/components/PostCard';
import SearchBar from '@/components/SearchBar';
import TabNavigation from '@/components/TabNavigation';
import { dummyPosts } from '@/data/dummyPosts';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
  useColorScheme
} from 'react-native';

export default function CommunityScreen() {
  const [activeTab, setActiveTab] = useState('feed');
  const [showPostModal, setShowPostModal] = useState(false);
  const [posts, setPosts] = useState(dummyPosts);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Pull-to-refresh handler
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Here you would typically fetch fresh data from your API
      // For now, we'll just reset to the original dummy data
      setPosts(dummyPosts);
      
      // You could also add some random new posts to simulate fresh content
      const freshPost = {
        id: Math.max(...dummyPosts.map(p => p.id)) + Math.floor(Math.random() * 1000),
        user: 'Fresh User',
        role: 'Professional',
        timeAgo: 'just now',
        content: 'This is a fresh post from pull-to-refresh! 🚀',
        likes: Math.floor(Math.random() * 50),
        comments: Math.floor(Math.random() * 20),
        shares: Math.floor(Math.random() * 10),
        isLiked: false,
        avatar: '🆕',
        category: 'General',
        images: [],
        isAnonymous: false
      };
      
      setPosts([freshPost, ...dummyPosts]);
      
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  // Loading handler for other operations
  const handleLoadMore = async () => {
    if (loading) return;
    
    setLoading(true);
    
    try {
      // Simulate loading more posts
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Add some mock posts
      const newPosts = Array.from({ length: 3 }, (_, index) => ({
        id: Math.max(...posts.map(p => p.id)) + index + 1,
        user: `User ${index + 1}`,
        role: 'Professional',
        timeAgo: `${index + 1}m ago`,
        content: `This is a loaded post #${index + 1}`,
        likes: Math.floor(Math.random() * 30),
        comments: Math.floor(Math.random() * 15),
        shares: Math.floor(Math.random() * 5),
        isLiked: false,
        avatar: '📝',
        category: 'General',
        images: [],
        isAnonymous: false
      }));
      
      setPosts(prev => [...prev, ...newPosts]);
      
    } catch (error) {
      console.error('Error loading more data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = (postData) => {
    const newPost = {
      id: Math.max(...posts.map(p => p.id)) + 1,
      user: postData.isAnonymous ? 'Anonymous' : 'You',
      role: 'Professional',
      timeAgo: 'now',
      content: postData.text,
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
      avatar: postData.isAnonymous ? '🎭' : '👤',
      category: 'General',
      images: postData.images || [],
      isAnonymous: postData.isAnonymous
    };

    setPosts([newPost, ...posts]);
    setShowPostModal(false);
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  const handleComment = (postId) => {
    // Navigate to comments screen or show comment modal
    console.log('Comment on post', postId);
  };

  const handleShare = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, shares: post.shares + 1 }
        : post
    ));
    // Add actual sharing logic here
    console.log('Share post', postId);
  };

  return (
    <View className={`flex-1 ${isDark ? 'bg-neutral-900' : 'bg-white'}`}>
      <View className="mb-2">
        <SearchBar onPress={() => router.push("/search")} placeholder="Search conversations" />
      </View>
     
      {/* Content */}
      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#16a34a']} // Android
            tintColor={isDark ? '#16a34a' : '#16a34a'} // iOS
            title="Pull to refresh"
            titleColor={isDark ? '#ffffff' : '#000000'}
          />
        }
      >
        {/* Tab Navigation */}
        <TabNavigation 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isDark={isDark}
        />

        {activeTab === 'feed' ? (
          <View className="pb-20">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onLike={handleLike}
                onComment={handleComment}
                onShare={handleShare}
                isDark={isDark}
              />
            ))}
            
            {/* Load More Button */}
            <View className="p-4 items-center">
              <Pressable
                onPress={handleLoadMore}
                disabled={loading}
                className={`px-6 py-3 rounded-lg ${loading ? 'opacity-50' : ''} ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}
              >
                {loading ? (
                  <View className="flex-row items-center">
                    <ActivityIndicator 
                      size="small" 
                      color={isDark ? '#ffffff' : '#000000'} 
                      className="mr-2"
                    />
                    <Text className={`${isDark ? 'text-white' : 'text-black'} font-poppins`}>
                      Loading...
                    </Text>
                  </View>
                ) : (
                  <Text className={`${isDark ? 'text-white' : 'text-black'} font-poppins`}>
                    Load More Posts
                  </Text>
                )}
              </Pressable>
            </View>
          </View>
        ) : (
          <View className="p-4">
            <Text className={`text-center ${isDark ? 'text-white' : 'text-black'}`}>
              Bowls content goes here
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Top Loading Indicator */}
      <LoadingIndicator loading={loading} isDark={isDark} />

      {/* Floating Action Button */}
      <FloatingActionButton
        onPress={() => setShowPostModal(true)}
        isDark={isDark}
      />

      {/* Create Post Modal */}
      <CreatePostModal
        visible={showPostModal}
        onClose={() => setShowPostModal(false)}
        onSubmit={handleCreatePost}
        isDark={isDark}
      />
    </View>
  );
}