import type { TDateData, TRangeSelection } from '../types';

export type TCalendarContext = {
  /**
   * Reference to the todays date. Auto updated.
   */
  today: Date;

  weekdays: string[];
  monthList: string[];

  /**
   * Reference date of the currently displayed month.
   */
  currentMonth: Date;

  yearSpan: number;
  yearList: number[];

  mondayFirst: boolean;
  locale?: Intl.LocalesArgument;
  weeks: TDateData[][];

  isControlled?: boolean;
};
export type TCalendarActionsContext = {
  prevDay: () => void;
  nextDay: () => void;
  prevMonth: () => void;
  nextMonth: () => void;
  prevYear: () => void;
  nextYear: () => void;

  setYear: (year: number) => void;
  setMonth: (month: number) => void;

  setToday: () => void;

  setDisplayedMonth: (date: Date) => void;
};

export type TCalendarSelectionContext = {
  selection?: Date | TRangeSelection;
};
export type TCalendarSelectionActionContext = {
  selectDate: (date?: TDateData | undefined) => void;
};
