import { arrayOf, objectOf, primitives } from '@altostra/type-validations';
import { FirestoreDataConverter } from 'firebase/firestore/lite';
import { ConteModel } from '~/types';
import { getCollection } from './utils';

const isConte = objectOf({
  permalink: primitives.string,
  title: primitives.string,
  summary: primitives.string,
  performances: arrayOf(primitives.string),
  publishedAt: primitives.any,
  updatedAt: primitives.any,
});

export const conte = getCollection<ConteModel>('contes', {
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
});
