import { noop } from "lodash-es";
import React from "react"
import { useForm } from 'react-hook-form';

export type ConteFormValues = {
  permalink: string;
  title: string;
}

export type Props = {
  defaultValues?: ConteFormValues,
  onSubmit?(values: ConteFormValues): void,
}

export const AdminConteForm: React.VFC<Props> = ({ defaultValues, onSubmit = noop }) => {
  const { register, handleSubmit } = useForm<ConteFormValues>({ defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
      <div>
        <label htmlFor="permalink">パーマリンク</label>
        <input type="text" id="permalink" {...register('permalink')} />
      </div>
      <div>
        <label htmlFor="title">タイトル</label>
        <input type="text" id="title" {...register('title')} />
      </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}
