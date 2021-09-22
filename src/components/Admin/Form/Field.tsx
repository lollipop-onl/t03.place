import React, { useMemo } from 'react';
import { FieldError } from 'react-hook-form';
import { AdminFormErrorMessage } from '@admin/Form/ErrorMessage';

export type Props = {
  label: string;
  id: string;
  error?: FieldError;
  note?: string;
  render(params: {
    id: string;
    aria: { 'aria-invalid': boolean; 'aria-describedby'?: string };
    invalid: boolean;
  }): React.ReactElement;
};

export const AdminFormField: React.VFC<Props> = ({
  label,
  id,
  error,
  note,
  render,
}) => {
  const isInvalid = useMemo(() => !!(error && error.type), [error]);
  const errorMessageId = useMemo(() => `${id}__errorMessage`, [id]);
  const aria = useMemo(
    () => ({
      'aria-invalid': isInvalid,
      'aria-describedby': isInvalid ? errorMessageId : undefined,
    }),
    [isInvalid, errorMessageId]
  );

  console.log(error);

  return (
    <div>
      <label className="text-sm text-gray-600" htmlFor={id}>
        {label}
      </label>
      <div className="mt-1">
        {render({ id, aria, invalid: isInvalid })}
        {note && <p className="pt-1 text-xs text-gray-400">{note}</p>}
        <div className="py-1 h-5">
          {isInvalid && (
            <AdminFormErrorMessage id={errorMessageId} error={error} />
          )}
        </div>
      </div>
    </div>
  );
};
