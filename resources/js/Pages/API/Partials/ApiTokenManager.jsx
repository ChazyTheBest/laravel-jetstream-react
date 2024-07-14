import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import ActionSection from '@/Components/ActionSection';
import Checkbox from '@/Components/Checkbox';
import ConfirmationModal from '@/Components/ConfirmationModal';
import DangerButton from '@/Components/DangerButton';
import DialogModal from '@/Components/DialogModal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

const ApiTokenManager = ({ tokens, availablePermissions }) => {
  const [managingPermissionsFor, setManagingPermissionsFor] = useState(null);
  const [apiTokenBeingDeleted, setApiTokenBeingDeleted] = useState(null);

  const updateApiTokenForm = useForm({
    permissions: [],
  });

  const deleteApiTokenForm = useForm({});

  const handleOnChangeUpdateCheckbox = permission => isChecked => {
    const permissions = updateApiTokenForm.data.permissions;
    updateApiTokenForm.setData('permissions', isChecked
      ? [...permissions, permission]
      : permissions.filter(p => p !== permission)
    );
  }

  const manageApiTokenPermissions = token => () => {
    updateApiTokenForm.setData('permissions', token.abilities);
    setManagingPermissionsFor(token);
  };
  const closeApiTokenPermissions = () => setManagingPermissionsFor(null);

  const updateApiToken = e => {
    e.preventDefault();
    updateApiTokenForm.put(route('api-tokens.update', managingPermissionsFor), {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => setManagingPermissionsFor(null),
    });
  };

  const confirmApiTokenDeletion = token => () => setApiTokenBeingDeleted(token);
  const closeApiTokenDeletion = () => setApiTokenBeingDeleted(null);

  const deleteApiToken = e => {
    e.preventDefault();
    deleteApiTokenForm.delete(route('api-tokens.destroy', apiTokenBeingDeleted), {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => setApiTokenBeingDeleted(null),
    });
  };

  return <>
    {/* Manage API Tokens */}
    <ActionSection
      className="mt-10 sm:mt-0"
      title="Manage API Tokens"
      description="You may delete any of your existing tokens if they are no longer needed."
    >
      {/* API Token List */}
      <div className="space-y-6">
        {tokens.map(token =>
          <div className="flex items-center justify-between" key={token.id}>
            <div className="break-all dark:text-white">
              {token.name}
            </div>
            <div className="flex items-center ms-2">
              {token.last_used_ago &&
                <div className="text-sm text-gray-400">
                  Last used {token.last_used_ago}
                </div>
              }
              {availablePermissions.length > 0 &&
                <button
                  className="cursor-pointer ms-6 text-sm text-gray-400 underline"
                  onClick={manageApiTokenPermissions(token)}
                >
                  Permissions
                </button>
              }
              <button
                className="cursor-pointer ms-6 text-sm text-red-500"
                onClick={confirmApiTokenDeletion(token)}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </ActionSection>

    {/* API Token Permissions Modal */}
    <DialogModal
      show={managingPermissionsFor !== null}
      onClose={closeApiTokenPermissions}
      slots={{
        title: 'API Token Permissions',
        content: <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availablePermissions.map(permission =>
              <label className="flex items-center" key={permission}>
                <Checkbox
                  checked={updateApiTokenForm.data.permissions.includes(permission)}
                  onChange={handleOnChangeUpdateCheckbox(permission)}
                />
                <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">{permission}</span>
              </label>
            )}
          </div>
        </>,
        footer: <>
          <SecondaryButton onClick={closeApiTokenPermissions}>
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
      onClose={closeApiTokenDeletion}
      slots={{
        title: 'Delete API Token',
        content: 'Are you sure you would like to delete this API token?',
        footer: <>
          <SecondaryButton onClick={closeApiTokenDeletion}>
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
