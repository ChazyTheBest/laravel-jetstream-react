import { useEffect, useState } from "react";
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/20/solid';
import Dropdown from "@/Components/Dropdown";
import DropdownLink from "@/Components/DropdownLink";

const Theme = Object.freeze({
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',

  docClasses: document.documentElement.classList,
  prefersDarkScheme: window.matchMedia('(prefers-color-scheme: dark)').matches,

  setToLight(setTheme) {
    return (store = true) => {
      setTheme(this.LIGHT);
      store && localStorage.setItem('theme', this.LIGHT);
      this.docClasses.contains(this.DARK) && this.docClasses.remove(this.DARK);
    };
  },

  setToDark(setTheme) {
    return (store = true) => {
      setTheme(this.DARK);
      store && localStorage.setItem('theme', this.DARK);
      !this.docClasses.contains(this.DARK) && this.docClasses.add(this.DARK);
    };
  },

  setToSystem(setTheme) {
    return (remove = true) => {
      setTheme(this.SYSTEM);
      remove && localStorage.removeItem('theme');
      this.prefersDarkScheme
        ? !this.docClasses.contains(this.DARK) && this.docClasses.add(this.DARK)
        : this.docClasses.contains(this.DARK) && this.docClasses.remove(this.DARK);
    };
  }
});

const ThemesDropdown = () => {
  const [ theme, setTheme ] = useState(Theme.SYSTEM);

  useEffect(() => {
    const localStorageTheme = localStorage.getItem('theme');

    if (localStorageTheme === Theme.LIGHT) {
      Theme.setToLight(setTheme)(false);
    } else if (localStorageTheme === Theme.DARK) {
      Theme.setToDark(setTheme)(false);
    } else {
      Theme.setToSystem(setTheme)(false);
    }
  }, []);

  const isActive = (currentTheme) => theme === currentTheme ? ' text-sky-400' : '';

  const iconMap = {
    [Theme.LIGHT]: <SunIcon className={`size-6${isActive(Theme.LIGHT)}`} aria-hidden="true" />,
    [Theme.DARK]: <MoonIcon className={`size-6${isActive(Theme.DARK)}`} aria-hidden="true" />,
    [Theme.SYSTEM]: Theme.prefersDarkScheme
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

    <DropdownLink as="button" onClick={Theme.setToLight(setTheme)}>
      <div className={`flex items-start${isActive(Theme.LIGHT)}`}>
        <SunIcon className="size-5" aria-hidden="true"/>
        <span className="ms-2">Light</span>
      </div>
    </DropdownLink>

    <DropdownLink as="button" onClick={Theme.setToDark(setTheme)}>
      <div className={`flex items-start${isActive(Theme.DARK)}`}>
        <MoonIcon className="size-5" aria-hidden="true"/>
        <span className="ms-2">Dark</span>
      </div>
    </DropdownLink>

    <DropdownLink as="button" onClick={Theme.setToSystem(setTheme)}>
      <div className={`flex items-start${isActive(Theme.SYSTEM)}`}>
        <ComputerDesktopIcon className="size-5" aria-hidden="true"/>
        <span className="ms-2">System</span>
      </div>
    </DropdownLink>
  </Dropdown>;
};

export default ThemesDropdown;
