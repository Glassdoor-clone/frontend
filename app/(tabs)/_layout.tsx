import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StyleSheet, useColorScheme, View } from 'react-native';
import Header from '../../components/Header'; // Adjust path if needed

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#0CAA41', // green like Glassdoor
            tabBarInactiveTintColor: isDark ? '#a1a1aa' : '#4b5563',
            tabBarStyle: {
              backgroundColor: isDark ? '#171717' : '#ffffff',
              borderTopColor: isDark ? '#1f2937' : '#e5e7eb',
              height: 80,
            },
            tabBarLabelStyle: {
              fontSize: 12,
              fontFamily: 'Inter',
            },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: 'Community',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="account-group" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="jobs"
            options={{
              title: 'Jobs',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="briefcase" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="companies"
            options={{
              title: 'Companies',
              tabBarIcon: ({ color, size }) => (
                <FontAwesome5 name="building" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="salaries"
            options={{
              title: 'Salaries',
              tabBarIcon: ({ color, size }) => (
                <FontAwesome5 name="money-check-alt" size={size} color={color} />
              ),
            }}
          />
        </Tabs>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1  },
});
