import React from 'react';
import PropTypes from 'prop-types';
import { momentObj } from 'react-moment-proptypes';
import moment from 'moment';
import CalendarRow from './CalendarRow';
import CalendarMonthGrid from './CalendarMonthGrid';
import CalendarNavigation from './CalendarNavigation';
import CalendarYearMonthSelectors from './CalendarYearMonthSelectors';
import { noop } from '../utils/helpers';

class CalendarWidget extends React.Component {
  nextMonth = () => {
    const { currentMonth, onDateChanged = noop } = this.props;
    onDateChanged(currentMonth.clone().add(1, 'months'));
  };

  prevMonth = () => {
    const { currentMonth, onDateChanged = noop } = this.props;
    onDateChanged(currentMonth.clone().subtract(1, 'months'));
  };

  today = () => {
    const { todayDate = moment(), onDateChanged = noop } = this.props;
    onDateChanged(todayDate.clone());
  };

  monthChanged = month => {
    const { onDateChanged = noop, currentMonth } = this.props;
    onDateChanged(currentMonth.clone().month(month));
  };

  yearChanged = year => {
    const nYear = parseInt(year, 10);
    const { onDateChanged = noop, currentMonth } = this.props;
    onDateChanged(currentMonth.clone().year(nYear));
  };

  render = () => {
    const {
      currentMonth: dateRef = moment(),
      todayDate: now = moment(),
      onDateChanged = noop,
      className,
    } = this.props;
    return (
      <div className={`CalendarWidget ${className}`}>
        <div className="month-page">
          <div className="calendar-header">
            <div
              className="today middle"
              onClick={() => {
                this.today();
              }}>
              {now.format('MMMM Do YYYY')}
            </div>
            <CalendarYearMonthSelectors
              className="left"
              year={dateRef.year()}
              month={dateRef.month()}
              monthChanged={this.monthChanged}
              yearChanged={this.yearChanged}
            />
            <CalendarNavigation
              className="right"
              navigateUp={this.prevMonth}
              navigateDown={this.nextMonth}
            />
          </div>
          <div className="calendar-view">
            <CalendarRow
              className="week-header"
              days={moment.weekdaysShort()}
            />

            <CalendarMonthGrid
              date={dateRef}
              now={now}
              dayClicked={onDateChanged}
            />
          </div>
        </div>
      </div>
    );
  };
}

CalendarWidget.propTypes = {
  className: PropTypes.string,
  dateRef: momentObj,
  todayDate: momentObj,
  currentMonth: momentObj,
  onDateChanged: PropTypes.func,
};

export default CalendarWidget;
