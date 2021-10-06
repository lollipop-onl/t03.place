/** MicroCMS のベーススキーマ */
export type MicroCMSApiBaseSchema<T> = {
  createdAt: string;
  id: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
} & T;

/** MicroCMS の配列レスポンス */
export type MicroCMSApiArrayResponse<T> = {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
} & T;

/** MicroCMS のカスタムフィールドのベーススキーマ */
export type MicroCMSCustomFieldBaseSchema<FieldId extends string, T> = {
  fieldId: FieldId;
} & T;

/** MicroCMS の画像スキーマ */
export type MicroCMSImageSchema = {
  url: string;
  width: number;
  height: number;
};
