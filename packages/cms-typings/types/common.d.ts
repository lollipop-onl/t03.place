/** MicroCMS のベーススキーマ */
export type MicroCMSApiBaseSchema<T> = {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
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
}
