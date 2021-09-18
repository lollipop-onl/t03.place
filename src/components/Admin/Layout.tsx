import { noop } from 'lodash-es';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAdminUser } from '~/hooks/useAdminUser';

const SIDEBAR_MENU = [
  { text: 'ダッシュボード', href: '/admin/dashboard' },
  { text: 'コント', href: '/admin/conte/list' },
  { text: '公演', href: '/admin/performance/list' },
];

export const AdminLayout: React.FC = ({ children }) => {
  const router = useRouter()
  const { adminUser } = useAdminUser()

  useEffect(() => {
    if (adminUser == null) {
      router.push('/admin/sign-in').catch(noop);
    }
  }, [adminUser, router])

  return (
    <div>
      <aside className="flex justify-between items-center py-2 px-4 border-b">
        <h1>T03 PLACE</h1>
        <ul className="flex space-x-4">
          {SIDEBAR_MENU.map(({ text, href }, index) => (
            <li key={index}>
              <Link href={href}>
                <a className="text-xs text-gray-700 hover:underline">{text}</a>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      <main className="pt-4 mx-auto max-w-screen-lg">{children}</main>
    </div>
  );
};
