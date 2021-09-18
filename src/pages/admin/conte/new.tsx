import React, { useState } from 'react';
import { AdminConteForm, ConteFormValues } from '@admin/Conte/Form';
import { AdminLayout } from '@admin/Layout';
import { collections } from '~/utils'
import { addDoc } from 'firebase/firestore/lite'

const AdminConteList: React.VFC = () => {
  const onSubmit = async (values: ConteFormValues): Promise<void> => {
    await addDoc(collections.conte, values);
  }

  return (
    <AdminLayout>
      <h1>コント追加</h1>
      <AdminConteForm onSubmit={onSubmit} />
    </AdminLayout>
  );
};

export default AdminConteList;
