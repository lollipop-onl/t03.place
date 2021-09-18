import { getDocs, query, where, limit, updateDoc, doc, serverTimestamp } from 'firebase/firestore/lite'
import { castArray } from 'lodash-es';
import { useRouter} from 'next/router'
import React, { useMemo } from 'react';
import useSWR from 'swr';
import { AdminConteForm, ConteFormValues } from '~/components/Admin/Conte/Form';
import { collections } from '~/utils';
import { AdminLayout } from '@admin/Layout';

const AdminConteList: React.VFC = () => {
  const router = useRouter()
  const permalink = useMemo(() => {
    const { permalink } = router.query;

    return castArray(permalink)[0];
  }, [router.query]);
  const { data } = useSWR(`db/conte/detail/${permalink}`, async () => {
    const { docs } = await getDocs(query(collections.conte, where('permalink', '==', permalink), limit(1)));

    return docs[0];
  });

  const onSubmit = (values: ConteFormValues) => {
    if (!data) {
      return;
    }

    updateDoc(doc(collections.conte, data.id), { ...values, updatedAt: serverTimestamp() });
  }

  return (
    <AdminLayout>
      <h1>コント詳細</h1>
      {data && (
        <AdminConteForm
          defaultValues={data.data()}
          onSubmit={onSubmit}
        />
      )}
    </AdminLayout>
  );
};

export default AdminConteList;
