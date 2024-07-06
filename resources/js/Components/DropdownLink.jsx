import { Link } from '@inertiajs/react';

const DropdownLink = ({ href, as = 'link', children }) => {
  if (as === 'link') {
    return (
      <Link href={href} className="block px-4 py-2 text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out">
        {children}
      </Link>
    );
  }

  if (as === 'button') {
    return (
      <button type="submit" className="block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out">
        {children}
      </button>
    );
  }

  if (as === 'a') {
    return (
      <a href={href} className="block px-4 py-2 text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out">
        {children}
      </a>
    );
  }
};

export default DropdownLink;
