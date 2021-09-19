import { addDoc, serverTimestamp } from 'firebase/firestore/lite';
import { useRouter } from 'next/router';
import React from 'react';
import { collections } from '~/utils';
import { MediaModel } from '~/types';
import { AdminLayout } from '@admin/Layout';
import { AdminMediaForm, MediaFormValues } from '@admin/Media/Form';

const AdminMediaList: React.VFC = () => {
  const router = useRouter();

  const onSubmit = async (values: MediaFormValues): Promise<void> => {
    console.log(values);

    await addDoc<MediaModel>(collections.media, {
      ...values,
      publishedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    await router.push(`/admin/media/detail/${values.permalink}`);
  };

  return (
    <AdminLayout>
      <h1>メディア追加</h1>
      <AdminMediaForm onSubmit={onSubmit} />
    </AdminLayout>
  );
};

export default AdminMediaList;
