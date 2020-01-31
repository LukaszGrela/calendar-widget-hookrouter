import React, { useMemo, ReactNode } from 'react';
import { calendarDates, noop } from './utils';
import GDCalendarRow from './GDCalendarRow';

export interface IProps {
  // selected date
  date?: Date;
  // current date reference
  now?: Date;
  // display month date
  monthDate?: Date;
  className?: string;
  onClick?: (date: string | Date) => void;
}
const GDCalendarMonthGrid: React.FC<IProps> = ({
  className,
  date,
  monthDate = new Date(),
  now = new Date(),
  onClick = noop,
}: IProps): JSX.Element => {
  const classNameMemo = useMemo((): string => {
    return `GDCalendar_MonthGrid${className ? ` ${className}` : ''}`;
  }, [className]);

  const weeks = calendarDates(monthDate);

  return (
    <div className={classNameMemo}>
      {weeks.map(
        (week, index): ReactNode => {
          const key = week.reduce((acc: string, curr: Date): string => {
            return `${acc}.${curr.getDate()}`;
          }, `${week[0].getFullYear()}-${week[0].getMonth()}-${index}`);
          return (
            <GDCalendarRow
              key={key}
              className={`row-${index}`}
              days={week}
              now={now}
              current={monthDate}
              date={date}
              onClick={onClick}
            />
          );
        }
      )}
    </div>
  );
};

export default GDCalendarMonthGrid;
