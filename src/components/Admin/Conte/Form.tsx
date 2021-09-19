import { getDocs } from '@firebase/firestore/lite';
import { noop } from 'lodash-es';
import React from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import { collections } from '~/utils';
import { ConteModel } from '~/types';

export type ConteFormValues = Omit<ConteModel, 'publishedAt' | 'updatedAt'>;

export type Props = {
  defaultValues?: ConteFormValues;
  onSubmit?(values: ConteFormValues): void;
};

export const AdminConteForm: React.VFC<Props> = ({
  defaultValues,
  onSubmit = noop,
}) => {
  const fetcher = async () => {
    const { docs } = await getDocs(collections.performance);

    return docs;
  };
  const { data } = useSWR('db/performance/list', fetcher);

  const { register, handleSubmit } = useForm<ConteFormValues>({
    defaultValues,
  });

  if (!data) {
    return <p>loading...</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <div>
          <label htmlFor="permalink">パーマリンク</label>
          <input type="text" id="permalink" {...register('permalink')} />
        </div>
        <div>
          <label htmlFor="title">タイトル</label>
          <input type="text" id="title" {...register('title')} />
        </div>
        <div>
          <label htmlFor="summary">概要</label>
          <textarea id="summary" {...register('summary')} />
        </div>
        <div>
          <label htmlFor="conteLength">時間(秒)</label>
          <input type="text" id="conteLength" {...register('conteLength')} />
        </div>
        <div>
          <label htmlFor="youtubeVideoIds">YouTubeビデオID</label>
          <textarea id="youtubeVideoIds" {...register('youtubeVideoIds')} />
          <p className="text-xs text-gray-600">カンマ区切りで入力</p>
        </div>
        <div>
          <label htmlFor="tags">タグ</label>
          <textarea id="tags" {...register('tags')} />
          <p className="text-xs text-gray-600">カンマ区切りで入力</p>
        </div>
        <div>
          <label htmlFor="sensitiveTags">ネタバレタグ</label>
          <textarea id="sensitiveTags" {...register('sensitiveTags')} />
          <p className="text-xs text-gray-600">カンマ区切りで入力</p>
        </div>
        <div>
          <label htmlFor="iizuka">キャラ設定：飯塚</label>
          <input type="text" id="iizuka" {...register('iizuka')} />
          <p className="text-xs text-gray-600">カンマ区切りで入力</p>
        </div>
        <div>
          <label htmlFor="kakuta">キャラ設定：角田</label>
          <input type="text" id="kakuta" {...register('kakuta')} />
          <p className="text-xs text-gray-600">カンマ区切りで入力</p>
        </div>
        <div>
          <label htmlFor="toyomoto">キャラ設定：豊本</label>
          <input type="text" id="toyomoto" {...register('toyomoto')} />
          <p className="text-xs text-gray-600">カンマ区切りで入力</p>
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};
