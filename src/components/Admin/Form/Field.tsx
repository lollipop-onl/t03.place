import React, { useMemo } from 'react';
import { ControllerFieldState } from 'react-hook-form';
import { AdminFormErrorMessage } from '@admin/Form/ErrorMessage';

export type Props = {
  label: string;
  id: string;
  fieldState: ControllerFieldState;
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
  fieldState,
  note,
  render,
}) => {
  const errorMessageId = useMemo(() => `${id}__errorMessage`, [id]);
  const aria = useMemo(
    () => ({
      'aria-invalid': fieldState.invalid,
      'aria-describedby': fieldState.invalid ? errorMessageId : undefined,
    }),
    [fieldState, errorMessageId]
  );

  return (
    <div>
      <label className="text-sm text-gray-600" htmlFor={id}>
        {label}
      </label>
      <div className="mt-1">
        {render({ id, aria, invalid: fieldState.invalid })}
        {note && <p className="pt-1 text-xs text-gray-400">{note}</p>}
        <div className="py-1 h-5">
          {fieldState.invalid && (
            <AdminFormErrorMessage id={errorMessageId} error={fieldState.error} />
          )}
        </div>
      </div>
    </div>
  );
};
