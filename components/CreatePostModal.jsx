import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function CreatePostModal({ visible, onClose, onSubmit, isDark }) {
  const [postText, setPostText] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [postingAs, setPostingAs] = useState('yourself');
  const [userData, setUserData] = useState(null);

  // Load user data when modal becomes visible
  useEffect(() => {
    if (visible) {
      loadUserData();
    }
  }, [visible]);

  const loadUserData = async () => {
    try {
      const data = await AsyncStorage.getItem('userData');
      if (data) {
        setUserData(JSON.parse(data));
      }
    } catch (error) {
      console.error('Failed to load user data:', error);
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Permission Required', 'Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.8,
      selectionLimit: 5,
    });

    if (!result.canceled) {
      setSelectedImages([...selectedImages, ...result.assets.map(asset => asset.uri)]);
    }
  };

  const removeImage = (index) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (postText.trim() === '') {
      Alert.alert('Error', 'Please enter some text for your post');
      return;
    }

    onSubmit({
      text: postText,
      images: selectedImages,
      isAnonymous: isAnonymous
    });

    // Reset form
    setPostText('');
    setSelectedImages([]);
    setIsAnonymous(false);
    setPostingAs('yourself');
  };

  const handleClose = () => {
    setPostText('');
    setSelectedImages([]);
    setIsAnonymous(false);
    setPostingAs('yourself');
    onClose();
  };

  const renderUserAvatar = () => {
    if (userData?.profileImage) {
      return (
        <Image 
          source={{ uri: userData.profileImage }} 
          className="w-8 h-8 rounded-full"
        />
      );
    } else {
      return (
        <View className={`w-8 h-8 rounded-full items-center justify-center ${isDark ? 'bg-blue-600' : 'bg-blue-500'}`}>
          <Text className="text-white text-xs font-medium">
            {getInitials(userData?.fullName || userData?.name)}
          </Text>
        </View>
      );
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className={`flex-1 ${isDark ? 'bg-neutral-900' : 'bg-white'}`}
      >
        {/* Header */}
        <View className={`flex-row items-center justify-between p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <TouchableOpacity onPress={handleClose}>
            <Ionicons 
              name="close" 
              size={24} 
              color={isDark ? '#FFFFFF' : '#000000'} 
            />
          </TouchableOpacity>
          
          <Text className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
            Create a post
          </Text>
          
          <TouchableOpacity 
            onPress={handleSubmit}
            className={`px-4 py-2 rounded-lg ${postText.trim() ? 'bg-green-600' : 'bg-gray-300'}`}
            disabled={!postText.trim()}
          >
            <Text className={`font-medium ${postText.trim() ? 'text-white' : 'text-gray-500'}`}>
              Post
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1">
          {/* Post As Section */}
          <View className="p-4">
            <TouchableOpacity 
              onPress={() => setPostingAs(postingAs === 'yourself' ? 'anonymous' : 'yourself')}
              className={`flex-row items-center p-3 rounded-lg ${isDark ? 'bg-neutral-800' : 'bg-gray-50'}`}
            >
              <View className={`w-10 h-10 rounded-full items-center justify-center ${isDark ? 'bg-neutral-700' : 'bg-gray-200'}`}>
                <Text className="text-lg">{postingAs === 'anonymous' ? '🎭' : '👤'}</Text>
              </View>
              <View className="flex-1 ml-3">
                <Text className={`font-medium ${isDark ? 'text-white' : 'text-black'}`}>
                  {postingAs === 'anonymous' ? 'Post anonymously' : 'Post as yourself'}
                </Text>
                <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {postingAs === 'anonymous' 
                    ? 'Your identity will be hidden' 
                    : 'Your profile will be visible'
                  }
                </Text>
              </View>
              <Ionicons 
                name="chevron-down" 
                size={20} 
                color={isDark ? '#9CA3AF' : '#6B7280'} 
              />
            </TouchableOpacity>

            {/* Anonymous Toggle */}
            <View className="mt-4">
              <Text className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Post as
              </Text>
              
              <TouchableOpacity
                onPress={() => {
                  setIsAnonymous(false);
                  setPostingAs('yourself');
                }}
                className={`flex-row items-center p-3 rounded-lg mb-2 ${
                  !isAnonymous 
                    ? (isDark ? 'bg-green-900/30 border border-green-500' : 'bg-green-50 border border-green-500')
                    : (isDark ? 'bg-neutral-800' : 'bg-gray-50')
                }`}
              >
                {renderUserAvatar()}
                <Text className={`ml-3 ${isDark ? 'text-white' : 'text-black'}`}>
                  {userData?.fullName || userData?.name || 'User'}
                </Text>
                {!isAnonymous && (
                  <Ionicons 
                    name="checkmark-circle" 
                    size={20} 
                    color="#10B981" 
                    style={{ marginLeft: 'auto' }}
                  />
                )}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setIsAnonymous(true);
                  setPostingAs('anonymous');
                }}
                className={`flex-row items-center p-3 rounded-lg ${
                  isAnonymous 
                    ? (isDark ? 'bg-green-900/30 border border-green-500' : 'bg-green-50 border border-green-500')
                    : (isDark ? 'bg-neutral-800' : 'bg-gray-50')
                }`}
              >
                <View className={`w-8 h-8 rounded-full items-center justify-center ${isDark ? 'bg-neutral-700' : 'bg-gray-200'}`}>
                  <Text className="text-sm">🎭</Text>
                </View>
                <Text className={`ml-3 ${isDark ? 'text-white' : 'text-black'}`}>
                  attends Kwame nkrumah university of science & technology
                </Text>
                {isAnonymous && (
                  <Ionicons 
                    name="checkmark-circle" 
                    size={20} 
                    color="#10B981" 
                    style={{ marginLeft: 'auto' }}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Text Input */}
          <View className="px-4">
            <TextInput
              multiline
              placeholder="Share your experience or get advice from other professionals"
              placeholderTextColor={isDark ? '#9CA3AF' : '#6B7280'}
              value={postText}
              onChangeText={setPostText}
              className={`text-base min-h-32 p-0 ${isDark ? 'text-white' : 'text-black'}`}
              textAlignVertical="top"
              autoFocus
            />
          </View>

          {/* Selected Images */}
          {selectedImages.length > 0 && (
            <ScrollView horizontal className="px-4 mt-4" showsHorizontalScrollIndicator={false}>
              {selectedImages.map((uri, index) => (
                <View key={index} className="relative mr-2">
                  <Image source={{ uri }} className="w-24 h-24 rounded-lg" />
                  <TouchableOpacity
                    onPress={() => removeImage(index)}
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 items-center justify-center"
                  >
                    <Ionicons name="close" size={14} color="white" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          )}
        </ScrollView>

        {/* Bottom Actions */}
        <View className={`flex-row items-center justify-between p-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <View className="flex-row">
            <TouchableOpacity onPress={handleImagePicker} className="mr-4">
              <Ionicons 
                name="image-outline" 
                size={24} 
                color={isDark ? '#9CA3AF' : '#6B7280'} 
              />
            </TouchableOpacity>
            
            <TouchableOpacity className="mr-4">
              <Ionicons 
                name="videocam-outline" 
                size={24} 
                color={isDark ? '#9CA3AF' : '#6B7280'} 
              />
            </TouchableOpacity>
          </View>

          <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {500 - postText.length}
          </Text>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}