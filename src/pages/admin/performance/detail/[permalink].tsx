import { getDocs, query, where, limit, updateDoc, doc, serverTimestamp } from 'firebase/firestore/lite'
import { castArray } from 'lodash-es';
import { useRouter} from 'next/router'
import React, { useMemo } from 'react';
import useSWR from 'swr';
import { AdminPerformanceForm, PerformanceFormValues } from '~/components/Admin/Performance/Form';
import { collections } from '~/utils';
import { AdminLayout } from '@admin/Layout';

const AdminPerformanceList: React.VFC = () => {
  const router = useRouter()
  const permalink = useMemo(() => {
    const { permalink } = router.query;

    return castArray(permalink)[0];
  }, [router.query]);
  const { data } = useSWR(`db/performance/detail/${permalink}`, async () => {
    const { docs } = await getDocs(query(collections.performance, where('permalink', '==', permalink), limit(1)));

    return docs[0];
  });

  const onSubmit = async (values: PerformanceFormValues) => {
    if (!data) {
      return;
    }

    await updateDoc(doc(collections.performance, data.id), { ...values, updatedAt: serverTimestamp() });

    if (values.permalink !== permalink) {
      await router.replace(`/admin/performance/detail/${values.permalink}`);
    }
  }

  return (
    <AdminLayout>
      {data && (
        <div>
          <h1>{data.data().title}</h1>
          <AdminPerformanceForm
            defaultValues={data.data()}
            onSubmit={onSubmit}
          />
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminPerformanceList;
