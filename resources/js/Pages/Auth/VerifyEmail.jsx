import { useMemo } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticationCard from '@/Components/AuthenticationCard';
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo';
import PrimaryButton from '@/Components/PrimaryButton';

const VerifyEmail = ({ status }) => {
  const {
    post,
    processing
  } = useForm({});

  const submit = e => {
    e.preventDefault();
    post(route('verification.send'));
  };

  const verificationLinkSent = useMemo(() => status === 'verification-link-sent', [status]);

  return <>
    <Head title="Email Verification" />

    <AuthenticationCard logo={<AuthenticationCardLogo />}>
      <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Before continuing, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another.
      </div>

      {verificationLinkSent && (
        <div className="mb-4 font-medium text-sm text-green-600 dark:text-green-400">
          A new verification link has been sent to the email address you provided in your profile settings.
        </div>
      )}

      <form onSubmit={submit}>
        <div className="mt-4 flex items-center justify-between">
          <PrimaryButton disabled={processing}>
            Resend Verification Email
          </PrimaryButton>

          <Link
            href={route('profile.show')}
            className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
          >
            Edit Profile
          </Link>

          <Link
            href={route('logout')}
            method="post"
            as="button"
            className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 ms-2"
          >
            Log Out
          </Link>
        </div>
      </form>
    </AuthenticationCard>
  </>;
};

export default VerifyEmail;
