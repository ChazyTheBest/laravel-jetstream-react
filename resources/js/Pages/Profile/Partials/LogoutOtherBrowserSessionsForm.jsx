import { useState, useRef } from 'react';
import { ComputerDesktopIcon, DevicePhoneMobileIcon } from "@heroicons/react/24/outline";
import { useForm } from '@inertiajs/react';
import ActionMessage from '@/Components/ActionMessage';
import ActionSection from '@/Components/ActionSection';
import DialogModal from '@/Components/DialogModal';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';

const LogoutOtherBrowserSessionsForm = ({ sessions }) => {
  const [confirmingLogout, setConfirmingLogout] = useState(false);
  const passwordInput = useRef(null);
  const form = useForm({ password: '' });

  const confirmLogout = () => {
    setConfirmingLogout(true);
    setTimeout(() => passwordInput.current.focus(), 250);
  };

  const closeModal = () => setConfirmingLogout(false) && form.reset();

  const handleOnChange = e => form.setData(e.target.id, e.target.value);
  const handleOnKeyUp = e => e.key === 'Enter' && logoutOtherBrowserSessions();

  const logoutOtherBrowserSessions = () => {
    form.delete(route('other-browser-sessions.destroy'), {
      preserveScroll: true,
      onSuccess: closeModal,
      onError: () => passwordInput.current.focus(),
      onFinish: form.reset,
    });
  };

  return <ActionSection
    title="Browser Sessions"
    description="Manage and log out your active sessions on other browsers and devices."
  >
    <div className="max-w-xl text-sm text-gray-600 dark:text-gray-400">
      If necessary, you may log out of all of your other browser sessions across all of your devices. Some of your recent sessions are listed below; however, this list may not be exhaustive. If you feel your account has been compromised, you should also update your password.
    </div>

    {/* Other Browser Sessions */}
    {sessions.length > 0 &&
      <div className="mt-5 space-y-6">
        {sessions.map(session =>
          <div key={session.id} className="flex items-center">
            {session.agent.is_desktop
              ? <ComputerDesktopIcon className="size-8 text-gray-500" />
              : <DevicePhoneMobileIcon className="size-8 text-gray-500" />
            }

            <div className="ms-3">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {session.agent.platform} - {session.agent.browser}
              </div>

              <div className="text-xs text-gray-500">
                {session.ip_address},
                {session.is_current_device
                  ? <span className="text-green-500 font-semibold">This device</span>
                  : <span>Last active {session.last_active}</span>
                }
              </div>
            </div>
          </div>
        )}
      </div>
    }

    <div className="flex items-center mt-5">
      <PrimaryButton onClick={confirmLogout} disabled={form.processing}>
        Log Out Other Browser Sessions
      </PrimaryButton>

      <ActionMessage on={form.recentlySuccessful} className="ms-3">
        Done.
      </ActionMessage>
    </div>

    {/* Log Out Other Devices Confirmation Modal */}
    <DialogModal
      show={confirmingLogout}
      onClose={closeModal}
      slots={{
        title: 'Log Out Other Browser Sessions',
        content: <>
          Please enter your password to confirm you would like to log out of your other browser sessions across all of
          your devices.

          <div className="mt-4">
            <TextInput
              id="password"
              ref={passwordInput}
              value={form.data.password}
              onChange={handleOnChange}
              type="password"
              className="mt-1 block w-3/4"
              placeholder="Password"
              autoComplete="current-password"
              onKeyUp={handleOnKeyUp}
            />

            <InputError message={form.errors.password} className="mt-2" />
          </div>
        </>,
        footer: <>
          <div className="mt-4 flex justify-end">
            <SecondaryButton onClick={closeModal}>
              Cancel
            </SecondaryButton>

            <PrimaryButton
              className="ms-3"
              disabled={form.processing}
              onClick={logoutOtherBrowserSessions}
            >
              Log Out Other Browser Sessions
            </PrimaryButton>
          </div>
        </>
      }}
    />
  </ActionSection>;
};

export default LogoutOtherBrowserSessionsForm;
