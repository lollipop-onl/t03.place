import fs from 'fs/promises';
import path from 'path';
import { client } from './client';
import {
  MicroCMSApiArrayResponse,
  MicroCMSApiMusicSchema,
  MicroCMSApiPerformanceSchema,
  MicroCMSApiSettingsSchema,
  MicroCMSApiWorksSchema,
} from '../../cms-typings/types';

const exportFilePath = path.join(__dirname, '..', 'contents.json');

const fetchList = async <T>(endpoint: string): Promise<T[]> => {
  const { totalCount, limit, contents } = await client.get<
    MicroCMSApiArrayResponse<T>
  >({
    endpoint,
    queries: {
      orders: 'createdAt',
      offset: 0,
      limit: 30,
    },
  });
  // 1ページ目を取得済みなので切り捨てる
  const totalPages = Math.floor(totalCount / limit);

  const results = await Promise.all(
    Array.from({ length: totalPages })
      .fill(null)
      .map(async (_, index) => {
        return await client.get<MicroCMSApiArrayResponse<T>>({
          endpoint,
          queries: {
            orders: 'createdAt',
            offset: index + 1,
            limit,
          },
        });
      })
  );

  return [...contents, ...results.flatMap(({ contents }) => contents)];
};

(async function main() {
  const [settings, works, music, performances] = await Promise.all([
    client.get<MicroCMSApiSettingsSchema>({ endpoint: '/settings' }),
    fetchList<MicroCMSApiWorksSchema>('/works'),
    fetchList<MicroCMSApiMusicSchema>('/music'),
    fetchList<MicroCMSApiPerformanceSchema>('/performances'),
  ]);

  console.log('🎉 All MicroCMS contents are downloaded');

  await fs.writeFile(
    exportFilePath,
    JSON.stringify({ settings, works, music, performances }, null, '  '),
    'utf-8'
  );

  console.log(`📦 Export succeed to ${exportFilePath}`);
})();
