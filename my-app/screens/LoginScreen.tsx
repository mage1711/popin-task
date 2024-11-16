import { View, StyleSheet, Button, Alert } from 'react-native';
import { useGoogleSignIn } from '../hooks/useGoogleSignIn';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../navigation/AppStack';
import { useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

type Props = {
  navigation: NativeStackNavigationProp<AppStackParamList, 'Login'>;
};

export default function LoginScreen({ navigation }: Props) {
  const { signIn, loading, error } = useGoogleSignIn();

  useEffect(() => {
    if (error) {
      let title = 'Sign In Failed';
      let message = 'Please try again later.';

      switch (error.code) {
        case 'play_services_not_available':
          title = 'Google Play Services Required';
          message = 'Please install or update Google Play Services to sign in.';
          break;
        case 'network_error':
          title = 'Connection Error';
          message = 'Please check your internet connection and try again.';
          break;
        default:
          if (error.message) {
            message = error.message;
          }
      }

      Alert.alert(
        title,
        message,
        [{ text: 'OK', style: 'default' }],
        { cancelable: true }
      );
    }
  }, [error]);

  const handleSignIn = async () => {
    try {
      const user = await signIn();
      if (user) {
        try {
          const response = await axios.get(
            `${API_BASE_URL}/api/user`,
            {
              headers: {
                Authorization: `Bearer ${await user.getIdToken()}`
              }
            }
          );
          const userData = response.data;

          if (userData.username) {
            navigation.replace('Home', { username: userData.username });
          } else {
            navigation.replace('Onboarding', {
              user: {
                firebaseId: user.uid,
                displayName: user.displayName,
              },
            });
          }
        } catch (err) {
          Alert.alert(
            'Connection Error',
            'Unable to retrieve your profile. Please check your internet connection and try again.',
            [{ text: 'OK', style: 'default' }]
          );
        }
      }
    } catch (err) {
      // Sign-in errors are already handled in useEffect
      console.error('Sign-in error:', err);
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title={loading ? 'Loading...' : 'Sign in with Google'}
        onPress={handleSignIn}
        disabled={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 