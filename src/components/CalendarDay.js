import React from 'react';
import PropTypes from 'prop-types';
import { momentObj } from 'react-moment-proptypes';
import { noop } from '../utils/helpers';

const CalendarDay = props => {
  const clickHandler = () => {
    const { date, handleClick = noop } = props;
    handleClick(date);
  };

  const { date, className } = props;
  const text = typeof date === 'string' ? date : date.date();
  return (
    <div
      className={'day' + (className ? ' ' + className : '')}
      onClick={clickHandler}>
      {text}
    </div>
  );
};

CalendarDay.propTypes = {
  className: PropTypes.string,
  date: PropTypes.oneOfType([PropTypes.string, momentObj]).isRequired,
  handleClick: PropTypes.func,
};
export default CalendarDay;
