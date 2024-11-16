import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const configureGoogleSignIn = () => {
  GoogleSignin.configure({
    webClientId: '80546222811-ugvrj74iie1qd8i7efu8agh0bvq3edht.apps.googleusercontent.com',
    iosClientId: '80546222811-jji24ek4cir38rr3s5rmbjqkfbrb6fsd.apps.googleusercontent.com',
    offlineAccess: true,
  });
}; 
