import type { TDateData, TRangeSelection, TWorkingWeek } from '../types';

export interface IProps {
  // selected date
  selection?: Date | TRangeSelection | null;
  // current date reference
  now?: Date;
  // current month grid data
  weeks: TDateData[][];
  className?: string;
  onClick?: (data: TDateData) => void;

  workingWeek?: TWorkingWeek;
  mondayFirst?: boolean;
}
