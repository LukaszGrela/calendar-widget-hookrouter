import { classNames } from '../../../utils/classNames';
import { useGDCalendarContext } from '../context/GDCalendarContext';
import './GDCurrentMonth.scss';
import type { FC } from 'react';

export const GDCurrentMonthConnected: FC<{
  onClick?: () => void;
  hideYear?: boolean;
}> = ({ onClick, hideYear = false }) => {
  const { currentMonth, today } = useGDCalendarContext();

  return (
    <GDCurrentMonth
      onClick={onClick}
      hideYear={currentMonth.getFullYear() === today.getFullYear() || hideYear}
      currentMonth={currentMonth}
    />
  );
};

export const GDCurrentMonth: FC<{
  onClick?: () => void;
  hideYear?: boolean;
  currentMonth: Date;
}> = ({ currentMonth, onClick, hideYear = false }) => {
  return (
    <span
      className={classNames('GDCurrentMonth', onClick && 'interactive')}
      role={onClick ? 'button' : undefined}
      onClick={onClick}
    >
      {currentMonth.toLocaleDateString([], {
        month: 'long',
        year: hideYear ? undefined : 'numeric',
      })}
    </span>
  );
};
