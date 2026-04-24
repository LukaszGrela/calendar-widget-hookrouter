import React, { type ReactNode } from 'react';
import { classNames } from '../../../utils/classNames';
import type { TWeekProps } from './types';

const GDCalendarWeekDay: React.FC<TWeekProps> = ({
  className,
  date,
}: TWeekProps): ReactNode => {
  return (
    <div className={classNames('GDCalendar_Day', 'weekday', className)}>
      {date}
    </div>
  );
};

export default GDCalendarWeekDay;
