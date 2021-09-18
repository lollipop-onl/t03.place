import { Timestamp } from 'firebase/firestore/lite'

export type PerformanceModel = {
  permalink: string;
  title: string;
  number: string;
  publishedAt: Timestamp;
  updatedAt: Timestamp;
}
