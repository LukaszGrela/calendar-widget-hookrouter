import './RangeDateSelect.scss';
import { useCallback, useMemo, useState, type FC } from 'react';
import type { TCalendarConfig } from './types';
import { DatePopoverContainer } from './DatePopoverContainer';
import { pickDate } from './utils';
import { usePopoverContext } from '../../../components/Popover';
import type { IProps, TRangeSelection } from '../../../components/GDCalendar';
import { MinimalCalendar, MinimalCalendarHeading } from '../MinimalCalendar';
import {
  useGDCalendarActionsContext,
  useGDCalendarContext,
} from '../../../components/GDCalendar/context/GDCalendarContext';
import {
  useGDCalendarSelectionActionContext,
  useGDCalendarSelectionContext,
} from '../../../components/GDCalendar/context/GDCalendarSelectionContext';
import {
  GDCalendarMonthGrid,
  type IProps as IGDCalendarGridProps,
} from '../../../components/GDCalendar/GDCalendarMonthGrid';
import {
  add,
  calendarDates,
  datesSame,
  subtract,
} from '../../../components/GDCalendar/utils';
import { GDCalendarWeekRow } from '../../../components/GDCalendar/GDCalendarWeekRow';
import { classNames } from '../../../utils/classNames';
import { GDCalendarSelectionWrapper } from '../../../components/GDCalendar/GDCalendarSelectionWrapper';
import { GDCurrentMonth } from '../../../components/GDCalendar/GDCurrentMonth';
import { AnimatedContainer } from '../../../components/GDCalendar/AnimatedContainer';

export const RangeDateSelect: FC<
  Omit<TCalendarConfig, 'selection'> & { selection?: TRangeSelection | null }
> = ({ mondayFirst, onDateSelected, selection, animate }) => {
  return (
    <DatePopoverContainer className="RangeDateSelect" selection={selection}>
      <DateRangePopoverContentCalendar
        mondayFirst={mondayFirst}
        selection={selection}
        onDateSelected={onDateSelected}
        animate={animate}
      />
    </DatePopoverContainer>
  );
};

const DateRangePopoverContentCalendar: FC<
  Omit<TCalendarConfig, 'selection'> & { selection?: TRangeSelection | null }
> = ({ mondayFirst, onDateSelected, selection, animate }) => {
  const [date, setDate] = useState(pickDate(selection));
  const [localSelection, setLocalSelection] = useState<
    TRangeSelection | null | undefined
  >(selection);

  const context = usePopoverContext();

  const handleDateSelection = useCallback(
    (clicked?: TRangeSelection | Date | null) => {
      if (!(clicked instanceof Date)) {
        setLocalSelection?.(clicked ?? null);
      }
    },
    []
  );

  const confirmSelection = useCallback(() => {
    onDateSelected?.(localSelection);
    context.setOpen(false);
  }, [context, localSelection, onDateSelected]);

  const disableConfirm = useMemo(() => {
    return (
      !!(localSelection && localSelection.filter(Boolean).length == 2) === false
    );
  }, [localSelection]);

  return (
    <MinimalCalendar
      mondayFirst={mondayFirst}
      date={date}
      onDateChanged={setDate}
    >
      <CalendarHeadingConnected />
      <LinkedCalendarGridsInner
        onDateSelected={handleDateSelection}
        selection={localSelection}
        animate={animate}
      />
      <div className="MinimalCalendar_footer">
        <span style={{ flexGrow: 1 }}>&nbsp;</span>
        <button
          className="ok"
          onClick={confirmSelection}
          disabled={disableConfirm}
        >
          Select
        </button>
      </div>
    </MinimalCalendar>
  );
};

const CalendarHeadingConnected: FC = () => {
  const todayReference = useMemo(() => new Date(), []);

  const { currentMonth } = useGDCalendarContext();

  const nextMonth = useMemo(() => {
    return add(currentMonth, 1, 'months');
  }, [currentMonth]);

  const actions = useGDCalendarActionsContext();

  const todayBtnConfig = useMemo(
    () => ({
      action: actions?.setToday,
      disable:
        datesSame(currentMonth, todayReference, 'month') ||
        datesSame(nextMonth, todayReference, 'month'),
    }),
    [actions?.setToday, currentMonth, nextMonth, todayReference]
  );

  const next = useCallback(() => {
    actions?.setDisplayedMonth(add(currentMonth, 2, 'months'), 'next');
  }, [actions, currentMonth]);

  const prev = useCallback(() => {
    actions?.setDisplayedMonth(subtract(currentMonth, 2, 'months'), 'prev');
  }, [actions, currentMonth]);

  return (
    <MinimalCalendarHeading
      year={
        <>
          <span>{currentMonth.getFullYear()}</span>
          {!datesSame(currentMonth, nextMonth, 'year') && (
            <>
              <span>/</span>
              <span>{nextMonth.getFullYear()}</span>
            </>
          )}
        </>
      }
      today={todayBtnConfig}
      next={next}
      prev={prev}
    />
  );
};

export const LinkedCalendarGridsInner: FC<
  Pick<
    IProps,
    'onDateChanged' | 'onDateSelected' | 'className' | 'selection' | 'animate'
  >
> = ({ onDateChanged, className, selection, onDateSelected, animate }) => {
  const { today, weeks, currentMonth, mondayFirst } = useGDCalendarContext();

  const nextMonth = useMemo(() => {
    return add(currentMonth, 1, 'months');
  }, [currentMonth]);
  const next = useMemo(() => {
    return calendarDates(nextMonth, mondayFirst);
  }, [mondayFirst, nextMonth]);

  const calendarGridsElement = useMemo(() => {
    return (
      <div className="RangeDateSelect_grids">
        <div
          className={classNames(
            'GDCalendar',
            'MinimalCalendar',
            'currentMonth',
            className
          )}
        >
          {/* Header */}
          <div className="GDCalendar_Header">
            {/* left */}
            <div className="GDCalendar_Header_leftSlot">
              <GDCurrentMonth hideYear currentMonth={currentMonth} />
            </div>
            {/* middle */}
            <div className="GDCalendar_Header_middleSlot"></div>
            {/* right */}
            <div className="GDCalendar_Header_rightSlot"></div>
          </div>
          {/* View */}
          <div className="GDCalendar_View">
            <GDCalendarWeekRow />
            <GDCalendarMonthGridConnected weeks={weeks} now={today} />
          </div>
          {/* Footer */}
        </div>

        <div
          className={classNames(
            'GDCalendar',
            'MinimalCalendar',
            'nextMonth',
            className
          )}
        >
          {/* Header */}
          <div className="GDCalendar_Header">
            {/* left */}
            <div className="GDCalendar_Header_leftSlot">
              <GDCurrentMonth hideYear currentMonth={nextMonth} />
            </div>
            {/* middle */}
            <div className="GDCalendar_Header_middleSlot"></div>
            {/* right */}
            <div className="GDCalendar_Header_rightSlot"></div>
          </div>
          {/* View */}
          <div className="GDCalendar_View">
            <GDCalendarWeekRow />
            <GDCalendarMonthGridConnected weeks={next} now={today} />
          </div>
          {/* Footer */}
        </div>
      </div>
    );
  }, [className, currentMonth, next, nextMonth, today, weeks]);

  return (
    <GDCalendarSelectionWrapper
      selection={selection}
      onDateSelected={onDateSelected}
      onDateChanged={onDateChanged}
    >
      {!animate && calendarGridsElement}
      {animate && (
        <AnimatedContainer transitionClassNames={'range'} timeout={150}>
          {calendarGridsElement}
        </AnimatedContainer>
      )}
    </GDCalendarSelectionWrapper>
  );
};

const GDCalendarMonthGridConnected: FC<
  Omit<IGDCalendarGridProps, 'selection' | 'onClick'>
> = ({ weeks, now, className }) => {
  const selectionActions = useGDCalendarSelectionActionContext();
  const selectionContext = useGDCalendarSelectionContext();
  return (
    <GDCalendarMonthGrid
      className={className}
      selection={selectionContext?.selection}
      weeks={weeks}
      now={now}
      onClick={selectionActions?.selectDate}
    />
  );
};
