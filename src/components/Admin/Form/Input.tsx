import clsx from 'clsx';
import { get } from 'lodash-es';
import { useMemo } from 'react';
import {
  Path,
  RegisterOptions,
  useController,
  Control,
} from 'react-hook-form';
import { AdminFormField } from '@admin/Form/Field';

export type Props<T> = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label: string;
  name: Path<T>;
  control: Control<T>;
  rules?: RegisterOptions<T, Path<T>>;
};

export const AdminFormInput = <T extends Record<string, any>>({
  label,
  name,
  control,
  rules,
  ...props
}: Props<T>) => {
  const { fieldState, field } = useController({ name, control, rules });

  return (
    <AdminFormField
      label={label}
      id={props.id || name}
      fieldState={fieldState}
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
            {...field}
            {...props}
            {...aria}
          />
        </div>
      )}
    />
  );
};
