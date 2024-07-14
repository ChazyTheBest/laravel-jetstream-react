import ApiTokenManager from '@/Pages/API/Partials/ApiTokenManager';
import AppLayout from '@/Layouts/AppLayout';
import CreateApiTokenForm from "@/Pages/API/Partials/CreateApiTokenForm";
import SectionBorder from "@/Components/SectionBorder";
import PageHeader from "@/Components/PageHeader";

const pageTitle = 'API Tokens';
const pageHeader = <PageHeader title={pageTitle} />;

const Index = ({ tokens, availablePermissions, defaultPermissions }) =>
  <AppLayout title={pageTitle} header={pageHeader}>
    <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
      <CreateApiTokenForm
        availablePermissions={availablePermissions}
        defaultPermissions={defaultPermissions}
      />

      {tokens.length > 0 &&
        <>
          <SectionBorder />

          <ApiTokenManager
            tokens={tokens}
            availablePermissions={availablePermissions}
          />
        </>
      }
    </div>
  </AppLayout>;

export default Index;
