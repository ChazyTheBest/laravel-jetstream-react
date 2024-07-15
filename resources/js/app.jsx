import './bootstrap';
import '../css/app.css';

import { createRoot, hydrateRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import ThemeProvider from "@/Components/ThemeProvider.jsx";

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: title => `${title} - ${appName}`,
    resolve: name => resolvePageComponent(
      `./Pages/${name}.jsx`,
      import.meta.glob('./Pages/**/*.jsx')
    ),
    setup({ el, App, props }) {
      const MyApp = <ThemeProvider><App {...props} /></ThemeProvider>;

      if (import.meta.env.DEV) {
          createRoot(el).render(MyApp);
          return;
      }

      hydrateRoot(el, MyApp);
    },
    progress: {
        color: '#4B5563',
    },
});
