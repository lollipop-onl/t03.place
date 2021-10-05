import { MicroCMSApiBaseSchema, MicroCMSCustomFieldBaseSchema } from './common'
import { MicroCMSApiMusicSchema } from './music';

export type MicroCMSCustomFieldTagSchema = MicroCMSCustomFieldBaseSchema<{
  name: string;
  sensitive: boolean;
}>;


export type MicroCMSCustomFieldYouTubeVideoSchema = MicroCMSCustomFieldBaseSchema<{
  videoId: string;
}>;

export type MicroCMSApiWorksSchema = MicroCMSApiBaseSchema<{
  type: 'ネタ' | '映像';
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
