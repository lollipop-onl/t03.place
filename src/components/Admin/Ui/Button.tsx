import clsx from 'clsx';
import Link, { LinkProps } from 'next/link';
import React, { useMemo } from 'react';
import Loader from 'react-loader-spinner';

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
  style: 'primary' | 'warning' | 'failure' | 'cancel';
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
  const theme = useMemo(() => {
    switch (style) {
      case 'primary':
        return {
          'bg-gray-700 text-white': true,
          'hover:bg-gray-500 disabled:bg-gray-300': !loading,
        };
      case 'warning':
        return {
          'bg-yellow-500 text-white': true,
          'hover:bg-yellow-600 disabled:bg-gray-300': !loading,
        };
      case 'failure':
        return {
          'bg-red-500 text-white': true,
          'hover:bg-red-600 disabled:bg-gray-300': !loading,
        };
      case 'cancel':
        return {
          'bg-white border-2 border-gray-200 text-gray-900': true,
          'hover:bg-opacity-40 disabled:border-gray-300 disabled:text-gray-300 disabled:bg-opacity-0':
            !loading,
        };
    }
  }, [style, loading]);
  const classNames = clsx(
    'block relative py-2 px-4 min-w-[120px] text-sm text-center rounded transition',
    theme,
    {
      'text-opacity-0': loading,
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
          'block absolute top-1/2 left-1/2 transition-opacity transform -translate-x-1/2 -translate-y-1/2',
          {
            'opacity-0': !loading,
            'opacity-100': loading,
          }
        )}
      >
        <Loader
          type="Oval"
          color={style === 'cancel' ? '#aaa' : '#fff'}
          height={24}
        />
      </span>
    </button>
  );
};
