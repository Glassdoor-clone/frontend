// Add this state variable at the top with other state declarations
const [currentUser, setCurrentUser] = useState(null);

// Add this useEffect to load current user data
useEffect(() => {
  const loadCurrentUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        setCurrentUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Failed to load current user data:', error);
    }
  };
  loadCurrentUser();
}, []);

// Update the UserAvatar component to handle profileImage from userData
const UserAvatar = ({ user, size = 40 }) => {
  // Check for profileImage in user data (for current user posts)
  const profileImageUri = user?.profilePicture || user?.profileImage;
  
  if (profileImageUri) {
    return (
      <View style={[styles.userAvatar, { width: size, height: size, borderRadius: size / 2, overflow: 'hidden', backgroundColor: theme.primary }]}> 
        <Image source={{ uri: profileImageUri }} style={{ width: size, height: size, borderRadius: size / 2 }} />
      </View>
    );
  }
  return (
    <View style={[styles.userAvatar, { width: size, height: size, borderRadius: size / 2, backgroundColor: theme.primary }]}> 
      <Text style={styles.userInitials}>
        {user?.firstName?.charAt(0) || 'U'}{user?.lastName?.charAt(0) || ''}
      </Text>
    </View>
  );
};

// In the Post Modal, add user profile section after the modal header:
// Replace the existing modalHeader section with this:
<View style={styles.modalHeader}>
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    {currentUser && <UserAvatar user={currentUser} size={32} />}
    <View style={{ marginLeft: currentUser ? 12 : 0 }}>
      <Text style={styles.modalTitle}>Create Post</Text>
      {currentUser && (
        <Text style={{ fontSize: 14, color: theme.textSecondary, marginTop: 2 }}>
          Posting as {currentUser.fullName || currentUser.name || `${currentUser.firstName} ${currentUser.lastName}`}
        </Text>
      )}
    </View>
  </View>
  <TouchableOpacity
    style={styles.closeButton}
    onPress={closePostModal}
    activeOpacity={0.7}
  >
    <Ionicons name="close" size={20} color={theme.text} />
  </TouchableOpacity>
</View>