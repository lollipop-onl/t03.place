import { uploadString, ref } from 'firebase/storage';
import React from 'react';
import { AdminUiHeading } from '~/components/Admin/Ui/Heading';
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
      <AdminUiHeading
        title="ダッシュボード"
        description="サービス全体の統計情報やトピックを確認します"
      />
      <button onClick={uploadDataFile}>Try upload.</button>
    </AdminLayout>
  );
};

export default AdminDashboardPage;
