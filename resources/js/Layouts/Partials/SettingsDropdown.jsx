import { ChevronDownIcon } from "@heroicons/react/24/outline";
import DropdownLink from "@/Components/DropdownLink";
import Dropdown from "@/Components/Dropdown";

const SettingsDropdown = ({ className = '', jetstream, user, logout }) =>
  <Dropdown
    className={className}
    trigger={jetstream.managesProfilePhotos ?
      <button type="button" className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition">
        <img className="h-8 w-8 rounded-full object-cover" src={user.profile_photo_url} alt={user.name} />
      </button>
    :
      <button type="button" className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700 active:bg-gray-50 dark:active:bg-gray-700 transition ease-in-out duration-150">
        {user.name}

        <ChevronDownIcon className="ml-2 -mr-0.5 size-4" />
      </button>
    }
  >
    {/* Account Management */}
    <div className="block px-4 py-2 text-xs text-gray-400">
      Manage Account
    </div>

    <DropdownLink href={route('profile.show')}>
      Profile
    </DropdownLink>

    {jetstream.hasApiFeatures &&
      <DropdownLink href={route('api-tokens.index')}>
        API Tokens
      </DropdownLink>
    }

    <div className="border-t border-gray-200 dark:border-gray-600" />

    {/* Authentication */}
    <DropdownLink as="button" onClick={logout}>
      Log Out
    </DropdownLink>
  </Dropdown>;

export default SettingsDropdown;
