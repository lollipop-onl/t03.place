import React, { useMemo } from 'react';
import { useRouter} from 'next/router'
import { getDocs, query, where, limit, setDoc, doc } from 'firebase/firestore/lite'
import { AdminLayout } from '@admin/Layout';
import { castArray } from 'lodash-es';
import useSWR from 'swr';
import { collections } from '~/utils';
import { AdminConteForm } from '~/components/Admin/Conte/Form';
import { ConteModel } from '~/types';

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

  const onSubmit = (values: ConteModel) => {
    if (!data) {
      return;
    }

    setDoc(doc(collections.conte, data.id), values);
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
