import * as DocumentPicker from 'expo-document-picker';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  Appearance,
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const ProfilePage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const colorScheme = Appearance.getColorScheme();
    setDarkMode(colorScheme === 'dark');

    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setDarkMode(colorScheme === 'dark');
    });

    return subscription?.remove;
  }, []);

  const handleFileUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'text/plain',
        ],
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (result?.assets && result.assets.length > 0) {
        setUploadedFile(result.assets[0]);
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to pick document');
    }
  };

  const handlePrivacyPolicyPress = () => {
    Linking.openURL('https://example.com/privacy-policy');
  };

  const styles = createStyles(darkMode);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Feather name="chevron-left" size={24} onPress={()=> router.back()} color={styles.text.color} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.headerRight} />
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.infoSection}>
          <View style={styles.infoContent}>
            <Text style={styles.sectionTitle}>My information</Text>
            <Text style={styles.sectionSubtitle}>
              Get the best job matches and a more relevant community experience.
            </Text>
          </View>
          <Feather name="chevron-right" size={20} color={styles.secondaryText.color} />
        </TouchableOpacity>
      </View>

      <View style={styles.fieldsContainer}>
        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>Full name</Text>
          <Text style={styles.fieldValue}>Jesse Sarfo-Boateng</Text>
        </View>
        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>Employment status</Text>
          <Text style={styles.fieldValue}>Student</Text>
        </View>
        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>Current location</Text>
          <Text style={styles.fieldValue}></Text>
        </View>
        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>University or college</Text>
          <Text style={styles.fieldValue}>Kwame Nkrumah University Of S...</Text>
        </View>
        <View style={[styles.fieldRow, { borderBottomWidth: 0 }]}>
          <Text style={styles.fieldLabel}>Degree type</Text>
          <Text style={styles.fieldValue}></Text>
        </View>
      </View>

      <View style={styles.resumeSection}>
        <Text style={styles.resumeTitle}>Resume</Text>
        <Text style={styles.resumeDescription}>
          After you upload a resume, it will be used to pre-fill job applications that you submit via Easy Apply. You can also make your resume visible or not visible to employers that are currently hiring. See our{' '}
          <Text style={styles.privacyLink} onPress={handlePrivacyPolicyPress}>
            Privacy Policy
          </Text>{' '}
          for more info.
        </Text>

        <TouchableOpacity style={styles.uploadButton} onPress={handleFileUpload}>
          <Feather name="upload" size={20} color={styles.text.color} />
          <View style={styles.uploadTextContainer}>
            <Text style={styles.uploadTitle}>Upload Resume</Text>
            <Text style={styles.uploadSubtitle}>Use a pdf, docx, doc, rtf and txt</Text>
          </View>
        </TouchableOpacity>

        {uploadedFile && (
          <View style={styles.fileContainer}>
            <View style={styles.fileIcon}>
              <Text style={styles.fileIconText}>📄</Text>
            </View>
            <View style={styles.fileInfo}>
              <Text style={styles.fileName}>{uploadedFile.name}</Text>
              <Text style={styles.fileSize}>
                {uploadedFile.size
                  ? `${(uploadedFile.size / 1024 / 1024).toFixed(2)} MB`
                  : 'Unknown size'}
              </Text>
            </View>
          </View>
        )}
      </View>

      
    </SafeAreaView>
  );
};

const createStyles = (darkMode) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkMode ? '#171717' : '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    justifyContent: 'space-between',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Poppins',
    color: darkMode ? '#ffffff' : '#000000',
  },
  headerRight: {
    width: 32,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  infoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  infoContent: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: darkMode ? '#ffffff' : '#000000',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: darkMode ? '#a1a1aa' : '#6b7280',
    lineHeight: 20,
  },
  fieldsContainer: {
    paddingHorizontal: 16,
  },
  fieldRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: darkMode ? '#404040' : '#e5e7eb',
  },
  fieldLabel: {
    fontSize: 16,
    color: darkMode ? '#ffffff' : '#000000',
  },
  fieldValue: {
    fontSize: 16,
    color: darkMode ? '#a1a1aa' : '#6b7280',
    flex: 1,
    textAlign: 'right',
  },
  resumeSection: {
    paddingHorizontal: 16,
    marginTop: 32,
  },
  resumeTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: darkMode ? '#ffffff' : '#000000',
    marginBottom: 16,
  },
  resumeDescription: {
    fontSize: 14,
    color: darkMode ? '#a1a1aa' : '#6b7280',
    lineHeight: 20,
    marginBottom: 24,
  },
  privacyLink: {
    color: '#10b981',
    textDecorationLine: 'underline',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: darkMode ? '#404040' : '#e5e7eb',
    borderStyle: 'dashed',
    borderRadius: 8,
    marginTop: 24,
  },
  uploadTextContainer: {
    marginLeft: 12,
  },
  uploadTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: darkMode ? '#ffffff' : '#000000',
  },
  uploadSubtitle: {
    fontSize: 14,
    color: darkMode ? '#a1a1aa' : '#6b7280',
  },
  fileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: darkMode ? '#262626' : '#f3f4f6',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  fileIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#10b981',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  fileIconText: {
    fontSize: 16,
  },
  fileInfo: {
    flex: 1,
  },
  fileName: {
    fontSize: 16,
    fontWeight: '500',
    color: darkMode ? '#ffffff' : '#000000',
  },
  fileSize: {
    fontSize: 14,
    color: darkMode ? '#a1a1aa' : '#6b7280',
  },
  text: {
    color: darkMode ? '#ffffff' : '#000000',
  },
  secondaryText: {
    color: darkMode ? '#a1a1aa' : '#6b7280',
  },
});

export default ProfilePage;
