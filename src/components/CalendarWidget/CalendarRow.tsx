import { useMemo, type FC } from 'react';
import CalendarDay from './CalendarDay';
import { noop } from '../../utils/helpers';
import type { Moment } from 'moment';

type TDateOrWeekDay = Moment | string;

interface IProps {
  days: TDateOrWeekDay[];
  now?: Moment;
  current?: Moment;
  dayClicked?: (date: TDateOrWeekDay) => void;
  className?: string;
}

const CalendarRow: FC<IProps> = ({
  days,
  className,
  current,
  dayClicked = noop,
  now,
}) => {
  console.log('CalenderRow', days);
  const renderCalendarDays = useMemo(() => {
    return days.map((day, index) => {
      const spill =
        typeof day === 'string' || !current
          ? ''
          : day.month() !== current.month()
            ? ' spill'
            : '';

      const today =
        typeof day === 'string' || !now
          ? ''
          : day.month() === now.month() &&
              day.date() === now.date() &&
              day.year() === now.year()
            ? ' today'
            : '';

      const key =
        typeof day === 'string' ? `${day}-${index}` : day.toISOString();

      return (
        <CalendarDay
          key={key}
          className={`day-${index}${spill}${today}`}
          date={day}
          handleClick={dayClicked}
        />
      );
    });
  }, [current, dayClicked, days, now]);

  return (
    <div className={'row' + (className ? ' ' + className : '')}>
      {renderCalendarDays}
    </div>
  );
};

export default CalendarRow;
