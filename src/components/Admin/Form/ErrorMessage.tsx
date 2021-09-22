import React, { useMemo } from 'react';
import { FieldError } from 'react-hook-form';

export type Props = {
  id?: string;
  error: FieldError | undefined;
};

export const AdminFormErrorMessage: React.VFC<Props> = ({ id, error }) => {
  const errorMessage = useMemo((): string | null => {
    switch (error?.type) {
      case undefined:
        return null;
      case 'required':
        return '必須項目が入力されていません';
        case 'isPermalink':
          return 'パーマリンクに半角スペースとスラッシュは使用できません';
        case 'isUniquePermalink':
          return 'そのパーマリンクはすでに登録されています';
      default:
        return 'バリデーションエラーです';
    }
  }, [error]);

  return errorMessage ? (
    <p id={id} className="text-xs text-red-700" role="alert">
      {errorMessage}
    </p>
  ) : null;
};
