import './styles/index.scss';
import { type FC } from 'react';
import { GDCalendarProvider } from './context/GDCalendarProvider';
import { GDCalendarHeader } from './GDCalendarHeader';
import type { IProps } from './types';
import { GDCalendarWeekRowConnected } from './GDCalendarWeekRow';
import { GDCalendarMonthGridConnected } from './GDCalendarMonthGrid';
import { classNames } from '../../utils/classNames';
import { GDCalendarSelectionWrapper } from './GDCalendarSelectionWrapper';

export const GDCalendar: FC<IProps> = ({
  onDateChanged,
  date,
  yearSpan = 100,
  formatMonthDays = 'short',
  formatWeekDays = 'short',
  className,
  selection,
  onDateSelected,
  mondayFirst,
  locale,
  animate,
  workingWeek,
  holidayCallback,
}) => {
  return (
    <GDCalendarProvider
      yearSpan={yearSpan}
      date={date}
      onDateChanged={onDateChanged}
      formatMonthDays={formatMonthDays}
      formatWeekDays={formatWeekDays}
      mondayFirst={mondayFirst}
      locale={locale}
      workingWeek={workingWeek}
      holidayCallback={holidayCallback}
    >
      <GDCalendarSelectionWrapper
        selection={selection}
        onDateSelected={onDateSelected}
        onDateChanged={onDateChanged}
      >
        <div
          className={classNames(
            'GDCalendar',
            'built-in',
            `week-length-${workingWeek}`,
            className
          )}
        >
          {/* Header */}
          <GDCalendarHeader />
          {/* View */}
          <div className="GDCalendar_View">
            <GDCalendarWeekRowConnected />
            <GDCalendarMonthGridConnected animate={animate} />
          </div>
          {/* Footer */}
        </div>
      </GDCalendarSelectionWrapper>
    </GDCalendarProvider>
  );
};
