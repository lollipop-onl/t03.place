import { uploadString, ref } from 'firebase/storage';
import React from 'react';
import { firebase } from '~/utils';
import { AdminLayout } from '@admin/Layout';
import { AdminContentHeading } from '~/components/Admin/Content/Heading';

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
      <AdminContentHeading
        title="ダッシュボード"
        description="サービス全体の統計情報やトピックを確認します"
      />
      <button onClick={uploadDataFile}>Try upload.</button>
    </AdminLayout>
  );
};

export default AdminDashboardPage;
