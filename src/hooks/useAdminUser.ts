import { useEffect, useState } from 'react'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut as authSignOut, User } from 'firebase/auth'
import { firebase } from '~/utils';

export const useAdminUser = () => {
  const [adminUser, setAdminUser] = useState<User | boolean | null>(false);

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(firebase.auth, email, password);
  }

  const signOut = async () => {
    await authSignOut(firebase.auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebase.auth, (user) => {
      setAdminUser(user)
    });

    return unsubscribe;
  }, []);

  return {
    adminUser,
    signIn,
    signOut,
  }
}
