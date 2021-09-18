import React from "react"
import Link from "next/link";
import { AdminLayout } from "~/components/Admin/AdminLayout";
import { firebase } from '~/utils'

const AdminConteList: React.VFC = () => {
  return (
    <AdminLayout>
      <h1>コント一覧</h1>
      <Link href="/admin/conte/new">
        <a>コントを登録</a>
      </Link>
    </AdminLayout>
  )
}

export default AdminConteList;
