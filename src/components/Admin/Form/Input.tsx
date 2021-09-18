import React, { useMemo } from 'react';
import { ControllerFieldState } from 'react-hook-form';

export type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  fieldLabel: string;
  fieldState: ControllerFieldState<any, any>;
}

export const AdminFormInput: React.VFC<Props> = ({ fieldLabel, fieldState, id, ...props }) => {
  const errorMessage = useMemo((): string | undefined => {
    const type = fieldState.error?.type;

    switch (type) {
      case 'required':
        return `${fieldLabel}は必須項目です。`;
    }
  }, [fieldState.error, fieldLabel])

  return (
    <div>
      <label htmlFor={id || props.name}>{fieldLabel}</label>
      <input id={id || props.name} {...props} />
      {errorMessage && <p className="text-sm text-red-800">{errorMessage}</p>}
    </div>
  )
}
