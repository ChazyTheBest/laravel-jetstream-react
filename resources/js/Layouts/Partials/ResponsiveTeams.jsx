import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import TeamSwitcher from "@/Layouts/Partials/TeamSwitcher";

const ResponsiveTeams = ({ jetstream, user, switchToTeam }) =>
  <>
    <div className="border-t border-gray-200 dark:border-gray-600" />

    <div className="block px-4 py-2 text-xs text-gray-400">
      Manage Team
    </div>

    <ResponsiveNavLink href={route('teams.show', user.current_team)} active={route().current('teams.show')}>
      Team Settings
    </ResponsiveNavLink>

    {jetstream.canCreateTeams &&
      <ResponsiveNavLink href={route('teams.create')} active={route().current('teams.create')}>
        Create New Team
      </ResponsiveNavLink>
    }

    {/* Team Switcher */}
    {user.all_teams.length > 1 &&
      <TeamSwitcher user={user} switchToTeam={switchToTeam} Component={ResponsiveNavLink} />
    }
  </>;

export default ResponsiveTeams;
