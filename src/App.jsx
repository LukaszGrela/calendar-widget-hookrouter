import React from 'react';
import { useRoutes } from 'hookrouter';
import moment from 'moment';

import Home from './pages/Home';
import RouterCalendar from './pages/RouterCalendar';
import LinkedCalendars from './pages/LinkedCalendars';
import Page404 from './pages/Page404';

const routes = {
  '/': () => <Home />,
  '/router-calendar/:year?/:month?/:date?': ({ year, month, date }) => (
    <RouterCalendar year={year} month={month} date={date} />
  ),
  '/linked-calendars': () => <LinkedCalendars initialDate={moment().subtract(5, 'months')}/>,
};

const App = () => {
  const routeResult = useRoutes(routes);
  return (
    //TODO: basename="/react/calendar-widget"
    <React.Fragment>
      <header>
        <h1>Calendar Widget</h1>
      </header>
      {routeResult || <Page404 />}
      <footer>
        <div className="credits">
          Arrow Up/Down by Design Effectz from the Noun Project
        </div>
      </footer>
    </React.Fragment>
  );
};

export default App;
