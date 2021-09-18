import React, { useMemo } from 'react';
import { useRouter} from 'next/router'
import { AdminLayout } from '@admin/Layout';
import { castArray } from 'lodash-es';

const AdminConteList: React.VFC = () => {
  const router = useRouter()
  const conteId = useMemo(() => {
    const { conteId } = router.query;

    return castArray(conteId)[0];
  }, [router.query]);

  return (
    <AdminLayout>
      <h1>コント詳細 / {conteId}</h1>
    </AdminLayout>
  );
};

export default AdminConteList;
