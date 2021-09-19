import { noop } from 'lodash-es';
import React from 'react';
import { useForm } from 'react-hook-form';
import { PerformanceModel } from '~/types';

export type PerformanceFormValues = Omit<PerformanceModel, 'publishedAt' | 'updatedAt'>;

export type Props = {
  defaultValues?: PerformanceFormValues;
  onSubmit?(values: PerformanceFormValues): void;
};

export const AdminPerformanceForm: React.VFC<Props> = ({
  defaultValues,
  onSubmit = noop,
}) => {
  const { register, handleSubmit } = useForm<PerformanceFormValues>({
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
          <label htmlFor="number">番号</label>
          <input type="text" id="number" {...register('number')} />
        </div>
        <div>
          <label htmlFor="programs">演目</label>
          <textarea id="programs" {...register('programs')} />
          <p className="text-xs text-gray-600">
            music: [タイトル] ...楽曲
            <br />
            movie: [タイトル] ...幕間映像
            <br />
            conte: [パーマリンク / タイトル] ...コント
            <br />
            special: [パーマリンク / タイトル] ...特別講演・特典映像
          </p>
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};
