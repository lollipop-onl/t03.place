import { MicroCMSApiBaseSchema } from './common';

export type MicroCMSApiMusicSchema = MicroCMSApiBaseSchema<{
  type: '挿入歌' | 'オープニング' | 'エンディング';
  title: string;
  lyrics?: string;
  composition?: string;
  arrangement?: string;
}>;
