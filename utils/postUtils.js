import { Alert, Share } from 'react-native';

export const sharePost = async (post) => {
  try {
    const result = await Share.share({
      message: `Check out this post: ${post.content.substring(0, 100)}...`,
      title: 'Share Post',
    });
    
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
        return true;
      } else {
        // shared
        return true;
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
      return false;
    }
  } catch (error) {
    Alert.alert('Error', 'Unable to share post');
    return false;
  }
};

export const formatTimeAgo = (timestamp) => {
  const now = new Date();
  const postTime = new Date(timestamp);
  const diffInMinutes = Math.floor((now - postTime) / (1000 * 60));
  
  if (diffInMinutes < 1) return 'now';
  if (diffInMinutes < 60) return `${diffInMinutes}m`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d`;
  
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) return `${diffInWeeks}w`;
  
  const diffInMonths = Math.floor(diffInDays / 30);
  return `${diffInMonths}mo`;
};

export const truncateText = (text, maxLength = 200) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const getPostCategories = () => {
  return [
    { id: 'general', name: 'General', emoji: '💬' },
    { id: 'career', name: 'Career', emoji: '🚀' },
    { id: 'workplace', name: 'Workplace', emoji: '🏢' },
    { id: 'tech', name: 'Tech', emoji: '💻' },
    { id: 'finance', name: 'Finance', emoji: '💰' },
    { id: 'remote', name: 'Remote Work', emoji: '🏠' },
    { id: 'interview', name: 'Interview', emoji: '🤝' },
    { id: 'salary', name: 'Salary', emoji: '💵' },
  ];
};

export const validatePost = (postData) => {
  const errors = [];
  
  if (!postData.text || postData.text.trim().length === 0) {
    errors.push('Post content is required');
  }
  
  if (postData.text && postData.text.length > 500) {
    errors.push('Post content must be less than 500 characters');
  }
  
  if (postData.images && postData.images.length > 5) {
    errors.push('Maximum 5 images allowed');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};