import { useEffect, useRef } from 'react';
import { Transition } from "@headlessui/react";

const Modal = ({ closeable = true, onClose, show, maxWidth = '2xl', children }) => {
  const dialogRef = useRef(null);

  const handleClose = () => closeable && onClose();

  const handleEscape = (e) => e.key === 'Escape' && show && handleClose();

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
      dialogRef.current.showModal();
    } else {
      document.body.style.overflow = null;
      setTimeout(() => {
        dialogRef.current.close();
      }, 200);
    }

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = null;
    };
  }, [show]);

  const maxWidthClass = {
    'sm': 'sm:max-w-sm',
    'md': 'sm:max-w-md',
    'lg': 'sm:max-w-lg',
    'xl': 'sm:max-w-xl',
    '2xl': 'sm:max-w-2xl',
  }[maxWidth];

  return <dialog
    className="z-50 m-0 min-h-full min-w-full overflow-y-auto bg-transparent backdrop:bg-transparent"
    ref={dialogRef}
  >
    <div className="fixed inset-0 overflow-y-auto px-4 py-6 sm:px-0 z-50" scroll-region="true">
      <Transition
        show={show}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className="fixed inset-0 transform transition-all ease-out duration-300"
          onClick={handleClose}
        >
          <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75" />
        </div>
      </Transition>

      <Transition
        show={show}
        enter="ease-out duration-300"
        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enterTo="opacity-100 translate-y-0 sm:scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      >
        <div
          className={`mb-6 bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full sm:mx-auto ${maxWidthClass}`}
        >
          {children}
        </div>
      </Transition>
    </div>
  </dialog>;
};

export default Modal;
