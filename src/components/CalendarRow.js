import React from 'react';
import PropTypes from 'prop-types';
import CalendarDay from './CalendarDay';
import { momentObj } from 'react-moment-proptypes';
import { noop } from '../utils/helpers';

const CalendarRow = props => {
  const renderCalendarDays = () => {
    const { days, now, current, dayClicked = noop } = props;
    return days.map((day, index) => {
      const spill =
        typeof date === 'string' || !current
          ? ''
          : day.month() !== current.month()
          ? ' spill'
          : '';
      const today =
        typeof date === 'string' || !now
          ? ''
          : day.month() === now.month() &&
            day.date() === now.date() &&
            day.year() === now.year()
          ? ' today'
          : '';
      return (
        <CalendarDay
          key={day}
          className={`day-${index}${spill}${today}`}
          date={day}
          handleClick={dayClicked}
        />
      );
    });
  };

  return (
    <div className={'row' + (props.className ? ' ' + props.className : '')}>
      {renderCalendarDays()}
    </div>
  );
};
CalendarRow.propTypes = {
  days: PropTypes.array.isRequired,
  now: momentObj,
  current: momentObj,
  dayClicked: PropTypes.func,
  className: PropTypes.string,
};

export default CalendarRow;
