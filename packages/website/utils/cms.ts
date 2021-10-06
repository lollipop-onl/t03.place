import { createClient } from 'microcms-js-sdk';
import sqlite3 from 'sqlite3';
import { MicroCMSApiArrayResponse, MicroCMSApiMusicSchema, MicroCMSApiPerformanceSchema, MicroCMSApiSettingsSchema, MicroCMSApiWorksSchema } from '~/../cms-typings/types';

const client = createClient({
  serviceDomain: 't03-place--dev',
  apiKey: '94a57587-e729-4bff-a538-f5d97f17b140',
})

type CMSContents = {
  settings: MicroCMSApiSettingsSchema;
  works: MicroCMSApiWorksSchema[];
  music: MicroCMSApiMusicSchema[];
  performances: MicroCMSApiPerformanceSchema[];
}

let cacheData: CMSContents | undefined;
let fetcherPromise: Promise<any> | undefined;

const fetchCMSContents = async (): Promise<void> => {
  console.log('run fetcher')

  const [settings, works, music, performances] = await Promise.all([
    client.get<MicroCMSApiSettingsSchema>({ endpoint: 'settings' }),
    client.get<MicroCMSApiArrayResponse<MicroCMSApiWorksSchema>>({ endpoint: 'works' }),
    client.get<MicroCMSApiArrayResponse<MicroCMSApiMusicSchema>>({ endpoint: 'music' }),
    client.get<MicroCMSApiArrayResponse<MicroCMSApiPerformanceSchema>>({ endpoint: 'performances' }),
  ]);

  cacheData = {
    settings,
    works: works.contents,
    music: music.contents,
    performances: performances.contents,
  };
}

export const setupCMSUtil = async (): Promise<CMSContents> => {
  console.log('run cms utils')

  if (!fetcherPromise) {
    fetcherPromise = fetchCMSContents();
  }

  await fetcherPromise;

  if (!cacheData) {
    throw new Error('データを取得できませんでした');
  }

  return cacheData;
}
