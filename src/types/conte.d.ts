import { Timestamp } from 'firebase/firestore/lite'

export type ConteModel = {
  permalink: string;
  title: string;
  summary: string;
  performances: string[];
  publishedAt: Timestamp;
  updatedAt: Timestamp;
}
