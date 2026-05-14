import './styles/index.scss';
import { useCallback, useState, type FC } from 'react';
import { GDCalendarProvider } from './context/GDCalendarProvider';
import { GDCalendarHeader } from './GDCalendarHeader';
import type { IProps, TRangeSelection } from './types';
import { GDCalendarWeekRow } from './GDCalendarWeekRow';
import { GDCalendarGrid } from './GDCalendarGrid';
import { CalendarSelectionProvider } from './context/CalendarSelectionProvider';
import { datesSame } from './utils';
import { classNames } from '../../utils/classNames';

export const GDCalendar: FC<IProps> = ({
  onDateChanged,
  date = new Date(),
  yearSpan = 100,
  formatMonthDays = 'short',
  formatWeekDays = 'short',
  className,
  selection,
  onDateSelected,
  mondayFirst,
  locale,
}) => {
  const [currentDate, setCurrentDate] = useState(date);

  const dateChangeHandler = useCallback(
    (arg: Date) => {
      setCurrentDate(arg);
      onDateChanged?.(arg);
    },
    [onDateChanged]
  );

  const selectionHandler = useCallback(
    (arg?: Date | TRangeSelection | undefined) => {
      if (arg && arg instanceof Date && !datesSame(arg, currentDate, 'month')) {
        // navigate to this dates month
        dateChangeHandler(arg);
      }

      onDateSelected?.(arg);
    },
    [currentDate, dateChangeHandler, onDateSelected]
  );

  return (
    <GDCalendarProvider
      yearSpan={yearSpan}
      date={date}
      onDateChanged={dateChangeHandler}
      formatMonthDays={formatMonthDays}
      formatWeekDays={formatWeekDays}
      mondayFirst={mondayFirst}
      locale={locale}
    >
      <CalendarSelectionProvider
        selection={selection}
        onDateSelected={selectionHandler}
      >
        <div className={classNames('GDCalendar', className)}>
          {/* Header */}
          <GDCalendarHeader />
          {/* View */}
          <div className="GDCalendar_View">
            <GDCalendarWeekRow />
            <GDCalendarGrid />
          </div>
          {/* Footer */}
        </div>
      </CalendarSelectionProvider>
    </GDCalendarProvider>
  );
};
