import { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import ActionMessage from '@/Components/ActionMessage';
import Checkbox from '@/Components/Checkbox';
import DialogModal from '@/Components/DialogModal';
import FormSection from '@/Components/FormSection';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';

const CreateApiTokenForm = ({ defaultPermissions, availablePermissions }) => {
  const [displayingToken, setDisplayingToken] = useState(false);

  const { jetstream } = usePage().props;

  const createApiTokenForm = useForm({
    name: '',
    permissions: defaultPermissions,
  });

  const handleOnChange = e => createApiTokenForm.setData(e.target.id, e.target.value);
  const handleOnChangeCheckbox = permission => isChecked => {
    const permissions = createApiTokenForm.data.permissions;
    createApiTokenForm.setData('permissions', isChecked
      ? [...permissions, permission]
      : permissions.filter(p => p !== permission)
    );
  }

  const closeModal = () => setDisplayingToken(false);

  const createApiToken = e => {
    e.preventDefault();
    createApiTokenForm.post(route('api-tokens.store'), {
      preserveScroll: true,
      onSuccess: () => {
        setDisplayingToken(true);
        createApiTokenForm.reset();
      },
    });
  };

  return <>
    {/* Generate API Token */}
    <FormSection
      title="Create API Token"
      description="API tokens allow third-party services to authenticate with our application on your behalf."
      form=<>
        {/* Token Name */}
        <div className="col-span-6 sm:col-span-4">
          <InputLabel htmlFor="name" value="Name" />
          <TextInput
            id="name"
            type="text"
            className="mt-1 block w-full"
            value={createApiTokenForm.data.name}
            onChange={handleOnChange}
            autoFocus
          />
          <InputError message={createApiTokenForm.errors.name} className="mt-2" />
        </div>

        {/* Token Permissions */}
        {availablePermissions.length > 0 &&
          <div className="col-span-6">
            <InputLabel htmlFor="permissions" value="Permissions" />

            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {availablePermissions.map(permission => (
                <label className="flex items-center" key={permission}>
                  <Checkbox
                    checked={createApiTokenForm.data.permissions.includes(permission)}
                    onChange={handleOnChangeCheckbox(permission)}
                  />
                  <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">{permission}</span>
                </label>
              ))}
            </div>
          </div>
        }
      </>
      actions=<>
        <ActionMessage on={createApiTokenForm.recentlySuccessful} className="me-3">
          Created.
        </ActionMessage>

        <PrimaryButton disabled={createApiTokenForm.processing}>
          Create
        </PrimaryButton>
      </>
      onSubmit={createApiToken}
    />

    {/* Token Value Modal */}
    <DialogModal
      show={displayingToken}
      closeable={false}
      onClose={closeModal}
      slots={{
        title: 'API Token',
        content: <>
          <div>Please copy your new API token. For your security, it won't be shown again.</div>
          {jetstream.flash?.token &&
            <div className="mt-4 bg-gray-100 dark:bg-gray-900 px-4 py-2 rounded font-mono text-sm text-gray-500 break-all">
              {jetstream.flash.token}
            </div>
          }
        </>,
        footer: <SecondaryButton onClick={closeModal}>Close</SecondaryButton>
      }}
    />
  </>;
};

export default CreateApiTokenForm;
