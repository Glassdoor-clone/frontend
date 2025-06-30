import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

export default function FloatingActionButton({ onPress, isDark }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="absolute bottom-6 right-6 w-14 h-14 rounded-full bg-green-600 items-center justify-center shadow-lg"
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <Ionicons name="add" size={28} color="white" />
    </TouchableOpacity>
  );
}