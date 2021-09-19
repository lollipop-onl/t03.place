import { getDocs } from 'firebase/firestore/lite'
import Link from 'next/link';
import React from 'react';
import useSWR from 'swr'
import { collections } from '~/utils';
import { AdminLayout } from '@admin/Layout';

const AdminMediaList: React.VFC = () => {
  const fetcher = async () => {
    const { docs } = await getDocs(collections.media);

    return docs;
  }
  const { data, error } = useSWR('db/media/list', fetcher);

  return (
    <AdminLayout>
      <h1>メディア一覧</h1>
      <Link href="/admin/media/new">
        <a>メディアを登録</a>
      </Link>
      {data ? (
        <ul>
          {data.map((doc) => {
            const { permalink, title } = doc.data();

            return (
              <li key={doc.id}>
                <Link href={`/admin/media/detail/${permalink}`}>
                  <a>{title}</a>
                </Link>
              </li>
            )
          })}
        </ul>
      ) : (
        <p>loading...</p>
      )}
    </AdminLayout>
  );
};

export default AdminMediaList;
