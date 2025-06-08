import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Appearance,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';


const ProfileScreen = () => {
  const [isDarkMode, setIsDarkMode] = useState(Appearance.getColorScheme() === 'dark');
  const router = useRouter();
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setIsDarkMode(colorScheme === 'dark');
    });

    return () => subscription?.remove();
  }, []);

  const themes = {
    dark: {
      background: '#171717',
      text: '#ffffff',
      subtext: '#a1a1aa',
      iconColor: '#a1a1aa',
      border: '#2a2a2a',
      avatarBg: '#374151'
    },
    light: {
      background: '#ffffff',
      text: '#000000',
      subtext: '#6b7280',
      iconColor: '#6b7280',
      border: '#f3f4f6',
      avatarBg: '#e5e7eb'
    }
  };

  const currentTheme = isDarkMode ? themes.dark : themes.light;

  const menuItems = [
    { icon: 'user', label: 'Profile' },
    { icon: 'bookmark', label: 'Saved jobs' },
    { icon: 'sliders', label: 'Job preferences' },
    { icon: 'user-check', label: 'Following' },
    { icon: 'message-square', label: 'Posting activity' },
    { icon: 'settings', label: 'Account settings' },
    { icon: 'users', label: 'Demographics' }
  ];

  const renderMenuItem = ({ icon, label }) => (
    <TouchableOpacity 
      key={label}
      style={[styles.menuItem, { borderBottomColor: currentTheme.border }]}
      activeOpacity={0.7}
    >
      <View style={styles.menuItemLeft}>
        <Icon name={icon} size={20} color={currentTheme.iconColor} />
        <Text style={[styles.menuItemText, { color: currentTheme.text }]}>
          {label}
        </Text>
      </View>
      <Icon name="chevron-right" size={16} color={currentTheme.iconColor} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <StatusBar 
        barStyle={isDarkMode ? 'light-content' : 'dark-content'} 
        backgroundColor={currentTheme.background}
      />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.7}>
          <Icon name="chevron-left" size={24} color={currentTheme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: currentTheme.text }]}>
          Profile
        </Text>
        <View style={styles.headerRight} />
      </View>

      {/* Profile Info */}
      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <View style={[styles.avatar, { backgroundColor: currentTheme.avatarBg }]}>
            <Text style={[styles.avatarText, { color: currentTheme.text }]}>JS</Text>
          </View>
          <View style={[styles.editBadge, { borderColor: currentTheme.border }]}>
            <View style={[styles.editIcon, { backgroundColor: currentTheme.background }]}>
              <Icon name="settings" size={12} color={currentTheme.iconColor} />
            </View>
          </View>
        </View>
        <Text style={[styles.userName, { color: currentTheme.text }]}>
          Jesse Sarfo-Boateng
        </Text>
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {menuItems.map(renderMenuItem)}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Poppins',
    textAlign: 'center',
  },
  headerRight: {
    width: 32,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '600',
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  editIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
  },
  menuContainer: {
    flex: 1,
    paddingHorizontal: 16,
     
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
   
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 16,
  },
});

export default ProfileScreen;