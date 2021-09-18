import { Timestamp } from 'firebase/firestore/lite'

export type ConteModel = {
  permalink: string;
  title: string;
  performances: string[];
  publishedAt: Timestamp;
  updatedAt: Timestamp;
}
