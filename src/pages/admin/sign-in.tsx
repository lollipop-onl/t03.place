import { useRouter } from 'next/router';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useAdminUser } from '~/hooks/useAdminUser'

type FormValues = {
  email: string;
  password: string;
}

const AdminSignIn: React.VFC = () => {
  const router = useRouter()
  const { register, handleSubmit } = useForm<FormValues>({ defaultValues: { email: '', password: '' }});
  const { signIn } = useAdminUser();

  const onSubmit = async ({ email, password }: FormValues) => {
    await signIn(email, password);

    await router.replace('/admin/dashboard');
  }

  return (
    <div>
      <h1>Sign-in</h1>
      <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" {...register('email', { required: true })} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" {...register('password', { required: true })} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default AdminSignIn;
