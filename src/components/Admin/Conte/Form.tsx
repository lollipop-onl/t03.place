import { getDocs, query, where, limit } from '@firebase/firestore/lite';
import { noop } from 'lodash-es';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { collections, isPermalink } from '~/utils';
import { ConteModel } from '~/types';
import { AdminFormInput } from '@admin/Form/Input';
import { yupResolver } from '@hookform/resolvers/yup'
import { AdminFormTextarea } from '@admin/Form/Textarea';
import { AdminUiButton } from '@admin/Ui/Button';

export type ConteFormValues = Omit<ConteModel, 'publishedAt' | 'updatedAt'>;

export type Props = {
  defaultValues?: ConteFormValues;
  loading?: boolean;
  onSubmit?(values: ConteFormValues): void;
};

type Values = {
  permalink: string;
  title?: string;
  conteLength: number;
}

export const AdminConteForm: React.VFC<Props> = ({
  defaultValues,
  loading = false,
  onSubmit = noop,
}) => {
  const schema: yup.SchemaOf<ConteFormValues> = yup.object().shape({
    permalink: yup.string().required().label('パーマリンク'),
    title: yup.string().required().label('タイトル'),
    summary: yup.string().label('概要'),
    conteLength: yup.number().positive().integer().label('コント時間（秒）'),
  }).required();

  const { control, handleSubmit } = useForm<ConteFormValues>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <AdminFormInput
          label="パーマリンク"
          name="permalink"
          control={control}
          rules={{
            required: true,
            validate: {
              isPermalink,
              isUniquePermalink: async (permalink) => {
                if (typeof permalink !== 'string') {
                  return false;
                }

                if (permalink === defaultValues?.permalink) {
                  return true;
                }

                const { docs } = await getDocs(
                  query(
                    collections.conte,
                    where('permalink', '==', permalink),
                    limit(1)
                  )
                );

                console.log(docs);

                return docs.length === 0;
              },
            },
          }}
        />
        <AdminFormInput
          label="タイトル"
          name="title"
          control={control}
          rules={{ required: true }}
        />
        <AdminFormTextarea
          label="概要"
          name="summary"
          control={control}
          rules={{ }}
        />
        <AdminFormInput
          label="時間（秒）"
          name="conteLength"
          control={control}
          rules={{ }}
        />
        <AdminFormTextarea
          label="YouTubeビデオID"
          name="youtubeVideoIds"
          control={control}
          rules={{ }}
          note="カンマ区切りで入力"
        />
        <AdminFormTextarea
          label="タグ"
          name="tags"
          control={control}
          rules={{ }}
          note="カンマ区切りで入力"
        />
        <AdminFormTextarea
          label="ネタバレタグ"
          name="sensitiveTags"
          control={control}
          rules={{ }}
          note="カンマ区切りで入力"
        />
        <AdminFormInput
          label="キャラ設定：飯塚"
          name="characterTags.iizuka"
          control={control}
          rules={{ }}
        />
        <AdminFormInput
          label="キャラ設定：角田"
          name="characterTags.kakuta"
          control={control}
          rules={{ }}
        />
        <AdminFormInput
          label="キャラ設定：豊本"
          name="characterTags.toyomoto"
          control={control}
          rules={{ }}
        />
      </div>
      <div className="flex mt-4 space-x-4">
        <AdminUiButton type="submit" style="primary" loading={loading}>
          保存する
        </AdminUiButton>
        <AdminUiButton href="/admin/conte/list" style="cancel">
          一覧に戻る
        </AdminUiButton>
      </div>
    </form>
  );
};
