import { getDocs } from '@firebase/firestore/lite';
import { noop } from 'lodash-es';
import React from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import { ConteModel } from '~/types';
import { collections } from '~/utils';

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
    return <p>loading...</p>
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
          <label htmlFor="performances">公演</label>
          <select id="performances" multiple {...register('performances')}>
            {data.map((doc) => (
              <option key={doc.id} value={doc.id}>{doc.data().title}</option>
            ))}
          </select>
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};
