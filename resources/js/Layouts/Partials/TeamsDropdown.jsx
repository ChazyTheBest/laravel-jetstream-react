import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import DropdownLink from "@/Components/DropdownLink";
import Dropdown from "@/Components/Dropdown";
import TeamSwitcher from "@/Layouts/Partials/TeamSwitcher";

const TeamsDropdown = ({ className = '', user, jetstream, switchToTeam }) =>
  <Dropdown
    width="60"
    className={className}
    trigger={
      <button type="button" className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700 active:bg-gray-50 dark:active:bg-gray-700 transition ease-in-out duration-150">
        {user.current_team.name}

        <ChevronUpDownIcon className="ml-2 -mr-0.5 size-4" />
      </button>
    }
  >
    {/* Team Management */}
    <div className="block px-4 py-2 text-xs text-gray-400">
      Manage Team
    </div>

    {/* Team Settings */}
    <DropdownLink href={route('teams.show', user.current_team)}>
      Team Settings
    </DropdownLink>

    {jetstream.canCreateTeams &&
      <DropdownLink href={route('teams.create')}>
        Create New Team
      </DropdownLink>
    }

    {/* Team Switcher */}
    {user.all_teams.length > 1 &&
      <TeamSwitcher user={user} switchToTeam={switchToTeam} Component={DropdownLink} />
    }
  </Dropdown>;

export default TeamsDropdown;
