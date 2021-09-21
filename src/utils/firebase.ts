import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore/lite';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { ENV } from '~/const';

const app = initializeApp({
  apiKey: ENV.firebase.apiKey,
  authDomain: ENV.firebase.authDomain,
  projectId: ENV.firebase.projectId,
  storageBucket: ENV.firebase.storageBucket,
  messagingSenderId: ENV.firebase.messagingSenderId,
  appId: ENV.firebase.appId,
  measurementId: ENV.firebase.measurementId,
});

export const firebase = {
  db: getFirestore(app),
  auth: getAuth(app),
  storage: getStorage(app),
};

if (ENV.firebase.EMULATORS) {
  const { emulators } = require('../../firebase.json');

  connectAuthEmulator(firebase.auth, `http://localhost:${emulators.auth.port}`);
  connectFirestoreEmulator(firebase.db, 'localhost', emulators.firestore.port);
  connectStorageEmulator(firebase.storage, 'localhost', emulators.storage.port);
}
