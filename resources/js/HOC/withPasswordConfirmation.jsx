import { useState, useRef } from 'react';
import DialogModal from '@/Components/DialogModal';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';

const withPasswordConfirmation = (
  WrappedComponent,
  onConfirmed,
  title = 'Confirm Password',
  content = 'For your security, please confirm your password to continue.',
  button = 'Confirm'
) => ({ children, ...props }) => {
  const [ confirmingPassword, setConfirmingPassword ] = useState(false);
  const [ form, setForm ] = useState({ password: '', error: '', processing: false });
  const passwordInputRef = useRef(null);

  const startConfirmingPassword = () => {
    axios.get(route('password.confirmation')).then(response => {
      if (response.data.confirmed) {
        onConfirmed();
      } else {
        setConfirmingPassword(true);
        setTimeout(() => passwordInputRef.current.focus(), 250);
      }
    });
  };

  const closeModal = () => {
    setConfirmingPassword(false);
    setForm({ password: '', error: '' });
  };

  const handleOnChange = e => setForm({ ...form, password: e.target.value });
  const handleOnKeyUp = e => e.key === 'Enter' && confirmPassword();

  const confirmPassword = () => {
    setForm({ ...form, processing: true });

    axios.post(route('password.confirm'), {
      password: form.password,
    }).then(() => {
      setForm({ ...form, processing: false });
      closeModal();
      onConfirmed();
    }).catch(error => {
      setForm({ ...form, processing: false, error: error.response.data.errors.password[0] });
      passwordInputRef.current.focus();
    });
  };

  return <>
    <WrappedComponent {...props} onClick={startConfirmingPassword}>
      {children}
    </WrappedComponent>

    <DialogModal
      show={confirmingPassword}
      onClose={closeModal}
      slots={{
        title: title,
        content: <>
          {content}

          <div className="mt-4">
            <TextInput
              ref={passwordInputRef}
              value={form.password}
              onChange={handleOnChange}
              type="password"
              className="mt-1 block w-3/4"
              placeholder="Password"
              autoComplete="current-password"
              onKeyUp={handleOnKeyUp}
            />

            <InputError message={form.error} className="mt-2" />
          </div>
        </>,
        footer: <>
          <SecondaryButton onClick={closeModal}>
            Cancel
          </SecondaryButton>

          <PrimaryButton
            className="ms-3"
            disabled={form.processing}
            onClick={confirmPassword}
          >
            {button}
          </PrimaryButton>
        </>,
      }}
    />
  </>;
};

export default withPasswordConfirmation;
