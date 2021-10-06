import contents from './contents.json';
import { MicroCMSApiMusicSchema, MicroCMSApiPerformanceSchema, MicroCMSApiSettingsSchema, MicroCMSApiWorksSchema } from '../cms-typings/types';

export const settings = contents.settings as MicroCMSApiSettingsSchema;
export const works = contents.works as MicroCMSApiWorksSchema[];
// @ts-expect-error
export const music = contents.music as MicroCMSApiMusicSchema[];
// @ts-expect-error
export const performances = contents.performances as MicroCMSApiPerformanceSchema[];
