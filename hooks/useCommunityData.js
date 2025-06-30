import { dummyPosts } from '@/data/dummyPosts';
import { useCallback, useState } from 'react';

export const useCommunityData = () => {
  const [posts, setPosts] = useState(dummyPosts);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

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

  // Loading handler for pagination
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

  return {
    posts,
    refreshing,
    loading,
    onRefresh,
    handleLoadMore,
    handleCreatePost,
    handleLike,
    handleComment,
    handleShare
  };
};