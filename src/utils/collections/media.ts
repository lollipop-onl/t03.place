import { objectOf, primitives } from '@altostra/type-validations';
import { MediaModel } from '~/types';
import { getCollection } from './utils';

const isMedia = objectOf({
  permalink: primitives.string,
  title: primitives.string,
  publishedAt: primitives.any,
  updatedAt: primitives.any,
});

export const media = getCollection<MediaModel>('medias', {
  toFirestore(media) {
    return media;
  },
  fromFirestore(snapshot) {
    const data = snapshot.data();

    if (isMedia(data)) {
      return data;
    }

    console.warn('[media] Invalid data received.');
    console.log(data);

    return data as any;
  },
})
