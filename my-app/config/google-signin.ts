import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const configureGoogleSignIn = () => {
  // needs to be in an env variable
  GoogleSignin.configure({
    webClientId: '532148400047-3423bulqe48tnoutvbnne11r73j41moi.apps.googleusercontent.com',
    iosClientId: '532148400047-3423bulqe48tnoutvbnne11r73j41moi.apps.googleusercontent.com',
    offlineAccess: true,
  });
}; 
