import AppLayout from '@/Layouts/AppLayout';
import CreateTeamForm from '@/Pages/Teams/Partials/CreateTeamForm';
import PageHeader from "@/Components/PageHeader.jsx";

const pageTitle = 'Create Team';
const pageHeader = <PageHeader title={pageTitle} />;

const CreateTeam = () =>
  <AppLayout title={pageTitle} header={pageHeader}>
    <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
      <CreateTeamForm />
    </div>
  </AppLayout>;

export default CreateTeam;
