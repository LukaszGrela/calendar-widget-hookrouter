import { useGDCalendarContext } from '../context/GDCalendarContext';
import './GDCurrentMonth.scss';
import type { FC } from 'react';

export const GDCurrentMonth: FC = () => {
  const { currentMonth, today } = useGDCalendarContext();
  return (
    <span className="GDCurrentMonth">
      {currentMonth.toLocaleDateString([], {
        month: 'long',
        year:
          currentMonth.getFullYear() !== today.getFullYear()
            ? 'numeric'
            : undefined,
      })}
    </span>
  );
};
