import { noop } from "lodash-es";
import React from "react"
import { useForm, Controller } from 'react-hook-form';
import { AdminFormInput } from '@admin/Form/Input'

export type ConteFormValues = {
  permalink: string;
  title: string;
}

export type Props = {
  defaultValues?: ConteFormValues,
  onSubmit?(values: ConteFormValues): void,
}

export const AdminConteForm: React.VFC<Props> = ({ defaultValues, onSubmit = noop }) => {
  const { control, handleSubmit } = useForm<ConteFormValues>({ defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="permalink"
        control={control}
        rules={{ required: true }}
        render={({ field, fieldState }) => (
          <AdminFormInput fieldLabel="パーマリンク" fieldState={fieldState} {...field} />
        )}
      />
      <button type="submit">Submit</button>
    </form>
  )
}
