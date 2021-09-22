import { addDoc, serverTimestamp } from 'firebase/firestore/lite';
import { useRouter } from 'next/router';
import React from 'react';
import { useAsyncFn } from 'react-use'
import { AdminUiHeading } from '~/components/Admin/Ui/Heading';
import { collections } from '~/utils';
import { ConteModel } from '~/types';
import { AdminConteForm, ConteFormValues } from '@admin/Conte/Form';
import { AdminLayout } from '@admin/Layout';

const AdminConteList: React.VFC = () => {
  const router = useRouter();

  const [submitState, onSubmit] = useAsyncFn(async (values: ConteFormValues): Promise<void> => {
    console.log(values);

    await addDoc<ConteModel>(collections.conte, {
      ...values,
      publishedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    await router.push(`/admin/conte/detail/${values.permalink}`);
  }, [router]);

  return (
    <AdminLayout>
      <AdminUiHeading
        title="コント登録"
        description="新しいコントを登録します"
        breadcrumbs={[
          { title: 'ダッシュボード', href: '/admin/dashboard' },
          { title: 'コント一覧', href: '/admin/conte/list' },
        ]}
      />
      <AdminConteForm loading={submitState.loading} onSubmit={onSubmit} />
    </AdminLayout>
  );
};

export default AdminConteList;
