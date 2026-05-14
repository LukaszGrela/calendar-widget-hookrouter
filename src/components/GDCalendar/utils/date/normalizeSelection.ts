import type { TRangeSelection } from '../../types';
import { startOfDay } from '../utils';

export const normalizeSelection = (
  selection?: Date | TRangeSelection
): Date | TRangeSelection | undefined => {
  if (!selection) return undefined;
  if (selection instanceof Date) return startOfDay(selection);

  const range = selection.map((date) =>
    date ? startOfDay(date) : null
  ) as TRangeSelection;

  if (range[0] == null && range[1] != null) {
    range[0] = range[1];
    range[1] = null;
  }

  return range;
};
