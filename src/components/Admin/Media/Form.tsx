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
          <p className="text-xs text-gray-600">
            半角英数字とハイフン・アンダーバーのみ使用可
          </p>
        </div>
        <div>
          <label htmlFor="title">タイトル</label>
          <input type="text" id="title" {...register('title')} />
        </div>
        <div>
          <label htmlFor="performancePermalink">公演（パーマリンク）</label>
          <input
            type="text"
            id="performancePermalink"
            {...register('performancePermalink')}
          />
        </div>
        <div>
          <label htmlFor="chapters">チャプター</label>
          <textarea id="chapters" {...register('chapters')} />
          <p className="text-xs text-gray-600">
            music: [タイトル] ...楽曲
            <br />
            movie: [タイトル] ...幕間映像
            <br />
            conte: [パーマリンク / タイトル] ...コント
          </p>
        </div>
        <div>
          <label htmlFor="specialChapters">特典チャプター</label>
          <textarea id="specialChapters" {...register('specialChapters')} />
          <p className="text-xs text-gray-600">
            music: [タイトル] ...楽曲
            <br />
            movie: [タイトル] ...幕間映像
            <br />
            conte: [パーマリンク / タイトル] ...コント
          </p>
        </div>
        <div>
          <label htmlFor="releaseDate">発売日</label>
          <input type="text" id="releaseDate" {...register('releaseDate')} />
          <p className="text-xs text-gray-600">YYYY-MM-DD</p>
        </div>
        <div>
          <label htmlFor="blurayPrice">Blu-rayの金額</label>
          <input type="text" id="blurayPrice" {...register('blurayPrice')} />
          <p className="text-xs text-gray-600">税抜価格</p>
        </div>
        <div>
          <label htmlFor="dvdPrice">DVDの金額</label>
          <input type="text" id="dvdPrice" {...register('dvdPrice')} />
          <p className="text-xs text-gray-600">税抜価格</p>
        </div>
        <div>
          <label htmlFor="trailerVideoId">トレーラー映像のビデオID</label>
          <input
            type="text"
            id="trailerVideoId"
            {...register('trailerVideoId')}
          />
        </div>
        <div>
          <label htmlFor="sonyMusicShopUrl">SonyMusicShopの商品URL</label>
          <input
            type="text"
            id="sonyMusicShopUrl"
            {...register('sonyMusicShopUrl')}
          />
        </div>
        <div>
          <label htmlFor="amazonUrl">Amazonの商品URL</label>
          <input type="text" id="amazonUrl" {...register('amazonUrl')} />
        </div>
        <div>
          <label htmlFor="hmvUrl">HMVの商品URL</label>
          <input type="text" id="hmvUrl" {...register('hmvUrl')} />
        </div>
        <div>
          <label htmlFor="towerRecordsUrl">TowerRecordsの商品URL</label>
          <input
            type="text"
            id="towerRecordsUrl"
            {...register('towerRecordsUrl')}
          />
        </div>
        <div>
          <label htmlFor="tsutayaOnlineUrl">TSUTAYA ONLINEの商品URL</label>
          <input
            type="text"
            id="tsutayaOnlineUrl"
            {...register('tsutayaOnlineUrl')}
          />
        </div>
        <div>
          <label htmlFor="rakutenUrl">楽天の商品URL</label>
          <input type="text" id="rakutenUrl" {...register('rakutenUrl')} />
        </div>
        <div>
          <label htmlFor="primeVideoUrl">AmazonPrimeVideoの商品URL</label>
          <input
            type="text"
            id="primeVideoUrl"
            {...register('primeVideoUrl')}
          />
        </div>
        <div>
          <label htmlFor="videoMarketUrl">VideoMarketの商品URL</label>
          <input
            type="text"
            id="videoMarketUrl"
            {...register('videoMarketUrl')}
          />
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};
