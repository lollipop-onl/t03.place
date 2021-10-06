import { MicroCMSApiBaseSchema, MicroCMSCustomFieldBaseSchema } from './common';
import { MicroCMSApiMusicSchema } from './music';

export type MicroCMSCustomFieldTagSchema = MicroCMSCustomFieldBaseSchema<
  'tag',
  {
    name: string;
    sensitive: boolean;
  }
>;

export type MicroCMSCustomFieldYouTubeVideoSchema =
  MicroCMSCustomFieldBaseSchema<
    'youtubeVideo',
    {
      videoId: string;
    }
  >;

export type MicroCMSApiWorksSchema = MicroCMSApiBaseSchema<{
  type: Array<'ネタ' | '映像'>;
  permalink: string;
  title: string;
  summary?: string;
  length?: number;
  music: MicroCMSApiMusicSchema[];
  youtubeVideos: MicroCMSCustomFieldYouTubeVideoSchema[];
  tags: MicroCMSCustomFieldTagSchema[];
  iizukaTags: MicroCMSCustomFieldTagSchema[];
  kakutaTags: MicroCMSCustomFieldTagSchema[];
  toyomotoTags: MicroCMSCustomFieldTagSchema[];
}>;
