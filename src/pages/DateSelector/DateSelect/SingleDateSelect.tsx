import { useCallback, useState, type FC } from 'react';
import type { TCalendarConfig } from './types';
import { DatePopoverContainer } from './DatePopoverContainer';
import { pickDate } from './utils';
import { usePopoverContext } from '../../../components/Popover';
import type { TRangeSelection } from '../../../components/GDCalendar';
import {
  MinimalCalendar,
  MinimalCalendarHeading,
  MinimalCalendarInner,
} from '../MinimalCalendar';

export const SingleDateSelect: FC<TCalendarConfig> = ({
  mondayFirst,
  onDateSelected,
  selection,
}) => {
  return (
    <DatePopoverContainer className="SingleDateSelect" selection={selection}>
      <DatePopoverContentCalendar
        mondayFirst={mondayFirst}
        selection={selection}
        onDateSelected={onDateSelected}
      />
    </DatePopoverContainer>
  );
};

const DatePopoverContentCalendar: FC<Omit<TCalendarConfig, 'children'>> = ({
  mondayFirst,
  onDateSelected,
  selection,
}) => {
  const [date, setDate] = useState(pickDate(selection));

  const context = usePopoverContext();

  const handleDateSelection = useCallback(
    (clicked?: TRangeSelection | Date | null) => {
      if (!clicked || clicked instanceof Date) {
        onDateSelected?.(clicked ?? null);
        context.setOpen(false);
      }
    },
    [context, onDateSelected]
  );

  return (
    <MinimalCalendar
      mondayFirst={mondayFirst}
      date={date}
      onDateChanged={setDate}
    >
      <MinimalCalendarHeading />
      <MinimalCalendarInner
        onDateSelected={handleDateSelection}
        selection={selection}
      />
    </MinimalCalendar>
  );
};
