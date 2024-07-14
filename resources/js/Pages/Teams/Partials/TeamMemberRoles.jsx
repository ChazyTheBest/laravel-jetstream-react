import { CheckCircleIcon } from "@heroicons/react/24/outline";

const TeamMemberRoles = ({availableRoles, setData, role}) =>
  <div className="relative z-0 mt-1 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer">
    {availableRoles.map((_role, i) =>
      <button
        key={_role.key}
        type="button"
        className={`relative px-4 py-3 inline-flex flex-col w-full focus:z-10 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 ${
          i > 0
            ? `border-t border-gray-200 dark:border-gray-700${i === availableRoles.length - 1 ? ' rounded-b-lg' : ''}`
            : 'rounded-t-xl'
        }`}
        onClick={() => setData('role', _role.key)}
      >
        {/* Role Name */}
        <div className="flex items-center">
          <div className={`text-sm text-gray-600 dark:text-gray-400 ${role === _role.key ? 'font-semibold' : 'opacity-50'}`}>
            {_role.name}
          </div>

          {role === _role.key &&
            <CheckCircleIcon className="ms-2 size-5 text-green-500 stroke-2" />
          }
        </div>

        {/* Role Description */}
        <div className={`mt-2 text-xs text-gray-600 dark:text-gray-400 text-start${role === _role.key ? '' : ' opacity-50'}`}>
          {_role.description}
        </div>
      </button>
    )}
  </div>;

export default TeamMemberRoles;
