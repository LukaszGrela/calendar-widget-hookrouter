import { classNames } from '../../../utils/classNames';
import { useGDCalendarContext } from '../context/GDCalendarContext';
import './GDCurrentMonth.scss';
import type { FC } from 'react';

export const GDCurrentMonth: FC<{
  onClick?: () => void;
  hideYear?: boolean;
}> = ({ onClick, hideYear = false }) => {
  const { currentMonth, today } = useGDCalendarContext();

  return (
    <span
      className={classNames('GDCurrentMonth', onClick && 'interactive')}
      role={onClick ? 'button' : undefined}
      onClick={onClick}
    >
      {currentMonth.toLocaleDateString([], {
        month: 'long',
        year:
          currentMonth.getFullYear() !== today.getFullYear() && !hideYear
            ? 'numeric'
            : undefined,
      })}
    </span>
  );
};
