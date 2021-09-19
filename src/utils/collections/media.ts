import { objectOf, primitives } from '@altostra/type-validations'
import { collection, FirestoreDataConverter } from 'firebase/firestore/lite'
import { MediaModel } from '~/types'
import { firebase } from '../firebase'

const isMedia = objectOf({
  permalink: primitives.string,
  title: primitives.string,
  publishedAt: primitives.any,
  updatedAt: primitives.any,
})

const mediaConverter: FirestoreDataConverter<MediaModel> = {
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
  }
}

export const media = collection(firebase.db, 'medias').withConverter(mediaConverter);
