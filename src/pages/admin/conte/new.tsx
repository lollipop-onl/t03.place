import React, { useState } from 'react';
import { AdminConteForm, ConteFormValues } from '@admin/Conte/Form';
import { AdminLayout } from '@admin/Layout';

const AdminConteList: React.VFC = () => {
  const onSubmit = (values: ConteFormValues) => {
    console.log(values);
  }

  return (
    <AdminLayout>
      <h1>コント追加</h1>
      <AdminConteForm onSubmit={onSubmit} />
    </AdminLayout>
  );
};

export default AdminConteList;
