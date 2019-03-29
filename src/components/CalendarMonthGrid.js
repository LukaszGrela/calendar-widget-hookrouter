import React from 'react';
import PropTypes from 'prop-types';
import { momentObj } from 'react-moment-proptypes';
import CalendarRow from './CalendarRow';
import { calendarDates, noop } from '../utils/helpers';

const CalendarMonthGrid = props => {
  const renderCalendarWeeks = () => {
    const { now, date, dayClicked = noop } = props;
    const weeks = calendarDates(date);
    return weeks.map((week, index) => (
      <CalendarRow
        key={index}
        className={`week row-${index}`}
        days={week}
        now={now}
        current={date}
        dayClicked={dayClicked}
      />
    ));
  };

  return <div className="month-grid">{renderCalendarWeeks()}</div>;
};
CalendarMonthGrid.propTypes = {
  now: momentObj.isRequired,
  date: momentObj.isRequired,
  dayClicked: PropTypes.func,
};

export default CalendarMonthGrid;
