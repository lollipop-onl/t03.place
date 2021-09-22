import { Timestamp } from 'firebase/firestore/lite';

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
  youtubeVideoIds: string;
  /** タグ */
  tags: string;
  /** ネタバレタグ */
  sensitiveTags: string;
  /** キャラクター設定タグ */
  characterTags: {
    /** 飯塚 */
    iizuka: string;
    /** 角田 */
    kakuta: string;
    /** 豊本 */
    toyomoto: string;
  };
  /** 作成日時 */
  publishedAt: Timestamp;
  /** 更新日時 */
  updatedAt: Timestamp;
};
