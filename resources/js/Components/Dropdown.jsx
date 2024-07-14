import { cloneElement, useEffect, useState } from 'react';
import { Transition } from "@headlessui/react";

const Dropdown = ({
  width = '48',
  align = 'right',
  className = '',
  contentClasses = 'py-1 bg-white dark:bg-gray-700',
  trigger,
  children
}) => {
  const [open, setOpen] = useState(false);

  const closeOnEscape = e => {
    if (open && e.key === 'Escape') {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [open]);

  const toggleDropdown = () => setOpen(!open);
  const triggerWithToggle = cloneElement(trigger, { onClick: toggleDropdown });

  const closeOnClick = () => setOpen(false);

  const widthClass = {
    '28': 'w-28',
    '32': 'w-32',
    '48': 'w-48',
    '60': 'w-60'
  }[width.toString()];

  const alignmentClasses = {
    left: 'ltr:origin-top-left rtl:origin-top-right start-0',
    right: 'ltr:origin-top-right rtl:origin-top-left end-0',
  }[align] || 'origin-top';

  return <div className={`relative ${className}`}>
    {triggerWithToggle}

    {/* Full Screen Dropdown Overlay */}
    {open && <div className="fixed inset-0 z-40" onClick={closeOnClick} />}

    <Transition
      show={open}
      enter="transition ease-out duration-200"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <div
        className={`absolute z-50 mt-2 rounded-md shadow-lg ${widthClass} ${alignmentClasses}`}
        onClick={closeOnClick}
      >
        <div className={`rounded-md ring-1 ring-black ring-opacity-5 ${contentClasses}`}>
          {children}
        </div>
      </div>
    </Transition>
  </div>;
};

export default Dropdown;
