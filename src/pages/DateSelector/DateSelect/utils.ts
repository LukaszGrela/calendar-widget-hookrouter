import type { TRangeSelection } from '../../../components/GDCalendar';

export const pickDate = (
  range?: TRangeSelection | Date | null
): Date | undefined => {
  if (!range) return undefined;

  if (range instanceof Date) return range;

  return range[0] ?? undefined;
};
