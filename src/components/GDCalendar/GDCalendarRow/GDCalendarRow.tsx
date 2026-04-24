import React, { type ReactNode } from 'react';
import { GDCalendarDay, GDCalendarWeekDay } from '../GDCalendarDay';
import { classNames } from '../../../utils/classNames';

type TDateOrWeekDay = Date | string;
export interface IProps {
  className?: string;
  days: TDateOrWeekDay[];
  // selected date
  date?: Date;
  // reference date for "now"/"today"
  now?: Date;
  // reference date for current month
  current?: Date;
  onClick?: (date: Date) => void;
}

const GDCalendarRow: React.FC<IProps> = ({
  className,
  days,
  now,
  date,
  current,
  onClick = () => {},
}: IProps): ReactNode => {
  return (
    <div className={classNames('GDCalendar_Row', className)}>
      {days.map((day, index): ReactNode => {
        let key = `${day}`;
        if (typeof day === 'string') {
          key = `${day}-${index}`;
        }
        return typeof day === 'string' ? (
          <GDCalendarWeekDay
            key={key}
            className={`weekday-${index}`}
            date={day}
          />
        ) : (
          <GDCalendarDay
            key={key}
            className={`day-${index}`}
            date={day}
            onClick={onClick}
            today={
              now &&
              day.getMonth() === now.getMonth() &&
              day.getDate() === now.getDate() &&
              day.getFullYear() === now.getFullYear()
            }
            selected={
              date &&
              day.getMonth() === date.getMonth() &&
              day.getDate() === date.getDate() &&
              day.getFullYear() === date.getFullYear()
            }
            spill={current && day.getMonth() !== current.getMonth()}
          />
        );
      })}
    </div>
  );
};

export default GDCalendarRow;
