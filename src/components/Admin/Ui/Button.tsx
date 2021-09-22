import clsx from 'clsx';
import Link, { LinkProps } from 'next/link';
import React from 'react';

export type ExtendedProps =
  | Omit<
      React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
      >,
      'style' | 'className'
    >
  | (Omit<
      React.DetailedHTMLProps<
        React.AnchorHTMLAttributes<HTMLAnchorElement>,
        HTMLAnchorElement
      >,
      'href' | 'style' | 'className'
    > &
      LinkProps);

export type Props = ExtendedProps & {
  style: 'primary' | 'secondary' | 'outlined';
  fluid?: boolean;
  loading?: boolean;
};

export const AdminUiButton: React.FC<Props> = ({
  children,
  style,
  fluid,
  loading,
  ...props
}) => {
  const classNames = clsx(
    'block relative py-2 px-6 text-center rounded transition',
    {
      'text-opacity-0': loading,
      'bg-blue-500 text-white': style === 'primary',
      'hover:bg-blue-700 disabled:bg-gray-300': style === 'primary' && !loading,
      'bg-black text-white': style === 'secondary',
      'hover:bg-opacity-60 disabled:bg-gray-300':
        style === 'secondary' && !loading,
      'bg-black bg-opacity-0 border border-gray-400 text-gray-900':
        style === 'outlined',
      'hover:bg-opacity-5 disabled:border-gray-300 disabled:text-gray-300 disabled:bg-opacity-0':
        style === 'outlined' && !loading,
      'w-full': fluid,
    }
  );

  if ('href' in props) {
    const {
      href,
      as,
      replace,
      scroll,
      shallow,
      passHref,
      prefetch,
      locale,
      ...anchorProps
    } = props;

    return (
      <Link
        {...{
          href,
          as,
          replace,
          scroll,
          shallow,
          passHref,
          prefetch,
          locale,
        }}
      >
        <a className={classNames} {...anchorProps}>
          {children}
        </a>
      </Link>
    );
  }

  const { disabled, ...buttonProps } = props;

  return (
    <button
      className={classNames}
      disabled={disabled || loading}
      {...buttonProps}
    >
      {children}
      <span
        className={clsx(
          'block absolute top-1/2 left-1/2 w-4 h-4 bg-white rounded-full transition-opacity transform -translate-x-1/2 -translate-y-1/2',
          {
            'opacity-0': !loading,
            'opacity-100': loading,
          }
        )}
      />
    </button>
  );
};
