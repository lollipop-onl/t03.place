import { getDocs } from 'firebase/firestore/lite';
import Link from 'next/link';
import React from 'react';
import useSWR from 'swr';
import { AdminUiHeading } from '~/components/Admin/Ui/Heading';
import { collections } from '~/utils';
import { AdminLayout } from '@admin/Layout';
import { AdminUiCard } from '~/components/Admin/Ui/Card';
import { AdminUiButton } from '~/components/Admin/Ui/Button';

const AdminConteList: React.VFC = () => {
  const fetcher = async () => {
    const { docs } = await getDocs(collections.conte);

    return docs;
  };
  const { data, error } = useSWR('db/conte/list', fetcher);

  return (
    <AdminLayout>
      <AdminUiHeading
        title="コント一覧"
        description="T03 PLACE に登録されているコントの一覧です"
        breadcrumbs={[{ title: 'ダッシュボード', href: '/admin/dashboard' }]}
      />
      <AdminUiCard>
        <AdminUiButton href="/admin/conte/new" style="primary">コントを登録</AdminUiButton>
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
      </AdminUiCard>
    </AdminLayout>
  );
};

export default AdminConteList;
