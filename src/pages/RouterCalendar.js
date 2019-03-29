import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { A, navigate } from 'hookrouter';
import CalendarWidget from '../components/CalendarWidget';

class RouterCalendar extends React.Component {
  calendarDateChanged = date => {
    //
    navigate(
      `/router-calendar/${date.year()}/${date.month() + 1}/${date.date()}`
    );
  };

  render = () => {
    const { year, month, date } = this.props;
    console.log(this.props);
    let current = moment();
    if (year) current.year(parseInt(year, 10));
    if (month) current.month((parseInt(month, 10) || 1) - 1);
    if (date) current.date(parseInt(date, 10) || 1);

    return (
      <section>
        <article>
          <p>
            React Calendar Widget example - calendar date is fed from the route
          </p>
        </article>
        <article className="widgets">
          <CalendarWidget
            todayDate={moment()}
            currentMonth={current}
            onDateChanged={this.calendarDateChanged}
          />
        </article>
        <nav>
          <A href="/">Home</A>
        </nav>
      </section>
    );
  };
}

RouterCalendar.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
};

export default RouterCalendar;