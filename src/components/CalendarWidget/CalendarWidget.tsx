import { useCallback, type FC } from 'react';
import moment, { type Moment } from 'moment';
import CalendarRow from './CalendarRow';
import CalendarMonthGrid from './CalendarMonthGrid';
import CalendarNavigation from './CalendarNavigation';
import CalendarYearMonthSelectors from './CalendarYearMonthSelectors';
import { noop } from '../../utils/helpers';

interface IProps {
  className?: string;
  todayDate?: Moment;
  currentMonth?: Moment;
  onDateChanged: (date: Moment | string) => void;
}

const CalendarWidget: FC<IProps> = ({
  className,
  onDateChanged = noop,
  currentMonth = moment(),
  todayDate = moment(),
}) => {
  const nextMonth = useCallback(() => {
    onDateChanged(currentMonth.clone().add(1, 'months'));
  }, [currentMonth, onDateChanged]);

  const prevMonth = useCallback(() => {
    onDateChanged(currentMonth.clone().subtract(1, 'months'));
  }, [currentMonth, onDateChanged]);

  const today = useCallback(() => {
    onDateChanged(todayDate.clone());
  }, [onDateChanged, todayDate]);

  const monthChanged = useCallback(
    (month: string) => {
      onDateChanged(currentMonth.clone().month(month));
    },
    [currentMonth, onDateChanged]
  );

  const yearChanged = useCallback(
    (year: string) => {
      const nYear = parseInt(year, 10);
      onDateChanged(currentMonth.clone().year(nYear));
    },
    [currentMonth, onDateChanged]
  );

  return (
    <div className={`CalendarWidget ${className}`}>
      <div className="month-page">
        <div className="calendar-header">
          <div className="today middle" onClick={today}>
            {todayDate.format('MMMM Do YYYY')}
          </div>
          <CalendarYearMonthSelectors
            className="left"
            year={currentMonth.year()}
            month={currentMonth.month()}
            monthChanged={monthChanged}
            yearChanged={yearChanged}
          />
          <CalendarNavigation
            className="right"
            navigateUp={prevMonth}
            navigateDown={nextMonth}
          />
        </div>
        <div className="calendar-view">
          <CalendarRow className="week-header" days={moment.weekdaysShort()} />

          <CalendarMonthGrid
            date={currentMonth}
            now={todayDate}
            dayClicked={onDateChanged}
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarWidget;
