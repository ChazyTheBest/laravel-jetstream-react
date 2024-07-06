import { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import ActionMessage from '@/Components/ActionMessage';
import ActionSection from '@/Components/ActionSection';
import Checkbox from '@/Components/Checkbox';
import ConfirmationModal from '@/Components/ConfirmationModal';
import DangerButton from '@/Components/DangerButton';
import DialogModal from '@/Components/DialogModal';
import FormSection from '@/Components/FormSection';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import SectionBorder from '@/Components/SectionBorder';
import TextInput from '@/Components/TextInput';

const ApiTokenManager = ({ tokens, availablePermissions, defaultPermissions }) => {
  const createApiTokenForm = useForm({
    name: '',
    permissions: defaultPermissions,
  });

  const updateApiTokenForm = useForm({
    permissions: [],
  });

  const deleteApiTokenForm = useForm({});

  const [displayingToken, setDisplayingToken] = useState(false);
  const [managingPermissionsFor, setManagingPermissionsFor] = useState(null);
  const [apiTokenBeingDeleted, setApiTokenBeingDeleted] = useState(null);

  const { jetstream } = usePage().props;

  const createApiToken = (e) => {
    e.preventDefault();
    createApiTokenForm.post(route('api-tokens.store'), {
      preserveScroll: true,
      onSuccess: () => {
        setDisplayingToken(true);
        createApiTokenForm.reset();
      },
    });
  };

  const manageApiTokenPermissions = (token) => {
    updateApiTokenForm.setData('permissions', token.abilities);
    setManagingPermissionsFor(token);
  };

  const updateApiToken = (e) => {
    e.preventDefault();
    updateApiTokenForm.put(route('api-tokens.update', managingPermissionsFor), {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => setManagingPermissionsFor(null),
    });
  };

  const confirmApiTokenDeletion = (token) => setApiTokenBeingDeleted(token);

  const deleteApiToken = (e) => {
    e.preventDefault();
    deleteApiTokenForm.delete(route('api-tokens.destroy', apiTokenBeingDeleted), {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => setApiTokenBeingDeleted(null),
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
            onChange={(e) => createApiTokenForm.setData('name', e.target.value)}
            autoFocus
          />
          <InputError message={createApiTokenForm.errors.name} className="mt-2" />
        </div>

        {/* Token Permissions */}
        {availablePermissions.length > 0 && (
          <div className="col-span-6">
            <InputLabel htmlFor="permissions" value="Permissions" />

            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {availablePermissions.map((permission) => (
                <label className="flex items-center" key={permission}>
                  <Checkbox
                    checked={createApiTokenForm.data.permissions.includes(permission)}
                    onChange={(checked) => {
                      const permissions = createApiTokenForm.data.permissions;
                      createApiTokenForm.setData('permissions', checked
                        ? [...permissions, permission]
                        : permissions.filter((p) => p !== permission)
                      );
                    }}
                  />
                  <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">{permission}</span>
                </label>
              ))}
            </div>
          </div>
        )}
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

    {/* Manage API Tokens */}
    {tokens.length > 0 && <>
      <SectionBorder />

      <ActionSection
        className="mt-10 sm:mt-0"
        title="Manage API Tokens"
        description="You may delete any of your existing tokens if they are no longer needed."
      >
        {/* API Token List */}
        <div className="space-y-6">
          {tokens.map((token) => (
            <div className="flex items-center justify-between" key={token.id}>
              <div className="break-all dark:text-white">
                {token.name}
              </div>
              <div className="flex items-center ms-2">
                {token.last_used_ago && (
                  <div className="text-sm text-gray-400">
                    Last used {token.last_used_ago}
                  </div>
                )}
                {availablePermissions.length > 0 && (
                  <button
                    className="cursor-pointer ms-6 text-sm text-gray-400 underline"
                    onClick={() => manageApiTokenPermissions(token)}
                  >
                    Permissions
                  </button>
                )}
                <button
                  className="cursor-pointer ms-6 text-sm text-red-500"
                  onClick={() => confirmApiTokenDeletion(token)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </ActionSection>
    </>}

    {/* Token Value Modal */}
    <DialogModal
      show={displayingToken}
      onClose={() => setDisplayingToken(false)}
      slots={{
        title: 'API Token',
        content: <>
          <div>Please copy your new API token. For your security, it won't be shown again.</div>
          {jetstream.flash?.token && (
            <div className="mt-4 bg-gray-100 dark:bg-gray-900 px-4 py-2 rounded font-mono text-sm text-gray-500 break-all">
              {jetstream.flash.token}
            </div>
          )}
        </>,
        footer: <SecondaryButton onClick={() => setDisplayingToken(false)}>Close</SecondaryButton>
      }}
    />

    {/* API Token Permissions Modal */}
    <DialogModal
      show={managingPermissionsFor !== null}
      onClose={() => setManagingPermissionsFor(null)}
      slots={{
        title: 'API Token Permissions',
        content: <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availablePermissions.map((permission) => (
              <label className="flex items-center" key={permission}>
                <Checkbox
                  checked={updateApiTokenForm.data.permissions.includes(permission)}
                  onChange={(checked) => {
                    const permissions = updateApiTokenForm.data.permissions;
                    updateApiTokenForm.setData('permissions', checked
                      ? [...permissions, permission]
                      : permissions.filter((p) => p !== permission)
                    );
                  }}
                />
                <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">{permission}</span>
              </label>
            ))}
          </div>
        </>,
        footer: <>
          <SecondaryButton onClick={() => setManagingPermissionsFor(null)}>
            Cancel
          </SecondaryButton>

          <PrimaryButton
            className="ms-3"
            onClick={updateApiToken}
            disabled={updateApiTokenForm.processing}
          >
            Save
          </PrimaryButton>
        </>
      }}
    />

    {/* Delete Token Confirmation Modal */}
    <ConfirmationModal
      show={apiTokenBeingDeleted !== null}
      onClose={() => setApiTokenBeingDeleted(null)}
      slots={{
        title: 'Delete API Token',
        content: 'Are you sure you would like to delete this API token?',
        footer: <>
          <SecondaryButton onClick={() => setApiTokenBeingDeleted(null)}>
            Cancel
          </SecondaryButton>

          <DangerButton
            className="ms-3"
            onClick={deleteApiToken}
            disabled={deleteApiTokenForm.processing}
          >
            Delete
          </DangerButton>
        </>
      }}
    />
  </>;
};

export default ApiTokenManager;
