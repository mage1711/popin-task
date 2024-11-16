import { View, Text, StyleSheet, Button } from 'react-native';
import { useGoogleSignIn } from '../hooks/useGoogleSignIn';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../navigation/AppStack';
import { RouteProp } from '@react-navigation/native';

type Props = {
  navigation: NativeStackNavigationProp<AppStackParamList, 'Home'>;
  route: RouteProp<AppStackParamList, 'Home'>;
};

export default function HomeScreen({ navigation, route }: Props) {
  const { signOut } = useGoogleSignIn();
  const { username } = route.params;

  const handleSignOut = async () => {
    try {
      await signOut();
      navigation.replace('Login');
    } catch (error) {
      console.error('Sign-out error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome, {username}!</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
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
  welcome: {
    fontSize: 24,
    marginBottom: 20,
  },
}); 