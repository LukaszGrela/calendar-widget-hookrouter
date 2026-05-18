export interface IProps {
  // current month and day
  date?: Date;
  onDateChanged?: (date: Date) => void;

  // Selected date
  selection?: Date | TRangeSelection | null;
  onDateSelected?: (date?: Date | TRangeSelection | null) => void;

  yearSpan?: number;

  formatWeekDays?: 'long' | 'short' | 'narrow';
  formatMonthDays?: 'long' | 'short' | 'narrow';

  className?: string;

  mondayFirst?: boolean;

  locale?: Intl.LocalesArgument;

  /**
   * Should calendar change animate.
   * `false` by default.
   */
  animate?: boolean;

  /**
   * Length of the week to display,
   * Mon-Sun - `7` - default
   * Mon-Sat - `6`
   * Mon-Fri - `5`
   */
  workingWeek?: 7 | 6 | 5;
}

export type TArrayElementType<A extends readonly unknown[] | null> =
  A extends readonly (infer ElementType)[] ? ElementType : never;

export type TDateData = {
  date: Date;

  holiday?: boolean;
  // is it a "spill" day - day outside of current month
  spill?: boolean;
  weekend?: boolean;
};

export type TRangeSelection = [start: Date | null, end: Date | null];
