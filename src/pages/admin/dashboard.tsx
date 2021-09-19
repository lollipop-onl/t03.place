import { uploadString, ref } from 'firebase/storage';
import React from 'react';
import { firebase } from '~/utils';
import { AdminLayout } from '@admin/Layout';

const AdminDashboardPage: React.VFC = () => {
  const uploadDataFile = async () => {
    await uploadString(
      ref(firebase.storage, '/resources/data.json'),
      '{"Foo":"bar"}',
      'raw',
      { contentType: 'application/json' }
    );
  };

  return (
    <AdminLayout>
      <h1>ダッシュボード</h1>
      <button onClick={uploadDataFile}>Try upload.</button>
    </AdminLayout>
  );
};

export default AdminDashboardPage;
