import { noop } from 'lodash-es';
import React from 'react';
import { useForm } from 'react-hook-form';
import { MediaModel } from '~/types';

export type MediaFormValues = Omit<MediaModel, 'publishedAt' | 'updatedAt'>;

export type Props = {
  defaultValues?: MediaFormValues;
  onSubmit?(values: MediaFormValues): void;
};

export const AdminMediaForm: React.VFC<Props> = ({
  defaultValues,
  onSubmit = noop,
}) => {
  const { register, handleSubmit } = useForm<MediaFormValues>({
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <div>
          <label htmlFor="permalink">パーマリンク</label>
          <input type="text" id="permalink" {...register('permalink')} />
          <p className="text-xs text-gray-600">半角英数字とハイフン・アンダーバーのみ使用可</p>
        </div>
        <div>
          <label htmlFor="title">タイトル</label>
          <input type="text" id="title" {...register('title')} />
        </div>
        <div>
          <label htmlFor="performancePermalink">公演（パーマリンク）</label>
          <input type="string" id="performancePermalink" {...register('performancePermalink')} />
        </div>
        <div>
          <label htmlFor="chapters">チャプター</label>
          <input type="string" id="chapters" {...register('chapters')} />
        </div>
        <div>
          <label htmlFor="chapters">発売日</label>
          <input type="string" id="chapters" {...register('chapters')} />
          <p className="text-xs text-gray-600">YYYY-MM-DD</p>
        </div>
        <div>
          <label htmlFor="blurayPrice">Blu-rayの金額</label>
          <input type="string" id="blurayPrice" {...register('blurayPrice')} />
          <p className="text-xs text-gray-600">税抜価格</p>
        </div>
        <div>
          <label htmlFor="dvdPrice">DVDの金額</label>
          <input type="string" id="dvdPrice" {...register('dvdPrice')} />
          <p className="text-xs text-gray-600">税抜価格</p>
        </div>
        <div>
          <label htmlFor="teaserVideoId">ティザー映像のビデオID</label>
          <input type="string" id="teaserVideoId" {...register('teaserVideoId')} />
        </div>
        <div>
          <label htmlFor="sonyMusicShopUrl">SonyMusicShopの商品URL</label>
          <input type="string" id="sonyMusicShopUrl" {...register('sonyMusicShopUrl')} />
        </div>
        <div>
          <label htmlFor="amazonUrl">Amazonの商品URL</label>
          <input type="string" id="amazonUrl" {...register('amazonUrl')} />
        </div>
        <div>
          <label htmlFor="hmvUrl">HMVの商品URL</label>
          <input type="string" id="hmvUrl" {...register('hmvUrl')} />
        </div>
        <div>
          <label htmlFor="towerRecordsUrl">TowerRecordsの商品URL</label>
          <input type="string" id="towerRecordsUrl" {...register('towerRecordsUrl')} />
        </div>
        <div>
          <label htmlFor="tsutayaOnlineUrl">TSUTAYA ONLINEの商品URL</label>
          <input type="string" id="tsutayaOnlineUrl" {...register('tsutayaOnlineUrl')} />
        </div>
        <div>
          <label htmlFor="rakutenUrl">楽天の商品URL</label>
          <input type="string" id="rakutenUrl" {...register('rakutenUrl')} />
        </div>
        <div>
          <label htmlFor="primeVideoUrl">AmazonPrimeVideoの商品URL</label>
          <input type="string" id="primeVideoUrl" {...register('primeVideoUrl')} />
        </div>
        <div>
          <label htmlFor="videoMarketUrl">VideoMarketの商品URL</label>
          <input type="string" id="videoMarketUrl" {...register('videoMarketUrl')} />
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};
