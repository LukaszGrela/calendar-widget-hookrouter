import { useMemo, type FC, type ReactNode } from 'react';
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
import { GDCurrentMonthConnected } from '../../components/GDCalendar/GDCurrentMonth';

export const MinimalCalendarHeadingConnected: FC = () => {
  const todayReference = useToday();

  const { currentMonth } = useGDCalendarContext();
  const actions = useGDCalendarActionsContext();

  const today = useMemo(
    () => ({
      action: actions?.setToday,
      disabled: datesSame(currentMonth, todayReference, 'month'),
    }),
    [actions?.setToday, currentMonth, todayReference]
  );

  return (
    <MinimalCalendarHeading
      year={currentMonth.getFullYear()}
      today={today}
      next={actions?.nextMonth}
      prev={actions?.prevMonth}
    />
  );
};

export const MinimalCalendarHeading: FC<{
  next?: () => void;
  prev?: () => void;
  year?: ReactNode;
  today?: {
    action?: () => void;
    disable?: boolean;
  };
}> = ({ year, next, prev, today }) => {
  return (
    <PopoverHeading>
      <span className="year">{year}</span>
      <div className="navigation">
        <button
          title="Previous month"
          className="GDCalendar_PrevMonth-btn"
          onClick={prev}
        >
          <SVGIcon icon="up-arrow" viewBox="0 8 48 48" />
        </button>
        {today && (
          <button
            className="today"
            onClick={today.action}
            disabled={today.disable}
          >
            Today
          </button>
        )}
        <button
          title="Next month"
          className="GDCalendar_NextMonth-btn"
          onClick={next}
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
        <div className="GDCalendar_Header">
          {/* left */}
          <div className="GDCalendar_Header_leftSlot">
            <GDCurrentMonthConnected hideYear />
          </div>
          {/* middle */}
          <div className="GDCalendar_Header_middleSlot"></div>
          {/* right */}
          <div className="GDCalendar_Header_rightSlot"></div>
        </div>
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
