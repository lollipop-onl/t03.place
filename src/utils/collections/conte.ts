import { arrayOf, objectOf, primitives } from '@altostra/type-validations';
import { collection, FirestoreDataConverter } from 'firebase/firestore/lite';
import { ConteModel } from '~/types';
import { firebase } from '../firebase';

const isConte = objectOf({
  permalink: primitives.string,
  title: primitives.string,
  summary: primitives.string,
  performances: arrayOf(primitives.string),
  publishedAt: primitives.any,
  updatedAt: primitives.any,
});

const conteConverter: FirestoreDataConverter<ConteModel> = {
  toFirestore(conte) {
    return conte;
  },
  fromFirestore(snapshot) {
    const data = snapshot.data();

    if (isConte(data)) {
      return data;
    }

    console.warn('[conte] Invalid data received.');
    console.log(data);

    return data as any;
  },
};

export const conte = collection(firebase.db, 'contes').withConverter(
  conteConverter
);
