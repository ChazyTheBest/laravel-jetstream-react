import Modal from './Modal';

const DialogModal = ({ show, maxWidth = '2xl', closeable = true, onClose, slots }) =>
  <Modal
    closeable={closeable}
    onClose={onClose}
    show={show}
    maxWidth={maxWidth}
  >
    <div className="px-6 py-4">
      <div className="text-lg font-medium text-gray-900 dark:text-gray-100">
        {slots.title}
      </div>

      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        {slots.content}
      </div>
    </div>

    <div className="flex flex-row justify-end px-6 py-4 bg-gray-100 dark:bg-gray-800 text-end">
      {slots.footer}
    </div>
  </Modal>;

export default DialogModal;
