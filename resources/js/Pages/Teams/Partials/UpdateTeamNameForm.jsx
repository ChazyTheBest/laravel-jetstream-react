import { useForm } from '@inertiajs/react';
import ActionMessage from "@/Components/ActionMessage.jsx";
import FormSection from '@/Components/FormSection';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

const UpdateTeamNameForm = ({ team, permissions }) => {
  const {
    data,
    setData,
    put,
    processing,
    errors,
    recentlySuccessful
  } = useForm({
    name: team.name,
  });

  const updateTeamName = (e) => {
    e.preventDefault();
    put(route('teams.update', team), {
      errorBag: 'updateTeamName',
      preserveScroll: true,
    });
  };

  return <FormSection
    title="Team Name"
    description="The team's name and owner information."
    form={<>
      {/* Team Owner Information */}
      <div className="col-span-6">
        <InputLabel value="Team Owner" />

        <div className="flex items-center mt-2">
          <img
            className="w-12 h-12 rounded-full object-cover"
            src={team.owner.profile_photo_url}
            alt={team.owner.name}
          />

          <div className="ms-4 leading-tight">
            <div className="text-gray-900 dark:text-white">{team.owner.name}</div>
            <div className="text-gray-700 dark:text-gray-300 text-sm">{team.owner.email}</div>
          </div>
        </div>
      </div>

      {/* Team Name */}
      <div className="col-span-6 sm:col-span-4">
        <InputLabel htmlFor="name" value="Team Name" />

        <TextInput
          id="name"
          value={data.name}
          onChange={(e) => setData('name', e.target.value)}
          type="text"
          className="block w-full mt-1"
          disabled={!permissions.canUpdateTeam}
        />

        <InputError message={errors.name} className="mt-2"/>
      </div>
    </>}
    actions={<>
      <ActionMessage on={recentlySuccessful} class="me-3">
        Saved.
      </ActionMessage>

      <PrimaryButton className={processing ? 'opacity-25' : ''} disabled={processing}>
        Save
      </PrimaryButton>
    </>}
    onSubmit={updateTeamName}
  />;
};

export default UpdateTeamNameForm;
