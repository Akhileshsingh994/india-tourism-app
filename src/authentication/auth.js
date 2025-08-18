import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup
  } from 'firebase/auth';
  import { doc, setDoc, getDoc } from 'firebase/firestore';
  import { auth, db } from '../firebase/config';
  
  export const authService = {
    // Sign up with Email/Password
    async signUp(email, password, displayName) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName });
  
        // Create user doc in Firestore
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          email,
          displayName,
          favorites: [],
          createdAt: new Date()
        });
  
        return userCredential.user;
      } catch (error) {
        console.error('Error signing up:', error);
        throw error;
      }
    },
  
    // Sign in with Email/Password
    async signIn(email, password) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
      } catch (error) {
        console.error('Error signing in:', error);
        throw error;
      }
    },
  
    // Sign in with Google
    async signInWithGoogle() {
      try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
  
        const user = result.user;
  
        // Create user doc if not exists
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
  
        if (!userDoc.exists()) {
          await setDoc(userDocRef, {
            email: user.email,
            displayName: user.displayName,
            favorites: [],
            createdAt: new Date()
          });
        }
  
        return user;
      } catch (error) {
        console.error('Error signing in with Google:', error);
        throw error;
      }
    },
  
    // Sign out
    async signOut() {
      try {
        await signOut(auth);
      } catch (error) {
        console.error('Error signing out:', error);
        throw error;
      }
    },
  
    // Get current user
    getCurrentUser() {
      return auth.currentUser;
    },
  
    // Listen to auth state changes
    onAuthStateChanged(callback) {
      return onAuthStateChanged(auth, callback);
    }
  };