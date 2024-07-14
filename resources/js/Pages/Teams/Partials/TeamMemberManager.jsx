import { useState } from 'react';
import { usePage, useForm, router } from '@inertiajs/react';
import ActionMessage from '@/Components/ActionMessage';
import ActionSection from '@/Components/ActionSection';
import ConfirmationModal from '@/Components/ConfirmationModal';
import DangerButton from '@/Components/DangerButton';
import DialogModal from '@/Components/DialogModal';
import FormSection from '@/Components/FormSection';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import SectionBorder from '@/Components/SectionBorder';
import TeamMemberRoles from "@/Pages/Teams/Partials/TeamMemberRoles";
import TextInput from '@/Components/TextInput';

const TeamMemberManager = ({ team, availableRoles, userPermissions }) => {
  const { auth } = usePage().props;
  const [currentlyManagingRole, setCurrentlyManagingRole] = useState(false);
  const [managingRoleFor, setManagingRoleFor] = useState(null);
  const [confirmingLeavingTeam, setConfirmingLeavingTeam] = useState(false);
  const [teamMemberBeingRemoved, setTeamMemberBeingRemoved] = useState(null);

  const addTeamMemberForm = useForm({
    email: '',
    role: null,
  });

  const updateRoleForm = useForm({
    role: null,
  });

  const leaveTeamForm = useForm({});
  const removeTeamMemberForm = useForm({});

  const handleOnChange = e => addTeamMemberForm.setData(e.target.id, e.target.value);

  const addTeamMember = e => {
    e.preventDefault();
    addTeamMemberForm.post(route('team-members.store', team), {
      errorBag: 'addTeamMember',
      preserveScroll: true,
      onSuccess: () => addTeamMemberForm.reset(),
    });
  };

  const cancelTeamInvitation = invitation => () => {
    router.delete(route('team-invitations.destroy', invitation), {
      preserveScroll: true,
    });
  };

  const manageRole = teamMember => () => {
    setManagingRoleFor(teamMember);
    updateRoleForm.setData('role', teamMember.membership.role);
    setCurrentlyManagingRole(true);
  };
  const closeManageRole = () => setCurrentlyManagingRole(false);

  const updateRole = () =>
    updateRoleForm.put(route('team-members.update', [team, managingRoleFor]), {
      preserveScroll: true,
      onSuccess: () => setCurrentlyManagingRole(false),
    });

  const confirmLeavingTeam = () => setConfirmingLeavingTeam(true);
  const closeLeavingTeam = () => setConfirmingLeavingTeam(false);

  const leaveTeam = () =>
    leaveTeamForm.delete(route('team-members.destroy', [team, auth.user]), {
      errorBag: 'leaveTeam',
      preserveScroll: true,
    });

  const confirmTeamMemberRemoval = teamMember => () => setTeamMemberBeingRemoved(teamMember);
  const closeTeamMemberRemoval = () => setTeamMemberBeingRemoved(null);

  const removeTeamMember = () =>
    removeTeamMemberForm.delete(route('team-members.destroy', [team, teamMemberBeingRemoved]), {
      errorBag: 'removeTeamMember',
      preserveScroll: true,
      onSuccess: () => setTeamMemberBeingRemoved(null),
    });

  const displayableRole = role => availableRoles.find(r => r.key === role).name;

  return <>
    {/* Add Team Member */}
    {userPermissions.canAddTeamMembers &&
      <>
        <SectionBorder />

        <FormSection
          title="Add Team Member"
          description="Add a new team member to your team, allowing them to collaborate with you."
          form=<>
            <div className="col-span-6">
              <div className="max-w-xl text-sm text-gray-600 dark:text-gray-400">
                Please provide the email address of the person you would like to add to this team.
              </div>
            </div>

            {/* Member Email */}
            <div className="col-span-6 sm:col-span-4">
              <InputLabel htmlFor="email" value="Email" />
              <TextInput
                id="email"
                value={addTeamMemberForm.data.email}
                onChange={handleOnChange}
                type="email"
                className="block w-full mt-1"
              />
              <InputError message={addTeamMemberForm.errors.email} className="mt-2" />
            </div>

            {/* Role */}
            {availableRoles.length > 0 &&
              <div className="col-span-6 lg:col-span-4">
                <InputLabel htmlFor="roles" value="Role" />
                <InputError message={addTeamMemberForm.errors.role} className="mt-2" />
                <TeamMemberRoles
                  availableRoles={availableRoles}
                  setData={addTeamMemberForm.setData}
                  role={addTeamMemberForm.data.role}
                />
              </div>
            }
          </>
          actions=<>
            <ActionMessage on={addTeamMemberForm.recentlySuccessful} className="me-3">
              Added.
            </ActionMessage>

            <PrimaryButton disabled={addTeamMemberForm.processing}>
              Add
            </PrimaryButton>
          </>
          onSubmit={addTeamMember}
        />

        {/* Team Member Invitations */}
        {team.team_invitations.length > 0 &&
          <>
            <SectionBorder />

            <ActionSection
              className="mt-10 sm:mt-0"
              title="Pending Team Invitations"
              description="These people have been invited to your team and have been sent an invitation email. They may join the team by accepting the email invitation."
            >
              {/* Pending Team Member Invitation List */}
              <div className="space-y-6">
                {team.team_invitations.map(invitation =>
                  <div className="flex items-center justify-between" key={invitation.id}>
                    <div className="text-gray-600 dark:text-gray-400">{invitation.email}</div>

                    {/* Cancel Team Invitation */}
                    {userPermissions.canRemoveTeamMembers &&
                      <div className="flex items-center">
                        <button
                          className="text-sm text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-700 focus:outline-none"
                          onClick={cancelTeamInvitation(invitation)}
                        >
                          Cancel
                        </button>
                      </div>
                    }
                  </div>
                )}
              </div>
            </ActionSection>
          </>
        }
      </>
    }

    {team.users.length > 0 &&
      <>
        <SectionBorder />

        {/* Manage Team Members */}
        <ActionSection
          className="mt-10 sm:mt-0"
          title="Team Members"
          description="All of the people that are part of this team."
        >
          {/* Team Member List */}
          <div className="space-y-6">
            {team.users.map(user =>
              <div className="flex items-center justify-between" key={user.id}>
                <div className="flex items-center">
                  <img className="w-8 h-8 rounded-full object-cover" src={user.profile_photo_url} alt={user.name}/>
                  <div className="ms-4 dark:text-white">
                    {user.name}
                  </div>
                </div>

                <div className="flex items-center">
                  {/* Manage Team Member Role */}
                  {userPermissions.canUpdateTeamMembers && availableRoles.length > 0 ?
                    <button
                      className="ms-2 text-sm text-gray-400 underline"
                      onClick={manageRole(user)}
                    >
                      {displayableRole(user.membership.role)}
                    </button>
                    : (availableRoles.length > 0 ?
                      <div className="ms-2 text-sm text-gray-400">
                        {displayableRole(user.membership.role)}
                      </div>
                      : '')
                  }

                  {/* Leave Team / Remove Team Member */}
                  {auth.user.id === user.id ?
                    <button
                      className="cursor-pointer ms-6 text-sm text-red-500"
                      onClick={confirmLeavingTeam}
                    >
                      Leave
                    </button>
                    : (userPermissions.canRemoveTeamMembers ?
                      <button
                        className="cursor-pointer ms-6 text-sm text-red-500"
                        onClick={confirmTeamMemberRemoval(user)}
                      >
                        Remove
                      </button>
                      : '')
                  }
                </div>
              </div>
            )}
          </div>
        </ActionSection>

        {/* Role Management Modal */}
        <DialogModal
          show={currentlyManagingRole}
          onClose={closeManageRole}
          slots={{
            title: 'Manage Role',
            content: managingRoleFor &&
              <TeamMemberRoles
                availableRoles={availableRoles}
                setData={updateRoleForm.setData}
                role={updateRoleForm.data.role}
              />,
            footer: <>
              <SecondaryButton onClick={closeManageRole}>
                Cancel
              </SecondaryButton>

              <PrimaryButton
                className="ms-3"
                disabled={updateRoleForm.processing}
                onClick={updateRole}
              >
                Save
              </PrimaryButton>
            </>
          }}
        />

        {/* Leave Team Confirmation Modal */}
        <ConfirmationModal
          show={confirmingLeavingTeam}
          onClose={closeLeavingTeam}
          slots={{
            title: 'Leave Team',
            content: 'Are you sure you would like to leave this team?',
            footer: <>
              <SecondaryButton onClick={closeLeavingTeam}>
                Cancel
              </SecondaryButton>

              <DangerButton
                className="ms-3"
                disabled={leaveTeamForm.processing}
                onClick={leaveTeam}
              >
                Leave
              </DangerButton>
            </>
          }}
        />

        {/* Remove Team Member Confirmation Modal */}
        <ConfirmationModal
          show={teamMemberBeingRemoved !== null}
          onClose={closeTeamMemberRemoval}
          slots={{
            title: 'Remove Team Member',
            content: 'Are you sure you would like to remove this person from the team?',
            footer: <>
              <SecondaryButton onClick={closeTeamMemberRemoval}>
                Cancel
              </SecondaryButton>

              <DangerButton
                className="ms-3"
                disabled={removeTeamMemberForm.processing}
                onClick={removeTeamMember}
              >
                Remove
              </DangerButton>
            </>
          }}
        />
      </>
    }
  </>;
};

export default TeamMemberManager;
