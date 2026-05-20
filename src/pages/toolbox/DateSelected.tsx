import type { FC } from 'react';
import type { TRangeSelection } from '../../components/GDCalendar';
import { getDateString } from '../utils';

export const DateSelected: FC<{
  selection?: Date | TRangeSelection | null;
}> = ({ selection }) => {
  return (
    <div className="DateSelected">
      <span>Selected:</span>
      <span>{getDateString(selection)}</span>
    </div>
  );
};
