import { useCallback, useState, type FC, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  datesSame,
  getDateString,
  useToday,
} from '../components/GDCalendar/utils';
import {
  Popover,
  PopoverContent,
  PopoverHeading,
  PopoverTrigger,
  usePopoverContext,
} from '../components/Popover';
import { type IProps, type TRangeSelection } from '../components/GDCalendar';
import IconCalendar from '../icons/IconCalendar';
import { GDCalendarProvider } from '../components/GDCalendar/context/GDCalendarProvider';
import { GDCalendarSelectionWrapper } from '../components/GDCalendar/GDCalendarSelectionWrapper';
import { classNames } from '../utils/classNames';
import { GDCalendarWeekRow } from '../components/GDCalendar/GDCalendarWeekRow';
import { GDCalendarGrid } from '../components/GDCalendar/GDCalendarGrid';
import SVGIcon from '../components/GDCalendar/SVGIcon';
import {
  useGDCalendarActionsContext,
  useGDCalendarContext,
} from '../components/GDCalendar/context/GDCalendarContext';

const DateSelector: FC = () => {
  const [mondayFirst, setMondayFirst] = useState(true);

  const [singleDateSelection, setSingleSelection] = useState<Date | null>(null);
  const onSingleDateSelected = useCallback(
    (range?: Date | TRangeSelection | null) => {
      if (!range || range instanceof Date) {
        setSingleSelection(range ?? null);
      }
    },
    []
  );

  return (
    <section className="date-selector">
      <article>
        <p>Calendar widget used within the float-ui dropdown</p>
      </article>
      <article className="toolbox">
        <button onClick={() => setMondayFirst((old) => !old)}>
          {!mondayFirst ? 'Monday first' : 'Sunday first'}
        </button>
        <div>
          <span>Selected:</span>
          <span>{getDateString([null, null])}</span>
        </div>
      </article>
      <article className="widgets">
        <div className="single-select">
          <p>Single select</p>
          <DatePopover
            mondayFirst={mondayFirst}
            onDateSelected={onSingleDateSelected}
            selection={singleDateSelection}
          />
        </div>
        <div className="range-select">Range select</div>
      </article>
      <nav>
        <Link to="/">Home</Link>
      </nav>
      <footer>
        <div className="credits">
          Dropdown implemented with{' '}
          <a
            href="https://floating-ui.com/docs/react"
            target="_blank"
            rel="noopener noreferrer"
          >
            @floating-ui
          </a>
        </div>
      </footer>
    </section>
  );
};

type TCalendarConfig = Pick<
  IProps,
  'mondayFirst' | 'onDateSelected' | 'selection'
>;

const DatePopover: FC<TCalendarConfig> = ({
  mondayFirst,
  onDateSelected,
  selection,
}) => {
  const today = new Date().getDate().toString();

  return (
    <Popover<TCalendarConfig>
      placement="bottom-start"
      crossAxisOffset={0}
      offsetValue={10}
      extras={{ mondayFirst }}
    >
      <PopoverTrigger className="DatePopoverTrigger">
        <IconCalendar date={today} width={32} height={32} />
        <span>{getDateString(selection)}</span>
      </PopoverTrigger>
      <PopoverContent className="DatePopoverContentCalendar">
        <DatePopoverContentCalendar
          mondayFirst={mondayFirst}
          selection={selection}
          onDateSelected={onDateSelected}
        />
      </PopoverContent>
    </Popover>
  );
};

const pickDate = (range?: TRangeSelection | Date | null): Date | undefined => {
  if (!range) return undefined;

  if (range instanceof Date) return range;

  return range[0] ?? undefined;
};

const DatePopoverContentCalendar: FC<TCalendarConfig> = ({
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

const MinimalCalendarHeading: FC = () => {
  const today = useToday();

  const { currentMonth } = useGDCalendarContext();
  const actions = useGDCalendarActionsContext();

  return (
    <PopoverHeading>
      <span className="year">{currentMonth.getFullYear()}</span>
      <div className="navigation">
        <button
          title="Previous month"
          className="GDCalendar_PrevMonth-btn"
          onClick={actions?.prevMonth}
        >
          <SVGIcon icon="up-arrow" viewBox="0 8 48 48" />
        </button>
        <button
          className="today"
          onClick={actions?.setToday}
          disabled={datesSame(currentMonth, today, 'month')}
        >
          Today
        </button>
        <button
          title="Next month"
          className="GDCalendar_NextMonth-btn"
          onClick={actions?.nextMonth}
        >
          <SVGIcon icon="down-arrow" viewBox="16 8 48 48" />
        </button>
      </div>
    </PopoverHeading>
  );
};

const MinimalCalendar: FC<
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

const MinimalCalendarInner: FC<
  Pick<IProps, 'onDateChanged' | 'onDateSelected' | 'className' | 'selection'>
> = ({ onDateChanged, className, selection, onDateSelected }) => {
  return (
    <GDCalendarSelectionWrapper
      selection={selection}
      onDateSelected={onDateSelected}
      onDateChanged={onDateChanged}
    >
      <div className={classNames('GDCalendar', 'MinimalCalendar', className)}>
        {/* Header */}
        {/* View */}
        <div className="GDCalendar_View">
          <GDCalendarWeekRow />
          <GDCalendarGrid />
        </div>
        {/* Footer */}
      </div>
    </GDCalendarSelectionWrapper>
  );
};

export default DateSelector;
