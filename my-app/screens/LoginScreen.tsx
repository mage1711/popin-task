import { View, StyleSheet, Button } from 'react-native';
import { useGoogleSignIn } from '../hooks/useGoogleSignIn';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../navigation/AppStack';
import { useEffect } from 'react';

type Props = {
  navigation: NativeStackNavigationProp<AppStackParamList, 'Login'>;
};

export default function LoginScreen({ navigation }: Props) {
  const { signIn, loading, error } = useGoogleSignIn();

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error.message);
    }
  }, [error]);

  const handleSignIn = async () => {
    try {
      const user = await signIn();
      if (user) {
        navigation.replace('Onboarding', {
          user: {
            firebaseId: user.uid,
            displayName: user.displayName,
          },
        });
      }
    } catch (err) {
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