import { useTheme } from "@/contexts";
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/20/solid';
import ThemeManager from "@/theme";
import Dropdown from "@/Components/Dropdown";
import DropdownLink from "@/Components/DropdownLink";

const ThemesDropdown = () => {
  const { theme, changeThemeTo } = useTheme();

  const isActive = checkedTheme => theme === checkedTheme ? ' text-sky-400' : '';

  const iconMap = {
    [ThemeManager.LIGHT]: <SunIcon className={`size-6${isActive(ThemeManager.LIGHT)}`} aria-hidden="true" />,
    [ThemeManager.DARK]: <MoonIcon className={`size-6${isActive(ThemeManager.DARK)}`} aria-hidden="true" />,
    [ThemeManager.SYSTEM]: ThemeManager.prefersDarkScheme
                      ? <MoonIcon className="size-6" aria-hidden="true" />
                      : <SunIcon className="size-6" aria-hidden="true" />,
  };

  return <Dropdown
    width="32"
    trigger={
      <button
        type="button"
        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700 active:bg-gray-50 dark:active:bg-gray-700 transition ease-in-out duration-150"
      >
        {iconMap[theme]}
      </button>
    }
  >
    {/* Theme Switcher */}
    <div className="block px-4 py-2 text-xs text-gray-400">
      Switch Themes
    </div>

    <DropdownLink as="button" onClick={changeThemeTo(ThemeManager.LIGHT)}>
      <div className={`flex items-start${isActive(ThemeManager.LIGHT)}`}>
        <SunIcon className="size-5" aria-hidden="true"/>
        <span className="ms-2">Light</span>
      </div>
    </DropdownLink>

    <DropdownLink as="button" onClick={changeThemeTo(ThemeManager.DARK)}>
      <div className={`flex items-start${isActive(ThemeManager.DARK)}`}>
        <MoonIcon className="size-5" aria-hidden="true"/>
        <span className="ms-2">Dark</span>
      </div>
    </DropdownLink>

    <DropdownLink as="button" onClick={changeThemeTo(ThemeManager.SYSTEM)}>
      <div className={`flex items-start${isActive(ThemeManager.SYSTEM)}`}>
        <ComputerDesktopIcon className="size-5" aria-hidden="true"/>
        <span className="ms-2">System</span>
      </div>
    </DropdownLink>
  </Dropdown>;
};

export default ThemesDropdown;
