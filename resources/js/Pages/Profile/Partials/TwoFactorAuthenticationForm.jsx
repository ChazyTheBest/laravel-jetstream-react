import { useEffect, useMemo, useState } from 'react';
import { router, useForm } from '@inertiajs/react';
import ActionSection from '@/Components/ActionSection';
import ConfirmsPassword from '@/Components/ConfirmsPassword';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';

const TwoFactorAuthenticationForm = ({requiresConfirmation, user}) => {
  const [ enabling, setEnabling ] = useState(false);
  const [ confirming, setConfirming ] = useState(false);
  const [ disabling, setDisabling ] = useState(false);
  const [ qrCode, setQrCode ] = useState(null);
  const [ setupKey, setSetupKey ] = useState(null);
  const [ recoveryCodes, setRecoveryCodes ] = useState([]);

  const confirmationForm = useForm({ code: '' });

  const twoFactorEnabled = useMemo(
    () => !enabling && user.two_factor_enabled,
    [enabling, user]
  );

  useEffect((twoFactorEnabled) => {
    if (!twoFactorEnabled) {
      confirmationForm.reset();
      confirmationForm.clearErrors();
    }
  }, []);

  const enableTwoFactorAuthentication = () => {
    setEnabling(true);

    router.post(route('two-factor.enable'), {}, {
      preserveScroll: true,
      onSuccess: () => Promise.all([
        showQrCode(),
        showSetupKey(),
        showRecoveryCodes()
      ]),
      onFinish: () => {
        setEnabling(false);
        setConfirming(requiresConfirmation);
      },
    });
  };

  const showQrCode = () => {
    return axios.get(route('two-factor.qr-code')).then(response => {
      setQrCode(response.data.svg);
    });
  };

  const showSetupKey = () => {
    return axios.get(route('two-factor.secret-key')).then(response => {
      setSetupKey(response.data.secretKey);
    });
  }

  const showRecoveryCodes = () => {
    return axios.get(route('two-factor.recovery-codes')).then(response => {
      setRecoveryCodes(response.data);
    });
  };

  const confirmTwoFactorAuthentication = () => {
    confirmationForm.post(route('two-factor.confirm'), {
      errorBag: "confirmTwoFactorAuthentication",
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => {
        setConfirming(false);
        setQrCode(null);
        setSetupKey(null);
      },
    });
  };

  const regenerateRecoveryCodes = () => {
    axios
      .post(route('two-factor.recovery-codes'))
      .then(() => showRecoveryCodes());
  };

  const disableTwoFactorAuthentication = () => {
    setDisabling(true);

    router.delete(route('two-factor.disable'), {
      preserveScroll: true,
      onSuccess: () => {
        setDisabling(false);
        setConfirming(false);
      },
    });
  };

  return <ActionSection
    title="Two Factor Authentication"
    description="Add additional security to your account using two factor authentication."
  >
    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
      {twoFactorEnabled && !confirming
        ? 'You have enabled two factor authentication.' : (twoFactorEnabled && confirming
        ? 'Finish enabling two factor authentication.'
        : 'You have not enabled two factor authentication.')
      }
    </h3>

    <div className="mt-3 max-w-xl text-sm text-gray-600 dark:text-gray-400">
      <p>
        When two factor authentication is enabled, you will be prompted for a secure, random token during
        authentication. You may retrieve this token from your phone's Google Authenticator application.
      </p>
    </div>

    {twoFactorEnabled &&
      <>
        {qrCode && setupKey &&
          <>
            <div className="mt-4 max-w-xl text-sm text-gray-600 dark:text-gray-400">
              {confirming
                ?
                  <p className="font-semibold">
                    To finish enabling two factor authentication, scan the following QR code using your phone's
                    authenticator application or enter the setup key and provide the generated OTP code.
                  </p>
                :
                  <p>
                    Two factor authentication is now enabled. Scan the following QR code using your phone's authenticator
                    application or enter the setup key.
                  </p>
              }
            </div>

            <div className="mt-4 p-2 inline-block bg-white" dangerouslySetInnerHTML={{ __html: qrCode }} />

            <div className="mt-4 max-w-xl text-sm text-gray-600 dark:text-gray-400">
              <p className="font-semibold">
                Setup Key: <span>{setupKey}</span>
              </p>
            </div>

            {confirming &&
              <div className="mt-4">
                <InputLabel for="code" value="Code" />

                <TextInput
                  id="code"
                  value={confirmationForm.data.code}
                  onChange={(e) => confirmationForm.setData('code', e.target.value)}
                  type="text"
                  name="code"
                  className="block mt-1 w-1/2"
                  inputMode="numeric"
                  autoFocus
                  autoComplete="one-time-code"
                  onKeyUp={(e) => e.key === 'Enter' && confirmTwoFactorAuthentication}
                />

                <InputError message={confirmationForm.errors.code} class="mt-2" />
              </div>
            }
          </>
        }

        {recoveryCodes.length > 0 && !confirming &&
          <>
            <div className="mt-4 max-w-xl text-sm text-gray-600 dark:text-gray-400">
              <p className="font-semibold">
                Store these recovery codes in a secure password manager. They can be used to recover access to your
                account if your two factor authentication device is lost.
              </p>
            </div>

            <div className="grid gap-1 max-w-xl mt-4 px-4 py-4 font-mono text-sm bg-gray-100 dark:bg-gray-900 dark:text-gray-100 rounded-lg">
              {recoveryCodes.map((code) =>
                <div key={code}>
                  {code}
                </div>
              )}
            </div>
          </>
        }
      </>
    }

    <div className="mt-5">
      {twoFactorEnabled
        ?
          <>
            {confirming &&
              <>
                <ConfirmsPassword onConfirmed={confirmTwoFactorAuthentication}>
                  <PrimaryButton
                    type="button"
                    className="me-3"
                    disabled={enabling}
                  >
                    Confirm
                  </PrimaryButton>
                </ConfirmsPassword>

                <ConfirmsPassword onConfirmed={disableTwoFactorAuthentication}>
                  <SecondaryButton disabled={disabling}>
                    Cancel
                  </SecondaryButton>
                </ConfirmsPassword>
              </>
            }

            {!confirming &&
              <>
                {recoveryCodes.length === 0 &&
                  <ConfirmsPassword onConfirmed={showRecoveryCodes}>
                    <SecondaryButton className="me-3">
                      Show Recovery Codes
                    </SecondaryButton>
                  </ConfirmsPassword>
                }

                {recoveryCodes.length > 0 &&
                  <ConfirmsPassword onConfirmed={regenerateRecoveryCodes}>
                    <SecondaryButton className="me-3">
                      Regenerate Recovery Codes
                    </SecondaryButton>
                  </ConfirmsPassword>
                }

                <ConfirmsPassword onConfirmed={disableTwoFactorAuthentication}>
                  <DangerButton disabled={disabling}>
                    Disable
                  </DangerButton>
                </ConfirmsPassword>
              </>
            }
          </>
        :
          <ConfirmsPassword onConfirmed={enableTwoFactorAuthentication}>
            <PrimaryButton disabled={enabling}>
              Enable
            </PrimaryButton>
          </ConfirmsPassword>
      }
    </div>
  </ActionSection>;
};

export default TwoFactorAuthenticationForm;
