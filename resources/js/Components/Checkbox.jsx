import { useState, useEffect } from 'react';

const Checkbox = ({ checked = false, onChange, value, className = '', ...props }) => {
  const [proxyChecked, setProxyChecked] = useState(checked);

  useEffect(() => {
    setProxyChecked(checked);
  }, [checked]);

  const handleOnChange = e => {
    setProxyChecked(e.target.checked);
    onChange(e.target.checked);
  };

  return <input
    {...props}
    type="checkbox"
    value={value}
    checked={proxyChecked}
    onChange={handleOnChange}
    className={`rounded dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-indigo-600 shadow-sm focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:focus:ring-offset-gray-800 ${className}`}
  />;
};

export default Checkbox;
