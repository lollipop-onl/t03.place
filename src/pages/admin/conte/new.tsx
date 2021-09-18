import { addDoc, serverTimestamp } from 'firebase/firestore/lite'
import React from 'react';
import { collections } from '~/utils'
import { ConteModel } from '~/types';
import { AdminConteForm, ConteFormValues } from '@admin/Conte/Form';
import { AdminLayout } from '@admin/Layout';

const AdminConteList: React.VFC = () => {
  const onSubmit = async (values: ConteFormValues): Promise<void> => {
    await addDoc<ConteModel>(collections.conte, {
      ...values,
      publishedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }

  return (
    <AdminLayout>
      <h1>コント追加</h1>
      <AdminConteForm onSubmit={onSubmit} />
    </AdminLayout>
  );
};

export default AdminConteList;
