import { getDocs } from 'firebase/firestore/lite';
import Link from 'next/link';
import React from 'react';
import useSWR from 'swr';
import { collections } from '~/utils';
import { AdminLayout } from '@admin/Layout';
import { AdminContentHeading } from '~/components/Admin/Content/Heading';

const AdminConteList: React.VFC = () => {
  const fetcher = async () => {
    const { docs } = await getDocs(collections.conte);

    return docs;
  };
  const { data, error } = useSWR('db/conte/list', fetcher);

  return (
    <AdminLayout>
      <AdminContentHeading
        title="コント一覧"
        description="T03 PLACE に登録されているコントの一覧です"
        breadcrumbs={[{ title: 'ダッシュボード', href: '/admin/dashboard' }]}
      />
      <Link href="/admin/conte/new">
        <a>コントを登録</a>
      </Link>
      {data ? (
        <ul>
          {data.map((doc) => {
            const { permalink, title } = doc.data();

            return (
              <li key={doc.id}>
                <Link href={`/admin/conte/detail/${permalink}`}>
                  <a>{title}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>loading...</p>
      )}
    </AdminLayout>
  );
};

export default AdminConteList;
