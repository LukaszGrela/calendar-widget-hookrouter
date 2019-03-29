import React, { useState } from 'react';
import moment from 'moment';
import { A } from 'hookrouter';
import PropTypes from 'prop-types';
import CalendarWidget from '../components/CalendarWidget';

const LinkedCalendars = props => {
  const [current, setCurrent] = useState(() => props.initialDate);

  const currentCalendarDateChanged = date => {
    setCurrent(date.clone());
  };

  const nextCalendarDateChanged = date => {
    setCurrent(date.clone().subtract(1, 'months'));
  };

  const today = moment();
  const next = current.clone().add(1, 'months');
  return (
    <section className="linked-calendars">
      <article>
        <p>React Calendar Widget example.</p>
      </article>
      <article className="widgets">
        <CalendarWidget
          className="linked currentMonth"
          todayDate={today}
          currentMonth={current}
          onDateChanged={currentCalendarDateChanged}
        />
        <CalendarWidget
          className="linked nextMonth"
          todayDate={today}
          currentMonth={next}
          onDateChanged={nextCalendarDateChanged}
        />
      </article>
      <nav>
        <A href="/">Home</A>
      </nav>
    </section>
  );
};

LinkedCalendars.propTypes = {
  initialDate: PropTypes.object,
};
LinkedCalendars.defaultProps = {
  initialDate: moment(),
};
export default LinkedCalendars;
