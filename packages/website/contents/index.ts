import {
  MicroCMSApiMusicSchema,
  MicroCMSApiPerformanceSchema,
  MicroCMSApiSettingsSchema,
  MicroCMSApiWorksSchema,
} from '@cms-typings';
import contents from '../../cms-contents/contents.json';

export const settings = contents.settings as MicroCMSApiSettingsSchema;
export const works = contents.works as MicroCMSApiWorksSchema[];
// @ts-expect-error
export const music = contents.music as MicroCMSApiMusicSchema[];
export const performances =
  // @ts-expect-error
  contents.performances as MicroCMSApiPerformanceSchema[];
