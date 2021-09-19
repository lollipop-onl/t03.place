import { addDoc, serverTimestamp } from 'firebase/firestore/lite';
import { useRouter } from 'next/router';
import React from 'react';
import { collections } from '~/utils';
import { PerformanceModel } from '~/types';
import { AdminLayout } from '@admin/Layout';
import {
  AdminPerformanceForm,
  PerformanceFormValues,
} from '@admin/Performance/Form';

const AdminPerformanceList: React.VFC = () => {
  const router = useRouter();

  const onSubmit = async (values: PerformanceFormValues): Promise<void> => {
    console.log(values);

    await addDoc<PerformanceModel>(collections.performance, {
      ...values,
      publishedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    await router.push(`/admin/performance/detail/${values.permalink}`);
  };

  return (
    <AdminLayout>
      <h1>公演追加</h1>
      <AdminPerformanceForm onSubmit={onSubmit} />
    </AdminLayout>
  );
};

export default AdminPerformanceList;
