import { objectOf, primitives } from '@altostra/type-validations';
import { PerformanceModel } from '~/types';
import { getCollection } from './utils';

const isPerformance = objectOf({
  permalink: primitives.string,
  title: primitives.string,
  number: primitives.string,
  publishedAt: primitives.any,
  updatedAt: primitives.any,
});

export const performance = getCollection<PerformanceModel>('performances', {
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
});
