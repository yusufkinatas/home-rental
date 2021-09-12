import Toast from 'react-native-toast-message';

export const message = {
  success: (text: string) => Toast.show({ type: 'success', text1: text }),
  error: (text: string) => Toast.show({ type: 'error', text1: text }),
  info: (text: string) => Toast.show({ type: 'info', text1: text })
};
