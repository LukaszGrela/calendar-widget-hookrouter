import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Page404 from '../pages/Page404';
import Home from '../pages/Home';
import RouterCalendar from '../pages/RouterCalendar';
import LinkedCalendars from '../pages/LinkedCalendars';

const AppRouter = () => (
  <BrowserRouter basename="/react/calendar-widget">
    <div>
      <header>
        <h1>Calendar Widget</h1>
      </header>
      <Switch>
        <Route
          exact
          path="/index.html"
          component={() => {
            return <Redirect to="/" />;
          }}
        />
        {/*
                <Route exact path="/index.html" component={() => {
                    const now = moment();
                    return <Redirect to={`/${now.year()}/${now.month()}/${now.date()}`} />
                }} />
            */}
        <Route path="/" exact component={Home} />
        <Route
          path="/router-calendar/:year?/:month?/:date?"
          component={RouterCalendar}
        />
        <Route path="/linked-calendars" exact component={LinkedCalendars} />
        <Route component={Page404} />
      </Switch>
      <footer>
        <div className="credits">
          Arrow Up/Down by Design Effectz from the Noun Project
        </div>
      </footer>
    </div>
  </BrowserRouter>
);

export default AppRouter;
