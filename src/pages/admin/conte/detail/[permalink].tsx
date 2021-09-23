import {
  getDocs,
  query,
  where,
  limit,
  updateDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore/lite';
import { castArray } from 'lodash-es';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import { useAsyncFn } from 'react-use';
import useSWR from 'swr';
import { AdminUiHeading } from '~/components/Admin/Ui/Heading';
import { collections } from '~/utils';
import { AdminConteForm, ConteFormValues } from '@admin/Conte/Form';
import { AdminLayout } from '@admin/Layout';

const AdminConteList: React.VFC = () => {
  const router = useRouter();
  const permalink = useMemo(() => {
    const { permalink } = router.query;

    return castArray(permalink)[0];
  }, [router.query]);
  const { data } = useSWR(`db/conte/detail/${permalink}`, async () => {
    const { docs } = await getDocs(
      query(collections.conte, where('permalink', '==', permalink), limit(1))
    );

    return docs[0];
  });

  const [submitState, onSubmit] = useAsyncFn(
    async (values: ConteFormValues) => {
      if (!data) {
        return;
      }

      await updateDoc(doc(collections.conte, data.id), {
        ...values,
        updatedAt: serverTimestamp(),
      });

      if (values.permalink !== permalink) {
        await router.replace(`/admin/conte/detail/${values.permalink}`);
      }
    },
    [router]
  );

  return (
    <AdminLayout>
      {data && (
        <div>
          <AdminUiHeading
            title={data.data().title}
            description="コントの情報を確認・変更します"
            breadcrumbs={[
              { title: 'ダッシュボード', href: '/admin/dashboard' },
              { title: 'コント一覧', href: '/admin/conte/list' },
            ]}
          />
          <AdminConteForm
            defaultValues={data.data()}
            onSubmit={onSubmit}
            loading={submitState.loading}
          />
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminConteList;
