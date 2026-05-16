import { type RouteObject, createBrowserRouter } from 'react-router-dom';

import Home from './Home';
import LinkedCalendars from './LinkedCalendars';
import RouterCalendar from './RouterCalendar';
import TSClock from './TSClock';
import Calendar from './Calendar';
import { subtract } from '../components/GDCalendar/utils';
import YearView from './YearView';
import DateSelector from './DateSelector';

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
        path: '/ts-clock',
        element: <TSClock />,
      },
      {
        path: '/calendar',
        element: <Calendar />,
      },
      {
        path: '/linked-calendars',
        element: (
          <LinkedCalendars initialDate={subtract(new Date(), 5, 'months')} />
        ),
      },
      {
        path: '/year-view',
        element: <YearView />,
      },
      {
        path: '/date-selector',
        element: <DateSelector />,
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
