import ApiTokenManager from '@/Pages/API/Partials/ApiTokenManager';
import AppLayout from '@/Layouts/AppLayout';
import PageHeader from "@/Components/PageHeader.jsx";

const pageTitle = 'API Tokens';
const pageHeader = <PageHeader title={pageTitle} />;

const Index = ({ tokens, availablePermissions, defaultPermissions }) =>
  <AppLayout title={pageTitle} header={pageHeader}>
    <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
      <ApiTokenManager
        tokens={tokens}
        availablePermissions={availablePermissions}
        defaultPermissions={defaultPermissions}
      />
    </div>
  </AppLayout>;

export default Index;
