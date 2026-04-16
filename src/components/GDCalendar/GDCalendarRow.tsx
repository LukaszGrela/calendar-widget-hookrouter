import React, { useMemo, type ReactNode } from 'react';
import GDCalendarDay from './GDCalendarDay';

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
  onClick?: (date: TDateOrWeekDay) => void;
}

const GDCalendarRow: React.FC<IProps> = ({
  className,
  days,
  now,
  date,
  current,
  onClick = () => {},
}: IProps): ReactNode => {
  const classNameMemo = useMemo((): string => {
    return `GDCalendar_Row${className ? ` ${className}` : ''}`;
  }, [className]);
  return (
    <div className={classNameMemo}>
      {days.map(
        (day, index): ReactNode => {
          let spill = '';
          if (typeof day !== 'string' && current) {
            spill = day.getMonth() !== current.getMonth() ? ' spill' : '';
          }

          let today = '';
          if (typeof day !== 'string' && now) {
            today =
              day.getMonth() === now.getMonth() &&
              day.getDate() === now.getDate() &&
              day.getFullYear() === now.getFullYear()
                ? ' today'
                : '';
          }

          let selected = '';
          if (typeof day !== 'string' && date) {
            selected =
              day.getMonth() === date.getMonth() &&
              day.getDate() === date.getDate() &&
              day.getFullYear() === date.getFullYear()
                ? ' selected'
                : '';
          }

          let key = `${day}`;
          if (typeof day === 'string') {
            key = `${day}-${index}`;
          }
          return (
            <GDCalendarDay
              key={key}
              className={`day-${index}${spill}${today}${selected}`}
              date={day}
              onClick={onClick}
            />
          );
        }
      )}
    </div>
  );
};

export default GDCalendarRow;
