import React, { useCallback, type ReactNode } from 'react';
import { classNames } from '../../../utils/classNames';
import type { TDateProps } from './types';

const GDCalendarDay: React.FC<TDateProps> = ({
  className,
  onClick,
  selected,
  today,
  data,
  endSelection,
  startSelection,
}: TDateProps): ReactNode => {
  const clickHandler = useCallback(() => {
    console.log('GDCalendarDay', data);
    onClick(data);
  }, [data, onClick]);
  // console.log('GDCalendarDay', data);
  return (
    <div
      className={classNames(
        'GDCalendar_Day',
        'date',
        className,
        selected && 'selected',
        selected && startSelection && 'start',
        selected && endSelection && 'end',
        data.holiday && 'holiday',
        data.weekend && 'weekend',
        data.spill && 'spill',
        today && 'today'
      )}
      role={'button'}
      onClick={clickHandler}
    >
      {data.date.getDate()}
    </div>
  );
};

export default GDCalendarDay;
