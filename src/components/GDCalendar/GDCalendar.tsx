import './styles/index.scss';
import { useCallback, type FC, type ReactNode } from 'react';
import { GDCalendarProvider } from './context/GDCalendarProvider';
import { GDCalendarHeader } from './GDCalendarHeader';
import type { IProps, TRangeSelection } from './types';
import { GDCalendarWeekRow } from './GDCalendarWeekRow';
import { GDCalendarGrid } from './GDCalendarGrid';
import { datesSame } from './utils';
import { classNames } from '../../utils/classNames';
import {
  useGDCalendarActionsContext,
  useGDCalendarContext,
} from './context/GDCalendarContext';
import { GDCalendarSelectionProvider } from './context/GDCalendarSelectionProvider';

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
      <SelectionWrapper
        selection={selection}
        onDateSelected={onDateSelected}
        onDateChanged={onDateChanged}
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
      </SelectionWrapper>
    </GDCalendarProvider>
  );
};

const SelectionWrapper: FC<
  Pick<IProps, 'onDateSelected' | 'selection' | 'onDateChanged'> & {
    children: ReactNode;
  }
> = ({ children, selection, onDateSelected, onDateChanged }) => {
  const { isControlled, currentMonth } = useGDCalendarContext();
  const actions = useGDCalendarActionsContext();

  const selectionHandler = useCallback(
    (arg?: Date | TRangeSelection | undefined) => {
      if (
        arg &&
        arg instanceof Date &&
        !datesSame(arg, currentMonth, 'month')
      ) {
        if (!isControlled) {
          // navigate to this dates month
          actions?.setDisplayedMonth(arg);
        } else {
          onDateChanged?.(arg);
        }
      }

      onDateSelected?.(arg);
    },
    [actions, currentMonth, isControlled, onDateChanged, onDateSelected]
  );

  return (
    <GDCalendarSelectionProvider
      selection={selection}
      onDateSelected={selectionHandler}
    >
      {children}
    </GDCalendarSelectionProvider>
  );
};
