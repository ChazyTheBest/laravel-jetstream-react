import AppLayout from '@/Layouts/AppLayout';
import DeleteUserForm from '@/Pages/Profile/Partials/DeleteUserForm';
import LogoutOtherBrowserSessionsForm from '@/Pages/Profile/Partials/LogoutOtherBrowserSessionsForm';
import PageHeader from "@/Components/PageHeader";
import SectionBorder from '@/Components/SectionBorder';
import TwoFactorAuthenticationForm from '@/Pages/Profile/Partials/TwoFactorAuthenticationForm';
import UpdatePasswordForm from '@/Pages/Profile/Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from '@/Pages/Profile/Partials/UpdateProfileInformationForm';

const pageTitle = 'Profile';
const pageHeader = <PageHeader title={pageTitle} />;

const Show = ({ confirmsTwoFactorAuthentication, sessions, jetstream, auth }) =>
  <AppLayout title={pageTitle} header={pageHeader}>
    <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
      {jetstream.canUpdateProfileInformation &&
        <>
          <UpdateProfileInformationForm user={auth.user} jetstream={jetstream} />
          <SectionBorder />
        </>
      }

      {jetstream.canUpdatePassword &&
        <>
          <UpdatePasswordForm className="mt-10 sm:mt-0" />
          <SectionBorder />
        </>
      }

      {jetstream.canManageTwoFactorAuthentication &&
        <>
          <TwoFactorAuthenticationForm
            user={auth.user}
            requiresConfirmation={confirmsTwoFactorAuthentication}
            className="mt-10 sm:mt-0"
          />
          <SectionBorder />
        </>
      }

      <LogoutOtherBrowserSessionsForm
        sessions={sessions}
        className="mt-10 sm:mt-0"
      />

      {jetstream.hasAccountDeletionFeatures &&
        <>
          <SectionBorder />
          <DeleteUserForm className="mt-10 sm:mt-0" />
        </>
      }
    </div>
  </AppLayout>;

export default Show;
