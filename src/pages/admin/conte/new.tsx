import { addDoc, serverTimestamp } from 'firebase/firestore/lite';
import { useRouter } from 'next/router';
import React from 'react';
import { collections } from '~/utils';
import { ConteModel } from '~/types';
import { AdminConteForm, ConteFormValues } from '@admin/Conte/Form';
import { AdminLayout } from '@admin/Layout';

const AdminConteList: React.VFC = () => {
  const router = useRouter();

  const onSubmit = async (values: ConteFormValues): Promise<void> => {
    console.log(values);

    await addDoc<ConteModel>(collections.conte, {
      ...values,
      publishedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    await router.push(`/admin/conte/detail/${values.permalink}`);
  };

  return (
    <AdminLayout>
      <h1>コント追加</h1>
      <AdminConteForm onSubmit={onSubmit} />
    </AdminLayout>
  );
};

export default AdminConteList;
