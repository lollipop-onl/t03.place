import clsx from 'clsx';
import { get } from 'lodash-es';
import { useMemo } from 'react';
import {
  FormState,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';
import { AdminFormField } from '@admin/Form/Field';

export type Props<T> = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  formState: FormState<T>;
  rules?: RegisterOptions<T, Path<T>>;
};

export const AdminFormInput = <T extends Record<string, any>>({
  label,
  name,
  register,
  formState,
  rules,
  ...props
}: Props<T>) => {
  const error = useMemo(
    () => get(formState.errors, name),
    [formState.errors, name]
  );

  return (
    <AdminFormField
      label={label}
      id={props.id || name}
      error={error}
      render={({ id, aria, invalid }) => (
        <div
          className={clsx('rounded border-2', {
            'border': !invalid,
            'border-red-700': invalid,
          })}
        >
          <input
            id={id}
            className="px-2 w-full h-10 border-0"
            {...register(name, rules)}
            {...props}
            {...aria}
          />
        </div>
      )}
    />
  );
};
