import { getDocs } from 'firebase/firestore/lite'
import Link from 'next/link';
import React from 'react';
import useSWR from 'swr'
import { collections } from '~/utils';
import { AdminLayout } from '@admin/Layout';

const AdminPerformanceList: React.VFC = () => {
  const fetcher = async () => {
    const { docs } = await getDocs(collections.performance);

    return docs;
  }
  const { data, error } = useSWR('db/performance/list', fetcher);

  return (
    <AdminLayout>
      <h1>公演一覧</h1>
      <Link href="/admin/performance/new">
        <a>公演を登録</a>
      </Link>
      {data ? (
        <ul>
          {data.map((doc) => {
            const { permalink, title } = doc.data();

            return (
              <li key={doc.id}>
                <Link href={`/admin/performance/detail/${permalink}`}>
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

export default AdminPerformanceList;
