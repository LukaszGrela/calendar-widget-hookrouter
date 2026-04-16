import { useMemo, type FC } from 'react';
import CalendarRow from './CalendarRow';
import { calendarDates, noop } from '../../utils/helpers';
import type { Moment } from 'moment';

interface IProps {
  now: Moment;
  date: Moment;
  dayClicked?: (date: Moment | string) => void;
}

const CalendarMonthGrid: FC<IProps> = ({ now, date, dayClicked = noop }) => {
  const renderCalendarWeeks = useMemo(() => {
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
  }, [date, dayClicked, now]);

  return <div className="month-grid">{renderCalendarWeeks}</div>;
};

export default CalendarMonthGrid;
