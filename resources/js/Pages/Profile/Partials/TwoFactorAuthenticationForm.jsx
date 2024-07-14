import { useEffect, useMemo, useState } from 'react';
import { router, useForm } from '@inertiajs/react';
import ActionSection from '@/Components/ActionSection';
import withPasswordConfirmation from '@/HOC/withPasswordConfirmation';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';

const TwoFactorAuthenticationForm = ({requiresConfirmation, user}) => {
  const [ enabling, setEnabling ] = useState(false);
  const [ confirmationRequired, setConfirmationRequired ] = useState(false);
  const [ confirming, setConfirming ] = useState(false);
  const [ disabling, setDisabling ] = useState(false);
  const [ qrCode, setQrCode ] = useState(null);
  const [ setupKey, setSetupKey ] = useState(null);
  const [ showing, setShowing ] = useState(false);
  const [ recoveryCodes, setRecoveryCodes ] = useState([]);
  const [ regenerating, setRegenerating ] = useState(false);

  const confirmationForm = useForm({ code: '' });

  const twoFactorEnabled = useMemo(
    () => !enabling && user.two_factor_enabled,
    [enabling, user]
  );

  useEffect(() => {
    if (!twoFactorEnabled) {
      confirmationForm.reset();
      confirmationForm.clearErrors();
    }
  }, [twoFactorEnabled]);

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
        setConfirmationRequired(requiresConfirmation);
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
    setShowing(true);

    return axios.get(route('two-factor.recovery-codes')).then(response => {
      setRecoveryCodes(response.data);
      setShowing(false);
    });
  };

  const handleOnChange = e => confirmationForm.setData(e.target.id, e.target.value);
  const handleKeyUp = e => e.key === 'Enter' && confirmTwoFactorAuthentication();

  const confirmTwoFactorAuthentication = () => {
    setConfirming(true);

    confirmationForm.post(route('two-factor.confirm'), {
      errorBag: "confirmTwoFactorAuthentication",
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => {
        setConfirmationRequired(false);
        setQrCode(null);
        setSetupKey(null);
      },
      onFinish: () => setConfirming(false)
    });
  };

  const regenerateRecoveryCodes = () => {
    setRegenerating(true);

    return axios.post(route('two-factor.recovery-codes')).then(() => {
      showRecoveryCodes();
      setRegenerating(false);
    });
  };

  const disableTwoFactorAuthentication = () => {
    setDisabling(true);

    router.delete(route('two-factor.disable'), {
      preserveScroll: true,
      onSuccess: () => setConfirmationRequired(false),
      onFinish: () => setDisabling(false),
    });
  };

  const ConfirmButton = withPasswordConfirmation(PrimaryButton, confirmTwoFactorAuthentication);
  const CancelButton = withPasswordConfirmation(SecondaryButton, disableTwoFactorAuthentication);
  const ShowRecButton = withPasswordConfirmation(SecondaryButton, showRecoveryCodes);
  const RegenButton = withPasswordConfirmation(SecondaryButton, regenerateRecoveryCodes);
  const DisableButton = withPasswordConfirmation(DangerButton, disableTwoFactorAuthentication);
  const EnableButton = withPasswordConfirmation(PrimaryButton, enableTwoFactorAuthentication);

  return <ActionSection
    title="Two Factor Authentication"
    description="Add additional security to your account using two factor authentication."
  >
    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
      {twoFactorEnabled && !confirmationRequired
        ? 'You have enabled two factor authentication.' : (twoFactorEnabled && confirmationRequired
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
              {confirmationRequired ?
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

            {confirmationRequired &&
              <div className="mt-4">
                <InputLabel for="code" value="Code" />

                <TextInput
                  id="code"
                  value={confirmationForm.data.code}
                  onChange={handleOnChange}
                  type="text"
                  name="code"
                  className="block mt-1 w-1/2"
                  inputMode="numeric"
                  autoFocus
                  autoComplete="one-time-code"
                  onKeyUp={handleKeyUp}
                />

                <InputError message={confirmationForm.errors.code} className="mt-2" />
              </div>
            }
          </>
        }

        {recoveryCodes.length > 0 && !confirmationRequired &&
          <>
            <div className="mt-4 max-w-xl text-sm text-gray-600 dark:text-gray-400">
              <p className="font-semibold">
                Store these recovery codes in a secure password manager. They can be used to recover access to your
                account if your two factor authentication device is lost.
              </p>
            </div>

            <div className="grid gap-1 max-w-xl mt-4 px-4 py-4 font-mono text-sm bg-gray-100 dark:bg-gray-900 dark:text-gray-100 rounded-lg">
              {recoveryCodes.map(code =>
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
      {twoFactorEnabled ?
        <>
          {confirmationRequired ?
            <>
              <ConfirmButton
                type="button"
                className="me-3"
                disabled={confirming}
              >
                Confirm
              </ConfirmButton>

              <CancelButton disabled={disabling}>
                Cancel
              </CancelButton>
            </>
          :
            <>
              {recoveryCodes.length === 0 &&
                <ShowRecButton className="me-3" disabled={showing}>
                  Show Recovery Codes
                </ShowRecButton>
              }

              {recoveryCodes.length > 0 &&
                <RegenButton className="me-3" disabled={regenerating}>
                  Regenerate Recovery Codes
                </RegenButton>
              }

              <DisableButton disabled={disabling}>
                Disable
              </DisableButton>
            </>
          }
        </>
      :
        <EnableButton type="button" disabled={enabling}>
          Enable
        </EnableButton>
      }
    </div>
  </ActionSection>;
};

export default TwoFactorAuthenticationForm;
