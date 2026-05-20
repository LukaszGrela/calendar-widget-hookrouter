import type { TRangeSelection } from '../components/GDCalendar';

export const getDateString = (
  range?: TRangeSelection | Date | null
): string => {
  if (!range) return 'not selected';

  if (range instanceof Date) return range.toLocaleDateString();

  const dates = range.filter(Boolean) as Date[];
  if (dates.length === 0) return 'not selected';
  if (dates.length === 1) return dates[0].toLocaleDateString();

  return `${dates[0].toLocaleDateString()} - ${dates[1].toLocaleDateString()}`;
};
