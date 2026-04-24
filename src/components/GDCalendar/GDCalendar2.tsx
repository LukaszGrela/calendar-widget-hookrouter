import type { FC } from 'react';
import { GDCalendarProvider } from './context/GDCalendarProvider';
import { GDCalendarHeader } from './GDCalendarHeader';
import type { IProps } from './types';
import { GDCalendarWeekRow } from './GDCalendarWeekRow';
import { GDCalendarGrid } from './GDCalendarGrid';

export const GDCalendar2: FC<IProps> = ({
  onDateChanged,
  date = new Date(),
  yearSpan = 100,
  formatMonthDays = 'short',
  formatWeekDays = 'short',
  className,
  selectedDate,
  onDateSelected,
  mondayFirst,
  locale,
}) => {
  return (
    <GDCalendarProvider
      yearSpan={yearSpan}
      date={date}
      onDateChanged={onDateChanged}
      formatMonthDays={formatMonthDays}
      formatWeekDays={formatWeekDays}
      selectedDate={selectedDate}
      onDateSelected={onDateSelected}
      mondayFirst={mondayFirst}
      locale={locale}
    >
      <div className={`GDCalendar ${className ? className : ''}`}>
        {/* Header */}
        <GDCalendarHeader />
        {/* View */}
        <div className="GDCalendar_View">
          <GDCalendarWeekRow />
          <GDCalendarGrid />
        </div>
        {/* Footer */}
      </div>
    </GDCalendarProvider>
  );
};
