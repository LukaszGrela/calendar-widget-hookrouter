import type { FC, ReactNode } from 'react';
import { getDateString } from '../../../components/GDCalendar/utils';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '../../../components/Popover';
import IconCalendar from '../../../icons/IconCalendar';
import type { TCalendarConfig } from './types';
import { classNames } from '../../../utils/classNames';

export const DatePopoverContainer: FC<
  TCalendarConfig & { children: ReactNode; className?: string }
> = ({ selection, children, className }) => {
  const today = new Date().getDate().toString();

  return (
    <Popover
      className={className}
      placement="bottom-start"
      crossAxisOffset={0}
      offsetValue={10}
    >
      <PopoverTrigger
        className={classNames(
          'DatePopoverTrigger',
          className && `${className}_trigger`
        )}
      >
        <IconCalendar date={today} width={32} height={32} />
        <span>{getDateString(selection)}</span>
      </PopoverTrigger>
      <PopoverContent className="DatePopoverContainer">
        {children}
      </PopoverContent>
    </Popover>
  );
};
