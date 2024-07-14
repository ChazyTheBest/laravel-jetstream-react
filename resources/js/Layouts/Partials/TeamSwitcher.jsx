import { CheckCircleIcon } from "@heroicons/react/24/outline";

const TeamSwitcher = ({ user, switchToTeam, Component }) =>
  <>
    <div className="border-t border-gray-200 dark:border-gray-600" />

    <div className="block px-4 py-2 text-xs text-gray-400">
      Switch Teams
    </div>

    {user.all_teams.map(team =>
      <Component as="button" onClick={switchToTeam(team)} key={team.id}>
        <div className="flex items-center">
          {team.id === user.current_team_id &&
            <CheckCircleIcon className="mr-2 size-5 text-green-400" />
          }
          <div>{team.name}</div>
        </div>
      </Component>
    )}
  </>;

export default TeamSwitcher;
