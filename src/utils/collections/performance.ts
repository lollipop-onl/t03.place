import { objectOf, primitives } from '@altostra/type-validations';
import { collection, FirestoreDataConverter } from 'firebase/firestore/lite';
import { PerformanceModel } from '~/types';
import { firebase } from '../firebase';

const isPerformance = objectOf({
  permalink: primitives.string,
  title: primitives.string,
  number: primitives.string,
  publishedAt: primitives.any,
  updatedAt: primitives.any,
});

const performanceConverter: FirestoreDataConverter<PerformanceModel> = {
  toFirestore(performance) {
    return performance;
  },
  fromFirestore(snapshot) {
    const data = snapshot.data();

    if (isPerformance(data)) {
      return data;
    }

    console.warn('[performance] Invalid data received.');
    console.log(data);

    return data as any;
  },
};

export const performance = collection(
  firebase.db,
  'performances'
).withConverter(performanceConverter);
