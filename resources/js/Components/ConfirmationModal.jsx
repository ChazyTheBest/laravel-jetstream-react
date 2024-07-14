import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Modal from './Modal';

const ConfirmationModal = ({ show, maxWidth = '2xl', closeable = true, onClose, slots }) =>
  <Modal
    closeable={closeable}
    onClose={onClose}
    show={show}
    maxWidth={maxWidth}
  >
    <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div className="sm:flex sm:items-start">
        <div className="mx-auto shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <ExclamationTriangleIcon className="size-6 text-red-600 dark:text-red-400" />
        </div>

        <div className="mt-3 text-center sm:mt-0 sm:ms-4 sm:text-start">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            {slots.title}
          </h3>

          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            {slots.content}
          </div>
        </div>
      </div>
    </div>

    <div className="flex flex-row justify-end px-6 py-4 bg-gray-100 dark:bg-gray-800 text-end">
      {slots.footer}
    </div>
  </Modal>;

export default ConfirmationModal;
