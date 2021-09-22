import Link from 'next/link';
import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/solid'

export type Props = {
  title: string;
  description: string;
  breadcrumbs?: Array<{ href: string; title: string }>;
};

export const AdminContentHeading: React.VFC<Props> = ({
  title,
  description,
  breadcrumbs = [],
}) => {
  return (
    <div className="mb-8">
      {breadcrumbs.length > 0 && (
        <ol className="flex flex-wrap">
          {breadcrumbs.map(({ href, title }, index) => (
            <li key={index} className="flex items-center text-gray-500">
              <Link href={href}>
                <a className="text-xs hover:underline">{title}</a>
              </Link>
              <ChevronRightIcon className="mx-1 h-4" />
            </li>
          ))}
        </ol>
      )}
      <h2 className="text-xl text-gray-700 mt-1">{title}</h2>
      {description && <p className="mt-2 text-sm text-gray-500">{description}</p>}
    </div>
  );
};
