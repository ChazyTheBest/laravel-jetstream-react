import AppLayout from '@/Layouts/AppLayout';
import DeleteTeamForm from '@/Pages/Teams/Partials/DeleteTeamForm';
import PageHeader from "@/Components/PageHeader.jsx";
import SectionBorder from '@/Components/SectionBorder';
import TeamMemberManager from '@/Pages/Teams/Partials/TeamMemberManager';
import UpdateTeamNameForm from '@/Pages/Teams/Partials/UpdateTeamNameForm';

const pageTitle = 'Team Settings';
const pageHeader = <PageHeader title={pageTitle} />;

const Show = ({ team, availableRoles, permissions }) =>
  <AppLayout title={pageTitle} header={pageHeader}>
    <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
      <UpdateTeamNameForm team={team} permissions={permissions} />
      <TeamMemberManager
        className="mt-10 sm:mt-0"
        team={team}
        availableRoles={availableRoles}
        userPermissions={permissions}
      />
      {permissions.canDeleteTeam && !team.personal_team &&
        <>
          <SectionBorder />
          <DeleteTeamForm className="mt-10 sm:mt-0" team={team} />
        </>
      }
    </div>
  </AppLayout>;

export default Show;
