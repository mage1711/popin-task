import { z } from 'zod';
import { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Text } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../navigation/AppStack';
import { RouteProp } from '@react-navigation/native';
import axios from 'axios';

// Define the username schema
const usernameSchema = z.string()
  .min(4, 'Username must be at least 4 characters long')
  .regex(/^@/, 'Username must start with @')
  .trim();

type Props = {
  navigation: NativeStackNavigationProp<AppStackParamList, 'Onboarding'>;
  route: RouteProp<AppStackParamList, 'Onboarding'>;
};

export default function OnboardingScreen({ navigation, route }: Props) {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = route.params;

  const validateUsername = (value: string): string => {
    try {
      usernameSchema.parse(value);
      return '';
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.errors[0].message;
      }
      return 'Invalid username';
    }
  };

  const handleSubmit = async () => {
    const trimmedUsername = username.trim();
    const validationError = validateUsername(trimmedUsername);
    
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      await axios.post('http://localhost:3000/api/user/username', {
        username: trimmedUsername,
        firebaseId: user.firebaseId,
      });
      navigation.replace('Home', { username: trimmedUsername });
    } catch (error) {
      setError('Failed to save username');
    } finally {
      setLoading(false);
    }
  };

  const handleUsernameChange = (value: string) => {
    setUsername(value);
    setError('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        placeholder="Enter your username"
        value={username}
        onChangeText={handleUsernameChange}
        autoCapitalize="none"
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Button
        title={loading ? 'Saving...' : 'Continue'}
        onPress={handleSubmit}
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
    padding: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
}); 