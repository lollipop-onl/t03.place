export type MediaModel = {
  /** パーマリンク */
  permalink: string;
  /** メディアタイトル */
  title: string;
  /** 公演ID */
  performancePermalink?: string;
  /** チャプター */
  chapeters?: string[];
  /** 発売日 */
  releaseDate: string;
  /** Blu-rayの金額 */
  blurayPrice?: number;
  /** DVDの金額 */
  dvdPrice: number;
  /** ティザームービーのビデオID */
  teaserVodeoId?: string;
  /** SonyMusicShopの商品URL */
  sonyMusicShopUrl?: string;
  /** Amazonの商品URL */
  amazonUrl?: string;
  /** HMVの商品URL */
  hmvUrl?: string;
  /** TowerRecordsの商品URL */
  towerRecordsUrl?: string;
  /** TSUTAYA ONLINEの商品URL */
  tsutayaOnlineUrl?: string;
  /** 楽天の商品URL */
  rakutenUrl?: string;
  /** AmazonPrimeVideoの商品URL */
  primeVideoUrl?: string;
  /** VideoMarketの商品URL */
  videoMarketUrl?: string;
  /** 作成日時 */
  publishedAt: Timestamp;
  /** 更新日時 */
  updatedAt: Timestamp;
};
