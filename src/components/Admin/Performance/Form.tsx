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
        </div>
        <div>
          <label htmlFor="title">タイトル</label>
          <input type="text" id="title" {...register('title')} />
        </div>
        <div>
          <label htmlFor="number">番号</label>
          <input type="string" id="number" {...register('number')} />
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};
