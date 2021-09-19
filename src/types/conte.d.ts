import { Timestamp } from 'firebase/firestore/lite'

export type ConteModel = {
  /** パーマリンク */
  permalink: string;
  /** コントタイトル */
  title: string;
  /** コント概要 */
  summary: string;
  /** コントの長さ */
  conteLength: number;
  /** YouTubeの動画ID */
  youtubeVideoIds: string[];
  /** タグ */
  tags: string[];
  /** ネタバレタグ */
  sensitiveTags: string[];
  /** 飯塚のキャラ設定 */
  iizuka: string[];
  /** 角田のキャラ設定 */
  kakuta: string[];
  /** 豊本のキャラ設定 */
  toyomoto: string[];
  /** 作成日時 */
  publishedAt: Timestamp;
  /** 更新日時 */
  updatedAt: Timestamp;
}
