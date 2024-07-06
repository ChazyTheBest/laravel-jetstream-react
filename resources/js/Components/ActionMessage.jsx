import { Transition } from '@headlessui/react';

const ActionMessage = ({ on, className = '', children}) =>
  <Transition
    show={on}
    leave="transition ease-in duration-1000"
    leaveFrom="opacity-100"
    leaveTo="opacity-0"
  >
    <div className={`text-sm text-gray-600 dark:text-gray-400 ${className}`}>
      {children}
    </div>
  </Transition>;

export default ActionMessage;
