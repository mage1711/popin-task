import { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { SignInError } from '../types/user';


export const useGoogleSignIn = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<SignInError | null>(null);

  const getErrorMessage = (err: any): SignInError => {
    let message = 'An unexpected error occurred';
    let code = 'unknown_error';
    let technical = err.message;
    if (err.code === statusCodes.SIGN_IN_CANCELLED) {
      message = 'Sign in was cancelled';
      code = 'sign_in_cancelled';
    } else if (err.code === statusCodes.IN_PROGRESS) {
      message = 'Sign in is already in progress';
      code = 'sign_in_in_progress';
    } else if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      message = 'Google Play services are not available';
      code = 'play_services_not_available';
    } else if (err.code === 'auth/network-request-failed') {
      message = 'Network connection failed. Please check your internet connection.';
      code = 'network_error';
    }

    return { message, code, technical };
  };

  const clearError = () => setError(null);

  const signIn = async () => {
    try {
      setLoading(true);
      setError(null);
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const signInResult = await GoogleSignin.signIn();

      let idToken = signInResult.data?.idToken;

      if (!idToken) {
        throw new Error('No ID token found');
      }

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(googleCredential);
      
      return userCredential.user;
    } catch (err: any) {
      const errorDetails = getErrorMessage(err);
      setError(errorDetails);
      throw errorDetails;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      await GoogleSignin.signOut();
      await auth().signOut();
    } catch (err: any) {
      const errorDetails = getErrorMessage(err);
      setError(errorDetails);
      throw errorDetails;
    }
  };

  return {
    signIn,
    signOut,
    loading,
    error,
    clearError
  };
};
