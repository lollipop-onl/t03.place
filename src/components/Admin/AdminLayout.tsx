import React from 'react';
import Link from 'next/link';

const SIDEBAR_MENU = [
  { text: 'ダッシュボード', href: '/admin/dashboard' },
  { text: 'コント', href: '/admin/conte/list' },
  { text: '公演', href: '/admin/performance/list' },
];

export const AdminLayout: React.FC = ({ children }) => {
  return (
    <div>
      <aside className="border-b">
        <ul className="flex space-x-4 p-4">
          {SIDEBAR_MENU.map(({ text, href }, index) => (
            <li key={index}>
              <Link href={href}>
                <a>{text}</a>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      <main>{children}</main>
    </div>
  );
};
