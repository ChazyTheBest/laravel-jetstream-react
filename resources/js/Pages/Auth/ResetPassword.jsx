import { Head, useForm } from '@inertiajs/react';
import AuthenticationCard from '@/Components/AuthenticationCard';
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

const ResetPassword = ({ token, email }) => {
  const {
    data,
    setData,
    post,
    processing,
    errors,
    reset
  } = useForm({
    token: token,
    email: email,
    password: '',
    password_confirmation: '',
  });

  const handleOnChange = e => setData(e.target.id, e.target.value);

  const submit = e => {
    e.preventDefault();
    post(route('password.update'), {
      onFinish: () => reset('password', 'password_confirmation'),
    });
  };

  return <>
    <Head title="Reset Password" />

    <AuthenticationCard logo={<AuthenticationCardLogo />}>
      <form onSubmit={submit}>
        <InputLabel htmlFor="email" value="Email" />
        <TextInput
          id="email"
          value={data.email}
          onChange={handleOnChange}
          type="email"
          className="mt-1 block w-full"
          required
          autoFocus
          autoComplete="username"
        />
        <InputError className="mt-2" message={errors.email} />

        <div className="mt-4">
          <InputLabel htmlFor="password" value="Password" />
          <TextInput
            id="password"
            value={data.password}
            onChange={handleOnChange}
            type="password"
            className="mt-1 block w-full"
            required
            autoComplete="new-password"
          />
          <InputError className="mt-2" message={errors.password} />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
          <TextInput
            id="password_confirmation"
            value={data.password_confirmation}
            onChange={handleOnChange}
            type="password"
            className="mt-1 block w-full"
            required
            autoComplete="new-password"
          />
          <InputError className="mt-2" message={errors.password_confirmation} />
        </div>

        <div className="flex items-center justify-end mt-4">
          <PrimaryButton className="ms-4" disabled={processing}>
            Reset Password
          </PrimaryButton>
        </div>
      </form>
    </AuthenticationCard>
  </>;
};

export default ResetPassword;
