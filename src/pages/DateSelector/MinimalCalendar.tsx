import './MinimalCalendar.scss';

import { useMemo, useRef, type FC, type ReactNode } from 'react';

import type { IProps } from '../../components/GDCalendar';
import {
  useGDCalendarContext,
  useGDCalendarActionsContext,
} from '../../components/GDCalendar/context/GDCalendarContext';
import { GDCalendarProvider } from '../../components/GDCalendar/context/GDCalendarProvider';
import { GDCalendarSelectionWrapper } from '../../components/GDCalendar/GDCalendarSelectionWrapper';
import { GDCalendarWeekRow } from '../../components/GDCalendar/GDCalendarWeekRow';
import SVGIcon from '../../components/GDCalendar/SVGIcon';
import { useToday, datesSame } from '../../components/GDCalendar/utils';
import { PopoverHeading } from '../../components/Popover';
import { classNames } from '../../utils/classNames';
import { GDCurrentMonth } from '../../components/GDCalendar/GDCurrentMonth';
import {
  useGDCalendarSelectionActionContext,
  useGDCalendarSelectionContext,
} from '../../components/GDCalendar/context/GDCalendarSelectionContext';
import { GDCalendarMonthGrid } from '../../components/GDCalendar/GDCalendarMonthGrid';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

export const MinimalCalendarHeadingConnected: FC = () => {
  const todayReference = useToday();

  const { currentMonth } = useGDCalendarContext();
  const actions = useGDCalendarActionsContext();

  const today = useMemo(
    (): IHeadingProps['today'] => ({
      action: actions?.setToday,
      disable: datesSame(currentMonth, todayReference, 'month'),
    }),
    [actions?.setToday, currentMonth, todayReference]
  );

  return (
    <MinimalCalendarHeading
      year={currentMonth.getFullYear()}
      today={today}
      next={actions?.nextMonth}
      prev={actions?.prevMonth}
    />
  );
};
interface IHeadingProps {
  next?: () => void;
  prev?: () => void;
  year?: ReactNode;
  today?: {
    action?: () => void;
    disable?: boolean;
  };
}
export const MinimalCalendarHeading: FC<IHeadingProps> = ({
  year,
  next,
  prev,
  today,
}) => {
  console.log('MinimalCalendarHeading', today);
  return (
    <PopoverHeading>
      <span className="year">{year}</span>
      <div className="navigation">
        <button
          title="Previous month"
          className="GDCalendar_PrevMonth-btn"
          onClick={prev}
        >
          <SVGIcon icon="up-arrow" viewBox="0 8 48 48" />
        </button>
        {today && (
          <button
            className="today"
            onClick={today.action}
            disabled={today.disable}
          >
            Today
          </button>
        )}
        <button
          title="Next month"
          className="GDCalendar_NextMonth-btn"
          onClick={next}
        >
          <SVGIcon icon="down-arrow" viewBox="16 8 48 48" />
        </button>
      </div>
    </PopoverHeading>
  );
};

export const MinimalCalendar: FC<
  Omit<IProps, 'onDateSelected' | 'selection' | 'className'> & {
    children: ReactNode;
  }
> = ({
  onDateChanged,
  date,
  yearSpan = 100,
  formatMonthDays = 'short',
  formatWeekDays = 'narrow',
  mondayFirst,
  locale,
  children,
}) => {
  return (
    <GDCalendarProvider
      yearSpan={yearSpan}
      date={date}
      onDateChanged={onDateChanged}
      formatMonthDays={formatMonthDays}
      formatWeekDays={formatWeekDays}
      mondayFirst={mondayFirst}
      locale={locale}
    >
      {children}
    </GDCalendarProvider>
  );
};

type TMinimalCalendarInnerProps = Pick<
  IProps,
  'onDateChanged' | 'onDateSelected' | 'className' | 'selection'
>;

/**
 * Animated single grid calendar.
 * Note it needs to be placed in `GDCalendarProvider`.
 */
export const MinimalCalendarInner: FC<TMinimalCalendarInnerProps> = ({
  onDateChanged,
  className,
  selection,
  onDateSelected,
}) => {
  const { today, weeks, direction, currentMonth } = useGDCalendarContext();

  const selectionActions = useGDCalendarSelectionActionContext();
  const selectionContext = useGDCalendarSelectionContext();

  const transitionRef = useRef<HTMLDivElement>(null);

  return (
    <GDCalendarSelectionWrapper
      selection={selection}
      onDateSelected={onDateSelected}
      onDateChanged={onDateChanged}
    >
      <div className={`dir-${direction}`}>
        {/* <TransitionGroup className={classNames('SlideAnimation', direction)}> */}
        <SwitchTransition mode={'out-in'}>
          <CSSTransition
            // appear
            key={`${direction}-${currentMonth.toISOString()}`}
            classNames="month"
            nodeRef={transitionRef}
            timeout={150}
          >
            <div
              ref={transitionRef}
              className={classNames('GDCalendar', 'MinimalCalendar', className)}
            >
              {/* Header */}
              <div className="GDCalendar_Header">
                {/* left */}
                <div className="GDCalendar_Header_leftSlot">
                  <GDCurrentMonth currentMonth={currentMonth} hideYear />
                </div>
                {/* middle */}
                <div className="GDCalendar_Header_middleSlot"></div>
                {/* right */}
                <div className="GDCalendar_Header_rightSlot"></div>
              </div>
              {/* View */}
              <div className="GDCalendar_View">
                <GDCalendarWeekRow />
                <GDCalendarMonthGrid
                  selection={selectionContext?.selection}
                  weeks={weeks}
                  now={today}
                  onClick={selectionActions?.selectDate}
                />
              </div>
              {/* Footer */}
            </div>
          </CSSTransition>
        </SwitchTransition>
        {/* </TransitionGroup> */}
      </div>
    </GDCalendarSelectionWrapper>
  );
};
