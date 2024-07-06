import { useState } from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import ApplicationMark from '@/Components/ApplicationMark';
import Banner from '@/Components/Banner';
import Dropdown from '@/Components/Dropdown';
import DropdownLink from '@/Components/DropdownLink';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';

const AppLayout = ({ title, header, children }) => {
  const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
  const { auth, jetstream } = usePage().props;

  const switchToTeam = (team) =>
    router.put(route('current-team.update'), {
      team_id: team.id,
    }, {
      preserveState: false,
    });

  const logout = () => router.post(route('logout'));

  return <>
    <Head title={title} />

    <Banner />

    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
        {/* Primary Navigation Menu */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              {/* Logo */}
              <div className="shrink-0 flex items-center">
                <Link href={route('dashboard')}>
                  <ApplicationMark className="block h-9 w-auto" />
                </Link>
              </div>

              {/* Navigation Links */}
              <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                  Dashboard
                </NavLink>
              </div>
            </div>

            <div className="hidden sm:flex sm:items-center sm:ml-6">
              <div className="ms-3 relative">
                {/* Teams Dropdown */}
                {jetstream.hasTeamFeatures &&
                  <Dropdown
                    width="60"
                    trigger={
                      <span className="inline-flex rounded-md">
                        <button type="button"
                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700 active:bg-gray-50 dark:active:bg-gray-700 transition ease-in-out duration-150">
                          {auth.user.current_team.name}

                          <svg className="ml-2 -mr-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none"
                               viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"/>
                          </svg>
                        </button>
                      </span>
                    }
                  >
                    {/* Team Management */}
                    <div className="block px-4 py-2 text-xs text-gray-400">
                      Manage Team
                    </div>

                    {/* Team Settings */}
                    <DropdownLink href={route('teams.show', auth.user.current_team)}>
                      Team Settings
                    </DropdownLink>

                    {jetstream.canCreateTeams && (
                      <DropdownLink href={route('teams.create')}>
                        Create New Team
                      </DropdownLink>
                    )}

                    {/* Team Switcher */}
                    {auth.user.all_teams.length > 1 && (
                      <>
                        <div className="border-t border-gray-200 dark:border-gray-600" />

                        <div className="block px-4 py-2 text-xs text-gray-400">
                          Switch Teams
                        </div>

                        {auth.user.all_teams.map((team) => (
                          <form onSubmit={(e) => { e.preventDefault(); switchToTeam(team); }} key={team.id}>
                            <DropdownLink as="button">
                              <div className="flex items-center">
                                {team.id === auth.user.current_team_id && (
                                  <svg className="mr-2 h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                )}
                                <div>{team.name}</div>
                              </div>
                            </DropdownLink>
                          </form>
                        ))}
                      </>
                    )}
                  </Dropdown>
                }
              </div>

              {/* Settings Dropdown */}
              <div className="ms-3 relative">
                <Dropdown
                  width="48"
                  trigger={jetstream.managesProfilePhotos
                    ?
                      <button className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition">
                        <img className="h-8 w-8 rounded-full object-cover" src={auth.user.profile_photo_url} alt={auth.user.name} />
                      </button>
                    :
                      <span className="inline-flex rounded-md">
                        <button type="button" className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none focus:bg-gray-50 dark:focus:bg-gray-700 active:bg-gray-50 dark:active:bg-gray-700 transition ease-in-out duration-150">
                          {auth.user.name}

                          <svg className="ml-2 -mr-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                          </svg>
                        </button>
                      </span>
                  }
                >
                  {/* Account Management */}
                  <div className="block px-4 py-2 text-xs text-gray-400">
                    Manage Account
                  </div>

                  <DropdownLink href={route('profile.show')}>
                    Profile
                  </DropdownLink>

                  {jetstream.hasApiFeatures && (
                    <DropdownLink href={route('api-tokens.index')}>
                      API Tokens
                    </DropdownLink>
                  )}

                  <div className="border-t border-gray-200 dark:border-gray-600" />

                  {/* Authentication */}
                  <form onSubmit={(e) => { e.preventDefault(); logout(); }}>
                    <DropdownLink as="button">
                      Log Out
                    </DropdownLink>
                  </form>
                </Dropdown>
              </div>
            </div>

            {/* Hamburger */}
            <div className="-me-2 flex items-center sm:hidden">
              <button
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"
                onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
              >
                <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    className={showingNavigationDropdown ? 'hidden' : 'inline-flex'}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                  <path
                    className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Responsive Navigation Menu */}
        <div className={`sm:hidden ${showingNavigationDropdown ? 'block' : 'hidden'}`}>
          <div className="pt-2 pb-3 space-y-1">
            <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
              Dashboard
            </ResponsiveNavLink>
          </div>

          {/* Responsive Settings Options */}
          <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
            <div className="flex items-center px-4">
              {jetstream.managesProfilePhotos &&
                <div className="shrink-0 mr-3">
                  <img className="h-10 w-10 rounded-full object-cover" src={auth.user.profile_photo_url} alt={auth.user.name} />
                </div>
              }

              <div>
                <div className="font-medium text-base text-gray-800 dark:text-gray-200">{auth.user.name}</div>
                <div className="font-medium text-sm text-gray-500">{auth.user.email}</div>
              </div>
            </div>

            <div className="mt-3 space-y-1">
              <ResponsiveNavLink href={route('profile.show')} active={route().current('profile.show')}>
                Profile
              </ResponsiveNavLink>

              {jetstream.hasApiFeatures &&
                <ResponsiveNavLink href={route('api-tokens.index')} active={route().current('api-tokens.index')}>
                  API Tokens
                </ResponsiveNavLink>
              }

              {/* Authentication */}
              <form method="POST" onSubmit={(e) => { e.preventDefault(); logout(); }}>
                <ResponsiveNavLink as="button">
                  Log Out
                </ResponsiveNavLink>
              </form>

              {/* Team Management */}
              {jetstream.hasTeamFeatures &&
                <>
                  <div className="border-t border-gray-200 dark:border-gray-600" />

                  <div className="block px-4 py-2 text-xs text-gray-400">
                    Manage Team
                  </div>

                  <ResponsiveNavLink href={route('teams.show', auth.user.current_team)} active={route().current('teams.show')}>
                    Team Settings
                  </ResponsiveNavLink>

                  {jetstream.canCreateTeams &&
                    <ResponsiveNavLink href={route('teams.create')} active={route().current('teams.create')}>
                      Create New Team
                    </ResponsiveNavLink>
                  }

                  {/* Team Switcher */}
                  {auth.user.all_teams.length > 1 &&
                    <>
                      <div className="border-t border-gray-200 dark:border-gray-600" />

                      <div className="block px-4 py-2 text-xs text-gray-400">
                        Switch Teams
                      </div>

                      {auth.user.all_teams.map((team) =>
                        <form onSubmit={(e) => { e.preventDefault(); switchToTeam(team); }} key={team.id}>
                          <ResponsiveNavLink as="button">
                            <div className="flex items-center">
                              {team.id === auth.user.current_team_id &&
                                <svg className="mr-2 h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              }
                              <div>{team.name}</div>
                            </div>
                          </ResponsiveNavLink>
                        </form>
                      )}
                    </>
                  }
                </>
              }
            </div>
          </div>
        </div>
      </nav>

      {/* Page Heading */}
      {header &&
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            {header}
          </div>
        </header>
      }

      {/* Page Content */}
      <main>
        {children}
      </main>
    </div>
  </>;
};

export default AppLayout;
