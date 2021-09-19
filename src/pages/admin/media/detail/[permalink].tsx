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
import useSWR from 'swr';
import { collections } from '~/utils';
import { AdminLayout } from '@admin/Layout';
import { AdminMediaForm, MediaFormValues } from '@admin/Media/Form';

const AdminMediaList: React.VFC = () => {
  const router = useRouter();
  const permalink = useMemo(() => {
    const { permalink } = router.query;

    return castArray(permalink)[0];
  }, [router.query]);
  const { data } = useSWR(`db/media/detail/${permalink}`, async () => {
    const { docs } = await getDocs(
      query(collections.media, where('permalink', '==', permalink), limit(1))
    );

    return docs[0];
  });

  const onSubmit = async (values: MediaFormValues) => {
    if (!data) {
      return;
    }

    await updateDoc(doc(collections.media, data.id), {
      ...values,
      updatedAt: serverTimestamp(),
    });

    if (values.permalink !== permalink) {
      await router.replace(`/admin/media/detail/${values.permalink}`);
    }
  };

  return (
    <AdminLayout>
      {data && (
        <div>
          <h1>{data.data().title}</h1>
          <AdminMediaForm defaultValues={data.data()} onSubmit={onSubmit} />
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminMediaList;
