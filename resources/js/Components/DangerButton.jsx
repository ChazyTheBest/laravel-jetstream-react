const DangerButton = ({ type = 'button', className = '', children, ...props }) =>
  <button
    {...props}
    type={type}
    className={`inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-25 transition ease-in-out duration-150 ${className}`}
  >
    {children}
  </button>;

export default DangerButton;
