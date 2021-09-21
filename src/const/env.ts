/* eslint-disable no-process-env */

/** 環境変数 */
export const ENV = {
  // DevT03 or LiveT03
  ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT || 'DevT03',
  // Firebase の環境変数
  firebase: {
    EMULATORS: process.env.NEXT_PUBLIC_FIREBASE_EMULATORS === 'on',
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_apiKey,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_authDomain,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_projectId,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_storageBucket,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_messagingSenderId,
    appId: process.env.NEXT_PUBLIC_FIREBASE_appId,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_measurementId,
  },
} as const;
