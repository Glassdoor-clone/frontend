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
  View
} from 'react-native';

export default function RegisterScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [currentStep, setCurrentStep] = useState(1);
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

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceedFromStep1 = () => {
    return formData.fullName.trim() !== '';
  };

  const canProceedFromStep2 = () => {
    return formData.email.trim() !== '' && formData.password.length >= 6;
  };

  const styles = {
    container: {
      flex: 1,
      backgroundColor: isDark ? '#171717' : '#ffffff',
    },
    content: {
      flex: 1,
      padding: 32,
    },
    header: {
      marginTop: 60,
      marginBottom: 40,
      alignItems: 'center',
    },
    imagePlaceholder: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: isDark ? '#374151' : '#e5e7eb',
      marginBottom: 24,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: isDark ? '#4b5563' : '#d1d5db',
      borderStyle: 'dashed',
    },
    imagePlaceholderText: {
      fontSize: 12,
      color: isDark ? '#9ca3af' : '#6b7280',
      textAlign: 'center',
      marginTop: 8,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: isDark ? '#ffffff' : '#171717',
      marginBottom: 12,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 18,
      color: isDark ? '#a3a3a3' : '#666666',
      textAlign: 'center',
      lineHeight: 24,
    },
    stepIndicator: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 40,
    },
    stepDot: {
      width: 12,
      height: 12,
      borderRadius: 6,
      marginHorizontal: 8,
    },
    stepDotActive: {
      backgroundColor: '#0CAA41',
    },
    stepDotInactive: {
      backgroundColor: isDark ? '#374151' : '#d1d5db',
    },
    stepLine: {
      width: 40,
      height: 2,
      backgroundColor: isDark ? '#374151' : '#d1d5db',
    },
    stepLineActive: {
      backgroundColor: '#0CAA41',
    },
    form: {
      flex: 1,
    },
    inputGroup: {
      marginBottom: 28,
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
      color: isDark ? '#ffffff' : '#171717',
      marginBottom: 12,
    },
    input: {
      borderWidth: 2,
      borderColor: isDark ? '#374151' : '#e5e7eb',
      borderRadius: 16,
      padding: 20,
      fontSize: 16,
      backgroundColor: isDark ? '#1f2937' : '#f9fafb',
      color: isDark ? '#ffffff' : '#171717',
      minHeight: 56,
    },
    inputFocused: {
      borderColor: '#0CAA41',
    },
    pickerContainer: {
      borderWidth: 2,
      borderColor: isDark ? '#374151' : '#e5e7eb',
      borderRadius: 16,
      backgroundColor: isDark ? '#1f2937' : '#f9fafb',
      minHeight: 56,
      justifyContent: 'center',
    },
    picker: {
      color: isDark ? '#ffffff' : '#171717',
    },
    switchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 32,
      padding: 20,
      borderRadius: 16,
      backgroundColor: isDark ? '#1f2937' : '#f9fafb',
    },
    switchLabel: {
      flex: 1,
      fontSize: 16,
      color: isDark ? '#ffffff' : '#171717',
      marginRight: 16,
      lineHeight: 22,
    },
    buttonContainer: {
      marginTop: 20,
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 16,
    },
    button: {
      backgroundColor: '#0CAA41',
      borderRadius: 16,
      padding: 20,
      alignItems: 'center',
      flex: 1,
      minHeight: 56,
      justifyContent: 'center',
    },
    buttonSecondary: {
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: isDark ? '#374151' : '#e5e7eb',
    },
    buttonDisabled: {
      backgroundColor: '#6b7280',
    },
    buttonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '600',
    },
    buttonTextSecondary: {
      color: isDark ? '#ffffff' : '#171717',
    },
    loginLink: {
      marginTop: 32,
      alignItems: 'center',
    },
    loginText: {
      color: isDark ? '#a3a3a3' : '#666666',
      fontSize: 16,
      textAlign: 'center',
    },
    loginButton: {
      color: '#0CAA41',
      fontWeight: '600',
    },
  };

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      <View style={[styles.stepDot, currentStep >= 1 ? styles.stepDotActive : styles.stepDotInactive]} />
      <View style={[styles.stepLine, currentStep >= 2 ? styles.stepLineActive : styles.stepLine]} />
      <View style={[styles.stepDot, currentStep >= 2 ? styles.stepDotActive : styles.stepDotInactive]} />
      <View style={[styles.stepLine, currentStep >= 3 ? styles.stepLineActive : styles.stepLine]} />
      <View style={[styles.stepDot, currentStep >= 3 ? styles.stepDotActive : styles.stepDotInactive]} />
    </View>
  );

  const renderStep1 = () => (
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
        <Text style={styles.label}>Location</Text>
        <TextInput
          style={styles.input}
          value={formData.location}
          onChangeText={(text) => setFormData({...formData, location: text})}
          placeholder="Enter your location"
          placeholderTextColor={isDark ? '#6b7280' : '#9ca3af'}
        />
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.form}>
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
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.form}>
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
          placeholder="Enter your password (min 6 characters)"
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
    </View>
  );

  const renderButtons = () => {
    if (currentStep === 1) {
      return (
        <TouchableOpacity
          style={[styles.button, !canProceedFromStep1() && styles.buttonDisabled]}
          onPress={nextStep}
          disabled={!canProceedFromStep1()}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      );
    }

    if (currentStep === 2) {
      return (
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.buttonSecondary]}
            onPress={prevStep}
          >
            <Text style={[styles.buttonText, styles.buttonTextSecondary]}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={nextStep}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.buttonSecondary]}
          onPress={prevStep}
        >
          <Text style={[styles.buttonText, styles.buttonTextSecondary]}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, (!canProceedFromStep2() || loading) && styles.buttonDisabled]}
          onPress={handleRegister}
          disabled={!canProceedFromStep2() || loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return 'Personal Information';
      case 2:
        return 'Professional Details';
      case 3:
        return 'Account Setup';
      default:
        return 'Create Account';
    }
  };

  const getStepSubtitle = () => {
    switch (currentStep) {
      case 1:
        return 'Tell us a bit about yourself';
      case 2:
        return 'Share your professional background';
      case 3:
        return 'Set up your login credentials';
      default:
        return 'Join our community today';
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>Your Logo{'\n'}Here</Text>
          </View>
          <Text style={styles.title}>{getStepTitle()}</Text>
          <Text style={styles.subtitle}>{getStepSubtitle()}</Text>
        </View>

        {renderStepIndicator()}

        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}

        <View style={styles.buttonContainer}>
          {renderButtons()}
        </View>

        {currentStep === 1 && (
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
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}