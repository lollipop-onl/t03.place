import { Timestamp } from 'firebase/firestore/lite'

export type ConteModel = {
  permalink: string;
  title: string;
  publishedAt: Timestamp;
  updatedAt: Timestamp;
}
