import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#0CAA41', // green like Glassdoor
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
  )
}
