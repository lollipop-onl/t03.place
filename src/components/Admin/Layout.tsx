import { ViewGridIcon, ViewListIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import { noop } from 'lodash-es';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import logoImg from '~/assets/admin/images/logo.svg';
import { useAdminUser } from '~/hooks/useAdminUser';

const SIDEBAR_MENU = [
  {
    text: 'ダッシュボード',
    href: '/admin/dashboard',
    Icon: <ViewGridIcon className="h-6" />,
  },
  {
    text: 'コント',
    href: '/admin/conte/list',
    Icon: <ViewListIcon className="h-6" />,
  },
  {
    text: '公演',
    href: '/admin/performance/list',
    Icon: <ViewListIcon className="h-6" />,
  },
  {
    text: 'メディア',
    href: '/admin/media/list',
    Icon: <ViewListIcon className="h-6" />,
  },
];

export const AdminLayout: React.FC = ({ children }) => {
  const router = useRouter();
  const { adminUser } = useAdminUser();

  useEffect(() => {
    if (adminUser == null) {
      router.push('/admin/sign-in').catch(noop);
    }
  }, [adminUser, router]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="flex flex-shrink-0 justify-between items-center px-4 h-16 bg-gray-700">
        <img alt="LOLLIPOP LAUNCHER" {...logoImg} />
        <button className="flex justify-center items-center w-16 h-16 bg-black bg-opacity-0 hover:bg-opacity-10 transition">
          <img
            src="https://placehold.jp/32x32.png"
            width={32}
            height={32}
            alt="LOLLIPOP LAUNCHER"
            className="rounded-full"
          />
        </button>
      </header>
      <div className="flex flex-col md:flex-row flex-grow">
        <aside className="flex-shrink-0 md:w-60 min-h-full bg-white">
          <ul className="py-2 md:py-8 px-2 space-y-1 md:space-y-2">
            {SIDEBAR_MENU.map(({ text, href, Icon }, index) => (
              <li key={index}>
                <Link href={href}>
                  <a
                    className={clsx(
                      'flex items-center py-3 px-4 space-x-2 text-sm text-gray-700 rounded-md transition-colors',
                      {
                        'bg-indigo-500 text-white': router.pathname === href,
                        'hover:bg-gray-200': router.pathname !== href,
                      }
                    )}
                  >
                    <span className="w-9 h-6 text-sm">{Icon}</span>
                    {text}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
        <main className="flex flex-col flex-grow pt-4 mx-auto w-full max-w-screen-lg">
          <div className="flex-grow px-4">{children}</div>
          <footer className="flex-shrink-0 p-4 mt-4">
            <p className="text-sm text-center text-black text-opacity-30">
              &copy; 2021 lollipop.onl All Rights Reserved.
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
};
