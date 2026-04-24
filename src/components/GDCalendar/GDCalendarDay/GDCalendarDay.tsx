import React, { useCallback, type ReactNode } from 'react';
import { classNames } from '../../../utils/classNames';
import type { TDateProps } from './types';

const GDCalendarDay: React.FC<TDateProps> = ({
  className,
  date,
  onClick,
  selected,
  spill,
  today,
}: TDateProps): ReactNode => {
  const clickHandler = useCallback(() => {
    onClick(date);
  }, [date, onClick]);

  return (
    <div
      className={classNames(
        'GDCalendar_Day',
        'date',
        className,
        selected && 'selected',
        spill && 'spill',
        today && 'today'
      )}
      role={'button'}
      onClick={clickHandler}
    >
      {date.getDate()}
    </div>
  );
};

export default GDCalendarDay;
