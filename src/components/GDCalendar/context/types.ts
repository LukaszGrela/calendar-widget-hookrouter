import type { ReactNode } from 'react';
import type { IProps, TDateData, TRangeSelection } from '../types';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type TGDCalendarProviderProps = Omit<
  IProps,
  'selection' | 'onDateSelected' | 'className' | 'animate'
> & { children: ReactNode };

type TCalendarContextFromProps = Pick<
  IProps,
  'workingWeek' | 'mondayFirst' | 'locale'
>;

export type TChangeDirection = 'next' | 'prev' | 'none';
export type TCalendarContext = TCalendarContextFromProps & {
  /**
   * Reference to the todays date. Auto updated.
   */
  today: Date;

  weekdays: string[];
  monthList: string[];

  /**
   * Direction of the month change
   * - `none` - change within current month, all `set*` methods
   * - `next` - change to next month, all `next*` methods, and `setDisplayedMonth` with optional `direction` param
   * - `prev` - change to previous month, all `prev*` methods, and `setDisplayedMonth` with optional `direction` param
   */
  direction: TChangeDirection;

  /**
   * Reference date of the currently displayed month.
   */
  currentMonth: Date;

  yearSpan: number;
  yearList: number[];

  weeks: TDateData[][];

  isControlled?: boolean;
};

export type TCalendarActionsContext = {
  // prevDay: () => void;
  // nextDay: () => void;
  prevMonth: () => void;
  nextMonth: () => void;
  prevYear: () => void;
  nextYear: () => void;

  setYear: (year: number) => void;
  setMonth: (month: number) => void;

  setToday: () => void;

  setDisplayedMonth: (date: Date, direction?: TChangeDirection) => void;
};

export type TCalendarSelectionContext = {
  selection?: Date | TRangeSelection | null;
};
export type TCalendarSelectionActionContext = {
  selectDate: (date?: TDateData | undefined | null) => void;
};
