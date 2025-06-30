export const COLORS = {
  primary: '#16A34A', // green-600
  primaryDark: '#15803D', // green-700
  secondary: '#10B981', // emerald-500
  accent: '#06B6D4', // cyan-500
  
  // Light theme
  light: {
    background: '#FFFFFF',
    surface: '#F9FAFB', // gray-50
    text: '#000000',
    textSecondary: '#6B7280', // gray-500
    border: '#E5E7EB', // gray-200
  },
  
  // Dark theme
  dark: {
    background: '#171717', // neutral-900
    surface: '#262626', // neutral-800
    text: '#FFFFFF',
    textSecondary: '#9CA3AF', // gray-400
    border: '#374151', // gray-700
  }
};

export const SIZES = {
  padding: 16,
  margin: 16,
  borderRadius: 8,
  avatarSize: 48,
  iconSize: 24,
};

export const FONTS = {
  regular: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

export const POST_TYPES = {
  TEXT: 'text',
  IMAGE: 'image',
  VIDEO: 'video',
  POLL: 'poll',
};

export const REACTION_TYPES = {
  LIKE: 'like',
  LOVE: 'love',
  LAUGH: 'laugh',
  ANGRY: 'angry',
  SAD: 'sad',
};

export const MAX_POST_LENGTH = 500;
export const MAX_IMAGES_PER_POST = 5;
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

export const ANONYMOUS_AVATARS = ['🎭', '👤', '🕶️', '🎪', '🔮'];

export const PROFESSIONAL_ROLES = [
  'Software Engineer',
  'Product Manager',
  'Data Scientist',
  'UX Designer',
  'Marketing Manager',
  'Sales Representative',
  'Financial Analyst',
  'HR Manager',
  'Operations Manager',
  'Consultant',
  'Project Manager',
  'Business Analyst',
  'Other'
];

export const INDUSTRIES = [
  'Technology',
  'Finance',
  'Healthcare',
  'Education',
  'Marketing',
  'Sales',
  'Manufacturing',
  'Retail',
  'Consulting',
  'Government',
  'Non-profit',
  'Other'
];