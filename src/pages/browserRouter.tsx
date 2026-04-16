import { type RouteObject, createBrowserRouter } from 'react-router-dom';

import Home from './Home';
import LinkedCalendars from './LinkedCalendars';
import RouterCalendar from './RouterCalendar';
import TSCalendar from './TSCalendar';
import TSClock from './TSClock';
import moment from 'moment';

type TRouter = ReturnType<typeof createBrowserRouter>;

let router: TRouter;

export const getRouteObjectList = (): RouteObject[] => {
  const devpaths: RouteObject[] = [];

  return (
    [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/router-calendar/:year?/:month?/:date?',
        element: <RouterCalendar />,
      },
      {
        path: '/linked-calendars',
        element: (
          <LinkedCalendars initialDate={moment().subtract(5, 'months')} />
        ),
      },
      {
        path: '/ts-calendar',
        element: <TSCalendar />,
      },
      {
        path: '/ts-clock',
        element: <TSClock />,
      },
    ] as RouteObject[]
  ).concat(devpaths);
};

/* v8 ignore start */
export const browserRouter = () => {
  router = createBrowserRouter(getRouteObjectList(), {});

  return router;
};
/* v8 ignore stop */

export { router };
