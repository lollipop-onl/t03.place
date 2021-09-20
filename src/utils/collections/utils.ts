import { collection, FirestoreDataConverter } from 'firebase/firestore/lite';
import { join } from 'path'
import { ENV } from '~/const';
import {firebase} from '../firebase';

export const getCollection = <T>(path: string, converter: FirestoreDataConverter<T>) => {
  return collection(firebase.db, join(ENV.ENVIRONMENT, path)).withConverter(converter);
};
