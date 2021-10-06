import { MicroCMSApiBaseSchema, MicroCMSCustomFieldBaseSchema } from './common';
import { MicroCMSApiMusicSchema } from './music';
import { MicroCMSApiWorksSchema } from './works';

export type MicroCMSCustomFieldWorkSchema = MicroCMSCustomFieldBaseSchema<
  'work',
  {
    work: MicroCMSApiWorksSchema;
  }
>;

export type MicroCMSCustomFieldMusicSchema = MicroCMSCustomFieldBaseSchema<
  'music',
  {
    music: MicroCMSApiMusicSchema;
  }
>;

export type MicroCMSApiPerformanceSchema = MicroCMSApiBaseSchema<{
  type: '単独公演' | 'ユニットライブ' | '特別公演' | 'その他';
  slug: string;
  title: string;
  programs: Array<
    MicroCMSCustomFieldWorkSchema | MicroCMSCustomFieldMusicSchema
  >;
}>;
