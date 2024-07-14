import { Head, useForm } from '@inertiajs/react';
import AuthenticationCard from '@/Components/AuthenticationCard';
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

const ForgotPassword = ({ status }) => {
  const {
    data,
    setData,
    post,
    processing,
    errors
  } = useForm({
    email: '',
  });

  const handleOnChange = e => setData('email', e.target.value);

  const submit = e => {
    e.preventDefault();
    post(route('password.email'));
  };

  return <>
    <Head title="Forgot Password" />

    <AuthenticationCard logo={<AuthenticationCardLogo />}>
      <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Forgot your password? No problem. Just let us know your email address and we will email you a password reset
        link that will allow you to choose a new one.
      </div>

      {status && <div className="mb-4 font-medium text-sm text-green-600 dark:text-green-400">{status}</div>}

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

        <div className="flex items-center justify-end mt-4">
          <PrimaryButton disabled={processing}>
            Email Password Reset Link
          </PrimaryButton>
        </div>
      </form>
    </AuthenticationCard>
  </>;
};

export default ForgotPassword;
