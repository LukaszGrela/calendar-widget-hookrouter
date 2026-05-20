import type { IProps } from '../../../components/GDCalendar';

export type TCalendarConfig = Pick<
  IProps,
  'mondayFirst' | 'onDateSelected' | 'selection' | 'animate' | 'workingWeek'
>;
