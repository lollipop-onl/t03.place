import { Timestamp } from 'firebase/firestore/lite'

export type PerformanceModel = {
  /** パーマリンク */
  permalink: string;
  /** 公演タイトル */
  title: string;
  /** 公演番号 */
  number?: string;
  /** 演目 */
  programs: string[];
  /** 作成日時 */
  publishedAt: Timestamp;
  /** 更新日時 */
  updatedAt: Timestamp;
}
