import { useRouter } from 'next/router'
import React from 'react'
import { useMount } from 'react-use'
import { useAdminUser } from '~/hooks/useAdminUser';

const AdminSignOut: React.VFC = () => {
  const router = useRouter();
  const { signOut } = useAdminUser();

  useMount(async () => {
    await signOut();

    await router.replace('/admin/sign-in');
  })

  return (
    <div>
      <p>loading...</p>
    </div>
  )
}

export default AdminSignOut;
