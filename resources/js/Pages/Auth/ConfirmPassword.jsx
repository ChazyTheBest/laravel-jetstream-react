import { useRef } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticationCard from '@/Components/AuthenticationCard';
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

const ConfirmPassword = () => {
  const passwordInput = useRef();

  const {
    data,
    setData,
    post,
    processing,
    errors,
    reset
  } = useForm({
    password: '',
  });

  const handleOnChange = e => setData('password', e.target.value);

  const submit = e => {
    e.preventDefault();
    post(route('password.confirm'), {
      onFinish: () => {
        reset();
        passwordInput.current.focus();
      },
    });
  };

  return <>
    <Head title="Secure Area" />

    <AuthenticationCard logo={<AuthenticationCardLogo />}>
      <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        This is a secure area of the application. Please confirm your password before continuing.
      </div>

      <form onSubmit={submit}>
        <InputLabel htmlFor="password" value="Password" />
        <TextInput
          id="password"
          ref={passwordInput}
          value={data.password}
          onChange={handleOnChange}
          type="password"
          className="mt-1 block w-full"
          required
          autoComplete="current-password"
          autoFocus
        />
        <InputError className="mt-2" message={errors.password} />

        <div className="flex justify-end mt-4">
          <PrimaryButton className="ms-4" disabled={processing}>
            Confirm
          </PrimaryButton>
        </div>
      </form>
    </AuthenticationCard>
  </>;
};

export default ConfirmPassword;
