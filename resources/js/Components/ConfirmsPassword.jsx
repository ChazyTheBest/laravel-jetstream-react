import { useState, useRef } from 'react';
import DialogModal from './DialogModal';
import InputError from './InputError';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';
import TextInput from './TextInput';

const ConfirmsPassword = ({
  title = 'Confirm Password',
  content = 'For your security, please confirm your password to continue.',
  button = 'Confirm',
  onConfirmed,
  children
}) => {
  const [confirmingPassword, setConfirmingPassword] = useState(false);
  const [form, setForm] = useState({ password: '', error: '', processing: false });
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

  const closeModal = () => {
    setConfirmingPassword(false);
    setForm({ password: '', error: '' });
  };

  return <span>
    <span onClick={startConfirmingPassword}>
      {children}
    </span>

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
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              type="password"
              className="mt-1 block w-3/4"
              placeholder="Password"
              autoComplete="current-password"
              onKeyUp={(e) => e.key === 'Enter' && confirmPassword()}
            />

            <InputError message={form.error} className="mt-2" />
          </div>
        </>,
        footer: <>
          <SecondaryButton onClick={closeModal}>
            Cancel
          </SecondaryButton>

          <PrimaryButton
            className={`ms-3${form.processing ? ' opacity-25' : ''}`}
            disabled={form.processing}
            onClick={confirmPassword}
          >
            {button}
          </PrimaryButton>
        </>,
      }}
    />
  </span>;
};

export default ConfirmsPassword;
