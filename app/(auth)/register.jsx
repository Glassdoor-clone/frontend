import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

export default function RegisterScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    employmentStatus: '',
    jobTitle: '',
    location: '',
    currentEmployer: '',
    university: '',
    email: '',
    password: '',
    newsletter: false,
  });

  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!formData.fullName || !formData.email || !formData.password) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (formData.password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const userData = {
        ...formData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };

      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      await AsyncStorage.setItem('userToken', 'authenticated');

      Alert.alert('Success', 'Account created successfully!', [
        { text: 'OK', onPress: () => router.replace('/(tabs)') }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      flex: 1,
      backgroundColor: isDark ? '#171717' : '#ffffff',
    },
    content: {
      flex: 1,
      padding: 24,
    },
    header: {
      marginTop: 60,
      marginBottom: 32,
      alignItems: 'center',
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: isDark ? '#ffffff' : '#171717',
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: isDark ? '#a3a3a3' : '#666666',
      textAlign: 'center',
    },
    form: {
      flex: 1,
    },
    inputGroup: {
      marginBottom: 16,
    },
    label: {
      fontSize: 14,
      fontWeight: '600',
      color: isDark ? '#ffffff' : '#171717',
      marginBottom: 8,
    },
    input: {
      borderWidth: 1,
      borderColor: isDark ? '#374151' : '#d1d5db',
      borderRadius: 12,
      padding: 16,
      fontSize: 16,
      backgroundColor: isDark ? '#1f2937' : '#f9fafb',
      color: isDark ? '#ffffff' : '#171717',
    },
    pickerContainer: {
      borderWidth: 1,
      borderColor: isDark ? '#374151' : '#d1d5db',
      borderRadius: 12,
      backgroundColor: isDark ? '#1f2937' : '#f9fafb',
    },
    picker: {
      color: isDark ? '#ffffff' : '#171717',
    },
    switchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 24,
    },
    switchLabel: {
      flex: 1,
      fontSize: 14,
      color: isDark ? '#ffffff' : '#171717',
      marginRight: 12,
    },
    button: {
      backgroundColor: '#0CAA41',
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      marginTop: 8,
    },
    buttonDisabled: {
      backgroundColor: '#6b7280',
    },
    buttonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '600',
    },
    loginLink: {
      marginTop: 24,
      alignItems: 'center',
    },
    loginText: {
      color: isDark ? '#a3a3a3' : '#666666',
      fontSize: 14,
    },
    loginButton: {
      color: '#0CAA41',
      fontWeight: '600',
    },
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join our community today</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name *</Text>
            <TextInput
              style={styles.input}
              value={formData.fullName}
              onChangeText={(text) => setFormData({...formData, fullName: text})}
              placeholder="Enter your full name"
              placeholderTextColor={isDark ? '#6b7280' : '#9ca3af'}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Gender</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.gender}
                onValueChange={(value) => setFormData({...formData, gender: value})}
                style={styles.picker}
              >
                <Picker.Item label="Select gender" value="" />
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
                <Picker.Item label="Other" value="other" />
                <Picker.Item label="Prefer not to say" value="prefer_not_to_say" />
              </Picker>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Employment Status</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.employmentStatus}
                onValueChange={(value) => setFormData({...formData, employmentStatus: value})}
                style={styles.picker}
              >
                <Picker.Item label="Select employment status" value="" />
                <Picker.Item label="Employed" value="employed" />
                <Picker.Item label="Unemployed" value="unemployed" />
                <Picker.Item label="Student" value="student" />
                <Picker.Item label="Self-employed" value="self_employed" />
                <Picker.Item label="Retired" value="retired" />
              </Picker>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Job Title</Text>
            <TextInput
              style={styles.input}
              value={formData.jobTitle}
              onChangeText={(text) => setFormData({...formData, jobTitle: text})}
              placeholder="Enter your job title"
              placeholderTextColor={isDark ? '#6b7280' : '#9ca3af'}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Location</Text>
            <TextInput
              style={styles.input}
              value={formData.location}
              onChangeText={(text) => setFormData({...formData, location: text})}
              placeholder="Enter your location"
              placeholderTextColor={isDark ? '#6b7280' : '#9ca3af'}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Current Employer</Text>
            <TextInput
              style={styles.input}
              value={formData.currentEmployer}
              onChangeText={(text) => setFormData({...formData, currentEmployer: text})}
              placeholder="Enter your current employer"
              placeholderTextColor={isDark ? '#6b7280' : '#9ca3af'}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>University/College</Text>
            <TextInput
              style={styles.input}
              value={formData.university}
              onChangeText={(text) => setFormData({...formData, university: text})}
              placeholder="Enter your university or college"
              placeholderTextColor={isDark ? '#6b7280' : '#9ca3af'}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address *</Text>
            <TextInput
              style={styles.input}
              value={formData.email}
              onChangeText={(text) => setFormData({...formData, email: text})}
              placeholder="Enter your email"
              placeholderTextColor={isDark ? '#6b7280' : '#9ca3af'}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password *</Text>
            <TextInput
              style={styles.input}
              value={formData.password}
              onChangeText={(text) => setFormData({...formData, password: text})}
              placeholder="Enter your password"
              placeholderTextColor={isDark ? '#6b7280' : '#9ca3af'}
              secureTextEntry
            />
          </View>

          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>
              Subscribe to our newsletter for updates and opportunities
            </Text>
            <Switch
              value={formData.newsletter}
              onValueChange={(value) => setFormData({...formData, newsletter: value})}
              trackColor={{ false: '#767577', true: '#0CAA41' }}
              thumbColor={formData.newsletter ? '#ffffff' : '#f4f3f4'}
            />
          </View>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleRegister}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </Text>
          </TouchableOpacity>

          <View style={styles.loginLink}>
            <Text style={styles.loginText}>
              Already have an account?{' '}
              <Text 
                style={styles.loginButton}
                onPress={() => router.push('/(auth)/login')}
              >
                Sign In
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}