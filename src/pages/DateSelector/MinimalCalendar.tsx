import type { FC, ReactNode } from 'react';
import type { IProps } from '../../components/GDCalendar';
import {
  useGDCalendarContext,
  useGDCalendarActionsContext,
} from '../../components/GDCalendar/context/GDCalendarContext';
import { GDCalendarProvider } from '../../components/GDCalendar/context/GDCalendarProvider';
import { GDCalendarGrid } from '../../components/GDCalendar/GDCalendarGrid';
import { GDCalendarSelectionWrapper } from '../../components/GDCalendar/GDCalendarSelectionWrapper';
import { GDCalendarWeekRow } from '../../components/GDCalendar/GDCalendarWeekRow';
import SVGIcon from '../../components/GDCalendar/SVGIcon';
import { useToday, datesSame } from '../../components/GDCalendar/utils';
import { PopoverHeading } from '../../components/Popover';
import { classNames } from '../../utils/classNames';

export const MinimalCalendarHeading: FC = () => {
  const today = useToday();

  const { currentMonth } = useGDCalendarContext();
  const actions = useGDCalendarActionsContext();

  return (
    <PopoverHeading>
      <span className="year">{currentMonth.getFullYear()}</span>
      <div className="navigation">
        <button
          title="Previous month"
          className="GDCalendar_PrevMonth-btn"
          onClick={actions?.prevMonth}
        >
          <SVGIcon icon="up-arrow" viewBox="0 8 48 48" />
        </button>
        <button
          className="today"
          onClick={actions?.setToday}
          disabled={datesSame(currentMonth, today, 'month')}
        >
          Today
        </button>
        <button
          title="Next month"
          className="GDCalendar_NextMonth-btn"
          onClick={actions?.nextMonth}
        >
          <SVGIcon icon="down-arrow" viewBox="16 8 48 48" />
        </button>
      </div>
    </PopoverHeading>
  );
};

export const MinimalCalendar: FC<
  Omit<IProps, 'onDateSelected' | 'selection' | 'className'> & {
    children: ReactNode;
  }
> = ({
  onDateChanged,
  date,
  yearSpan = 100,
  formatMonthDays = 'short',
  formatWeekDays = 'narrow',
  mondayFirst,
  locale,
  children,
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
    >
      {children}
    </GDCalendarProvider>
  );
};

export const MinimalCalendarInner: FC<
  Pick<IProps, 'onDateChanged' | 'onDateSelected' | 'className' | 'selection'>
> = ({ onDateChanged, className, selection, onDateSelected }) => {
  return (
    <GDCalendarSelectionWrapper
      selection={selection}
      onDateSelected={onDateSelected}
      onDateChanged={onDateChanged}
    >
      <div className={classNames('GDCalendar', 'MinimalCalendar', className)}>
        {/* Header */}
        {/* View */}
        <div className="GDCalendar_View">
          <GDCalendarWeekRow />
          <GDCalendarGrid />
        </div>
        {/* Footer */}
      </div>
    </GDCalendarSelectionWrapper>
  );
};
