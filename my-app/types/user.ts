export type User = {
  firebaseId: string;
  displayName: string | null;
  username?: string;
};

export type SignInError = {
  code: string;
  message: string;
  technical?: string;
}; 
