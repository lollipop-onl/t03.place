import clsx from 'clsx';
import { get } from 'lodash-es';
import { useMemo } from 'react';
import { Path, Control, RegisterOptions, useController } from 'react-hook-form';
import { AdminFormField } from '@admin/Form/Field';

export type Props<T> = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {
  label: string;
  name: Path<T>;
  control: Control<T>;
  rules?: RegisterOptions<T, Path<T>>;
  note?: string;
};

export const AdminFormTextarea = <T extends Record<string, any>>({
  label,
  name,
  control,
  rules,
  note,
  ...props
}: Props<T>) => {
  const { fieldState, field } = useController({ name, control, rules });

  return (
    <AdminFormField
      label={label}
      id={props.id || name}
      fieldState={fieldState}
      note={note}
      render={({ id, aria, invalid }) => (
        <div
          className={clsx('rounded border-2', {
            border: !invalid,
            'border-red-700': invalid,
          })}
        >
          <textarea
            id={id}
            className="px-2 w-full h-32 border-0"
            {...field}
            {...props}
            {...aria}
          />
        </div>
      )}
    />
  );
};
