const InputLabel = ({ htmlFor, className = '', value, children }) =>
  <label
    htmlFor={htmlFor}
    className={`block font-medium text-sm text-gray-700 dark:text-gray-300 ${className}`}
  >
    {value ? <span>{value}</span> : <span>{children}</span>}
  </label>;

export default InputLabel;
