import {
  BookOpenIcon,
  LockClosedIcon,
  PhotoIcon,
  VideoCameraIcon
} from "@heroicons/react/24/outline";
import { ArrowLongRightIcon } from "@heroicons/react/16/solid";
import ApplicationLogo from './ApplicationLogo';

const Welcome = () =>
  <>
    <div
      className="p-6 lg:p-8 bg-white dark:bg-gray-800 dark:bg-gradient-to-bl dark:from-gray-700/50 dark:via-transparent border-b border-gray-200 dark:border-gray-700">
      <ApplicationLogo className="block h-12 w-auto" />

      <h1 className="mt-8 text-2xl font-medium text-gray-900 dark:text-white">
        Welcome to your Jetstream application!
      </h1>

      <p className="mt-6 text-gray-500 dark:text-gray-400 leading-relaxed">
        Laravel Jetstream provides a beautiful, robust starting point for your next Laravel application. Laravel is
        designed
        to help you build your application using a development environment that is simple, powerful, and enjoyable. We
        believe
        you should love expressing your creativity through programming, so we have spent time carefully crafting the
        Laravel
        ecosystem to be a breath of fresh air. We hope you love it.
      </p>
    </div>

    <div
      className="bg-gray-200 dark:bg-gray-800 bg-opacity-25 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 p-6 lg:p-8">
      <div>
        <div className="flex items-center">
          <BookOpenIcon className="size-6 stroke-gray-400" />
          <h2 className="ms-3 text-xl font-semibold text-gray-900 dark:text-white">
            <a href="https://laravel.com/docs">Documentation</a>
          </h2>
        </div>

        <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
          Laravel has wonderful documentation covering every aspect of the framework. Whether you're new to the
          framework or have previous experience, we recommend reading all of the documentation from beginning to end.
        </p>

        <p className="mt-4 text-sm">
          <a href="https://laravel.com/docs"
             className="inline-flex items-center font-semibold text-indigo-700 dark:text-indigo-300">
            Explore the documentation

            <ArrowLongRightIcon className="ms-1 size-4 stroke-2 fill-indigo-500 dark:fill-indigo-200" />
          </a>
        </p>
      </div>

      <div>
        <div className="flex items-center">
          <VideoCameraIcon className="size-6 stroke-gray-400" />
          <h2 className="ms-3 text-xl font-semibold text-gray-900 dark:text-white">
            <a href="https://laracasts.com">Laracasts</a>
          </h2>
        </div>

        <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
          Laracasts offers thousands of video tutorials on Laravel, PHP, and JavaScript development. Check them out, see
          for yourself, and massively level up your development skills in the process.
        </p>

        <p className="mt-4 text-sm">
          <a href="https://laracasts.com"
             className="inline-flex items-center font-semibold text-indigo-700 dark:text-indigo-300">
            Start watching Laracasts

            <ArrowLongRightIcon className="ms-1 size-4 stroke-2 fill-indigo-500 dark:fill-indigo-200" />
          </a>
        </p>
      </div>

      <div>
        <div className="flex items-center">
          <PhotoIcon className="size-6 stroke-gray-400" />
          <h2 className="ms-3 text-xl font-semibold text-gray-900 dark:text-white">
            <a href="https://tailwindcss.com/">Tailwind</a>
          </h2>
        </div>

        <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
          Laravel Jetstream is built with Tailwind, an amazing utility first CSS framework that doesn't get in your way.
          You'll be amazed how easily you can build and maintain fresh, modern designs with this wonderful framework at
          your fingertips.
        </p>
      </div>

      <div>
        <div className="flex items-center">
          <LockClosedIcon className="size-6 stroke-gray-400" />
          <h2 className="ms-3 text-xl font-semibold text-gray-900 dark:text-white">
            Authentication
          </h2>
        </div>

        <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
          Authentication and registration views are included with Laravel Jetstream, as well as support for user email
          verification and resetting forgotten passwords. So, you're free to get started with what matters most:
          building your application.
        </p>
      </div>
    </div>
  </>;

export default Welcome;
