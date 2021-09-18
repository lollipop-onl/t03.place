import Link from 'next/link';
import {  useRouter}from 'next/router'
import { castArray, clamp } from 'lodash-es'
import React, { useMemo } from 'react';
import useSWR from 'swr'
import { AdminLayout } from '@admin/Layout';

const AdminConteList: React.VFC = () => {
  const router = useRouter();
  const page = useMemo(() => {
    const { p } = router.query;
    const page = Number.parseInt(castArray(p)[0], 10);

    if (Number.isNaN(page)) {
      return 1;
    }

    return clamp(page, 0, Infinity);
  }, [router.query]);
  const {} = useSWR(`db/contes/${page}`, async () => {

  });

  return (
    <AdminLayout>
      <h1>コント一覧</h1>
      <Link href="/admin/conte/new">
        <a>コントを登録</a>
      </Link>
    </AdminLayout>
  );
};

export default AdminConteList;
