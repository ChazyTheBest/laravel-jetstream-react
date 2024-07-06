import { useRef } from 'react';
import { useForm } from '@inertiajs/react';
import ActionMessage from '@/Components/ActionMessage';
import FormSection from '@/Components/FormSection';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

const UpdatePasswordForm = () => {
  const passwordInput = useRef(null);
  const currentPasswordInput = useRef(null);

  const form = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
  });

  const updatePassword = (e) => {
    e.preventDefault();
    form.put(route('user-password.update'), {
      errorBag: 'updatePassword',
      preserveScroll: true,
      onSuccess: () => form.reset(),
      onError: () => {
        if (form.errors.password) {
          form.reset('password', 'password_confirmation');
          passwordInput.current.focus();
        }

        if (form.errors.current_password) {
          form.reset('current_password');
          currentPasswordInput.current.focus();
        }
      },
    });
  };

  return <FormSection
    title="Update Password"
    description="Ensure your account is using a long, random password to stay secure."
    form={<>
      <div className="col-span-6 sm:col-span-4">
        <InputLabel for="current_password" value="Current Password"/>
        <TextInput
          id="current_password"
          ref={currentPasswordInput}
          value={form.data.current_password}
          onChange={e => form.setData('current_password', e.target.value)}
          type="password"
          className="mt-1 block w-full"
          autoComplete="current-password"
        />
        <InputError message={form.errors.current_password} className="mt-2"/>
      </div>

      <div className="col-span-6 sm:col-span-4">
        <InputLabel for="password" value="New Password"/>
        <TextInput
          id="password"
          ref={passwordInput}
          value={form.data.password}
          onChange={e => form.setData('password', e.target.value)}
          type="password"
          className="mt-1 block w-full"
          autoComplete="new-password"
        />
        <InputError message={form.errors.password} className="mt-2"/>
      </div>

      <div className="col-span-6 sm:col-span-4">
        <InputLabel for="password_confirmation" value="Confirm Password"/>
        <TextInput
          id="password_confirmation"
          value={form.data.password_confirmation}
          onChange={e => form.setData('password_confirmation', e.target.value)}
          type="password"
          className="mt-1 block w-full"
          autoComplete="new-password"
        />
        <InputError message={form.errors.password_confirmation} className="mt-2"/>
      </div>
    </>}
    actions={<>
      <ActionMessage on={form.recentlySuccessful} className="me-3">
        Saved.
      </ActionMessage>

      <PrimaryButton disabled={form.processing}>
        Save
      </PrimaryButton>
    </>}
    onSubmit={updatePassword}
  />;
};

export default UpdatePasswordForm;
