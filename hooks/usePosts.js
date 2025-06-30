import { dummyPosts } from '@/data/dummyPosts';
import { sharePost, validatePost } from '@/utils/postUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const POSTS_STORAGE_KEY = '@community_posts';

export const usePosts = () => {
  const [posts, setPosts] = useState(dummyPosts);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Load posts from storage on mount
  useEffect(() => {
    loadPostsFromStorage();
  }, []);

  const loadPostsFromStorage = async () => {
    try {
      const storedPosts = await AsyncStorage.getItem(POSTS_STORAGE_KEY);
      if (storedPosts) {
        const parsedPosts = JSON.parse(storedPosts);
        setPosts([...parsedPosts, ...dummyPosts]);
      }
    } catch (error) {
      console.error('Error loading posts:', error);
    }
  };

  const savePostsToStorage = async (newPosts) => {
    try {
      // Only save user-created posts, not dummy data
      const userPosts = newPosts.filter(post => post.user === 'You' || post.user === 'Anonymous');
      await AsyncStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(userPosts));
    } catch (error) {
      console.error('Error saving posts:', error);
    }
  };

  const createPost = async (postData) => {
    const validation = validatePost(postData);
    
    if (!validation.isValid) {
      throw new Error(validation.errors.join(', '));
    }

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
      category: postData.category || 'General',
      images: postData.images || [],
      isAnonymous: postData.isAnonymous,
      timestamp: new Date().toISOString(),
    };

    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    await savePostsToStorage(updatedPosts);
    
    return newPost;
  };

  const likePost = async (postId) => {
    const updatedPosts = posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          }
        : post
    );
    
    setPosts(updatedPosts);
    await savePostsToStorage(updatedPosts);
  };

  const sharePostById = async (postId) => {
    const post = posts.find(p => p.id === postId);
    if (!post) return false;

    const success = await sharePost(post);
    
    if (success) {
      const updatedPosts = posts.map(p => 
        p.id === postId 
          ? { ...p, shares: p.shares + 1 }
          : p
      );
      
      setPosts(updatedPosts);
      await savePostsToStorage(updatedPosts);
    }
    
    return success;
  };

  const deletePost = async (postId) => {
    const updatedPosts = posts.filter(post => post.id !== postId);
    setPosts(updatedPosts);
    await savePostsToStorage(updatedPosts);
  };

  const refreshPosts = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const getPostsByCategory = (category) => {
    if (!category || category === 'all') return posts;
    return posts.filter(post => 
      post.category.toLowerCase() === category.toLowerCase()
    );
  };

  const searchPosts = (query) => {
    if (!query.trim()) return posts;
    
    const lowercaseQuery = query.toLowerCase();
    return posts.filter(post => 
      post.content.toLowerCase().includes(lowercaseQuery) ||
      post.user.toLowerCase().includes(lowercaseQuery) ||
      post.role.toLowerCase().includes(lowercaseQuery) ||
      post.category.toLowerCase().includes(lowercaseQuery)
    );
  };

  return {
    posts,
    loading,
    refreshing,
    createPost,
    likePost,
    sharePostById,
    deletePost,
    refreshPosts,
    getPostsByCategory,
    searchPosts,
  };
};