import { CheckCircleIcon, ExclamationTriangleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';

const Banner = () => {
  const { props } = usePage();
  const [show, setShow] = useState(true);
  const [style, setStyle] = useState('success');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setStyle(props.jetstream.flash?.bannerStyle || 'success');
    setMessage(props.jetstream.flash?.banner || '');
    setShow(true);
  }, [props]);

  return show && message &&
    <div className={style === 'success' ? 'bg-indigo-500' : 'bg-red-700'}>
      <div className="max-w-screen-xl mx-auto py-2 px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap">
          <div className="w-0 flex-1 flex items-center min-w-0">
            <span className={`flex p-2 rounded-lg ${style === 'success' ? 'bg-indigo-600' : 'bg-red-600'}`}>
              {style === 'success'
                ? <CheckCircleIcon className="size-5 text-white" />
                : <ExclamationTriangleIcon className="size-5 text-white" />
              }
            </span>

            <p className="ms-3 font-medium text-sm text-white truncate">
              {message}
            </p>
          </div>

          <div className="shrink-0 sm:ms-3">
            <button
              type="button"
              className={'-me-1 flex p-2 rounded-md focus:outline-none sm:-me-2 transition ' + style === 'success'
                ? 'hover:bg-indigo-600 focus:bg-indigo-600'
                : 'hover:bg-red-600 focus:bg-red-600'
              }
              aria-label="Dismiss"
              onClick={() => setShow(false)}
            >
              <XMarkIcon className="size-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>;
};

export default Banner;
