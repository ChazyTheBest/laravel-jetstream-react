import { forwardRef, useRef, useEffect } from 'react';

const TextInput = ({ type = 'text', className = '', ...props }, ref) => {
  const inputRef = ref ?? useRef(null);

  useEffect(() => {
    if (inputRef.current.hasAttribute('autofocus')) {
      inputRef.current.focus();
    }
  }, []);

  return <input
    {...props}
    type={type}
    ref={inputRef}
    className={`border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm ${className}`}
  />;
};

export default forwardRef(TextInput);
