import React, { useMemo, type ReactNode } from 'react';
import { noop } from '../utils';
import { GDCalendarRow } from '../GDCalendarRow';
import type { IProps } from './types';

const GDCalendarMonthGrid: React.FC<IProps> = ({
  className,
  date,
  weeks = [],
  monthDate = new Date(),
  now = new Date(),
  onClick = noop,
}: IProps): ReactNode => {
  const classNameMemo = useMemo((): string => {
    return `GDCalendar_MonthGrid${className ? ` ${className}` : ''}`;
  }, [className]);

  return (
    <div className={classNameMemo}>
      {weeks.map((week, index): ReactNode => {
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
      })}
    </div>
  );
};

export default GDCalendarMonthGrid;
