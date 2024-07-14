import AppLayout from '@/Layouts/AppLayout';
import PageHeader from "@/Components/PageHeader";
import Welcome from '@/Components/Welcome';

const pageTitle = 'Dashboard';
const pageHeader = <PageHeader title={pageTitle} />;

const Dashboard = () =>
  <AppLayout title={pageTitle} header={pageHeader}>
    <div className="py-12">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg">
          <Welcome />
        </div>
      </div>
    </div>
  </AppLayout>;

export default Dashboard;
