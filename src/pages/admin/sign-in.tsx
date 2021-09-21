import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ENV, LOCAL_ADMIN_EMAIL, LOCAL_ADMIN_PASSWORD } from '~/const';
import { useAdminUser } from '~/hooks/useAdminUser';
import { AdminFormInput } from '@admin/Form/Input';

type FormValues = {
  email: string;
  secure: {
    password: string;
  };
};

const AdminSignIn: React.VFC = () => {
  const router = useRouter();
  const { handleSubmit, register, formState, watch } = useForm<FormValues>({
    defaultValues: ENV.firebase.EMULATORS
      ? { email: LOCAL_ADMIN_EMAIL, secure: { password: LOCAL_ADMIN_PASSWORD } }
      : { email: '', secure: { password: '' } },
  });
  const { signIn } = useAdminUser();

  const onSubmit = async ({ email, secure: { password } }: FormValues) => {
    console.log(email, password);

    await signIn(email, password);

    await router.replace('/admin/dashboard');
  };

  return (
    <div className="mx-auto max-w-screen-sm">
      <div className="px-4">
        <h1>Sign-in</h1>
        <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
          <AdminFormInput
            label="メールアドレス"
            name="email"
            register={register}
            formState={formState}
            rules={{ required: true }}
          />
          <AdminFormInput
            label="パスワード"
            name="secure.password"
            type="password"
            register={register}
            formState={formState}
            rules={{ required: true }}
          />
          <button type="submit">サインイン</button>
        </form>
      </div>
    </div>
  );
};

export default AdminSignIn;
