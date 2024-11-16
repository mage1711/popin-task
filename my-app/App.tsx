import { NavigationContainer } from '@react-navigation/native';
import { useEffect } from 'react';
import { configureGoogleSignIn } from './config/google-signin';
import { AppStack } from './navigation/AppStack';

export default function App() {
  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
}
