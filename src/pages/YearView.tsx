import { useCallback, useMemo, useState, type FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { add, startOfDay, subtract } from '../components/GDCalendar/utils';
import type { IProps, TRangeSelection } from '../components/GDCalendar/types';
import { GDCalendarProvider } from '../components/GDCalendar/context/GDCalendarProvider';
import { GDCurrentMonthConnected } from '../components/GDCalendar/GDCurrentMonth';
import { GDCalendarWeekRowConnected } from '../components/GDCalendar/GDCalendarWeekRow';
import { GDCalendarMonthGridConnected } from '../components/GDCalendar/GDCalendarMonthGrid';

import { useImmer } from '../utils/useImmer';
import { GDCalendarSelectionProvider } from '../components/GDCalendar/context/GDCalendarSelectionProvider';
import { DateSelected } from './toolbox/DateSelected';
import IconDown from '../icons/IconDown';
import IconUp from '../icons/IconUp';
import { MondayFirstButton } from './toolbox/MondayFirstButton';
import { AnimateToggleButton } from './toolbox/AnimateToggleButton';
import { WorkingWeekLength } from './toolbox/WorkingWeekLength';
import { classNames } from '../utils/classNames';
import {
  HolidaySelector,
  type THolidaysKeys,
  type THolidaysMap,
} from './toolbox/HolidaySelector';

const jan = startOfDay(new Date());
jan.setDate(1);
jan.setMonth(0);

const YearView: FC = () => {
  const [holidaysSelection, setHolidaysSelection] =
    useState<THolidaysKeys>('none');
  const [holidays, setHolidays] = useState<THolidaysMap | null>(null);
  const [mondayFirst, setMondayFirst] = useState(true);
  const [animate, setAnimate] = useState(false);
  const [workingWeek, setWorkingWeek] =
    useState<Exclude<IProps['workingWeek'], undefined | null>>(7);

  const changeHoliday = useCallback(
    (value: THolidaysKeys, map: THolidaysMap | null) => {
      setHolidaysSelection(value);
      setHolidays(map);
    },
    []
  );

  const handleHolidayCheck = useCallback(
    (date: Date) => {
      const isoKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      const yearlessKey = `*-${date.getMonth()}-${date.getDate()}`;

      if (!holidays) return false;

      const matched = [
        ...(holidays.get(isoKey) ?? []),
        ...(holidays.get(yearlessKey) ?? []),
      ];

      return (matched?.length ?? 0) > 0;
    },
    [holidays]
  );

  const animateConfig = useMemo((): IProps['animate'] => {
    if (animate) {
      return {
        appear: true,
      };
    }
    return false;
  }, [animate]);

  const navigate = useNavigate();

  const [curentDateRef, setCurrentRefDate] = useState(jan);

  const [selection, setSelection] = useImmer<TRangeSelection>([null, null]);
  const handleRangeSelection = useCallback(
    (range?: Date | TRangeSelection | null) => {
      // console.log('LinkedCalendar.handleRangeSelection', range);
      if (!(range instanceof Date)) {
        setSelection((draft) => {
          draft[0] = range?.[0] ?? null;
          draft[1] = range?.[1] ?? null;
        });
      }
    },
    [setSelection]
  );

  const nextYear = useCallback(() => {
    setCurrentRefDate((date) => {
      return add(date, 1, 'year');
    });
  }, []);
  const prevYear = useCallback(() => {
    setCurrentRefDate((date) => {
      return subtract(date, 1, 'year');
    });
  }, []);
  const setCurrentYear = useCallback(() => {
    setCurrentRefDate(jan);
  }, []);

  const months = useMemo(() => {
    const list: Date[] = [];
    for (let monthIndex = 0; monthIndex < 12; monthIndex += 1) {
      list.push(startOfDay(add(curentDateRef, monthIndex, 'month')));
    }
    return list;
  }, [curentDateRef]);

  const handleMonthSelected = (month: Date) => {
    navigate(
      `/router-calendar/${month.getFullYear()}/${month.getMonth() + 1}/${month.getDate()}`
    );
  };

  return (
    <section className="year-view">
      <article>
        <p>Display 12 months</p>
      </article>
      <article className="toolbox">
        <div className="button-group">
          <MondayFirstButton
            onClick={() => setMondayFirst((old) => !old)}
            mondayFirst={mondayFirst}
          />
          <AnimateToggleButton
            onClick={() => setAnimate((old) => !old)}
            animate={animate}
          />
          <WorkingWeekLength value={workingWeek} onChange={setWorkingWeek} />
          <HolidaySelector value={holidaysSelection} onChange={changeHoliday} />
        </div>
        <DateSelected selection={selection} />
      </article>
      <article className="widgets">
        <div className="year-header">
          <span className="year">{months[0].getFullYear()}</span>

          <div className="navigation">
            <button
              title="Previous year"
              className="GDCalendar_PrevMonth-btn"
              onClick={prevYear}
            >
              <IconUp />
            </button>
            <button
              className="today"
              onClick={setCurrentYear}
              disabled={curentDateRef.getFullYear() === jan.getFullYear()}
            >
              Today
            </button>
            <button
              title="Next year"
              className="GDCalendar_NextMonth-btn"
              onClick={nextYear}
            >
              <IconDown />
            </button>
          </div>
        </div>
        <div className="year-layout">
          <GDCalendarSelectionProvider
            selection={selection}
            onDateSelected={handleRangeSelection}
          >
            {months.map((month) => {
              return (
                <MonthOnlyCalendar
                  date={month}
                  key={month.toISOString()}
                  onMonthSelected={handleMonthSelected}
                  animate={animateConfig}
                  workingWeek={workingWeek}
                  mondayFirst={mondayFirst}
                  holidayCallback={handleHolidayCheck}
                />
              );
            })}
          </GDCalendarSelectionProvider>
        </div>
      </article>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </section>
  );
};

export default YearView;

const MonthOnlyCalendar: FC<
  IProps & {
    onMonthSelected?: (month: Date) => void;
  }
> = ({
  onDateChanged,
  date,
  yearSpan = 100,
  formatMonthDays = 'short',
  formatWeekDays = 'narrow',
  className,
  mondayFirst,
  locale,
  onMonthSelected,
  workingWeek = 7,
  animate,
  holidayCallback,
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
      workingWeek={workingWeek}
      holidayCallback={holidayCallback}
    >
      <div
        className={classNames(
          'GDCalendar',
          `week-length-${workingWeek}`,
          className
        )}
      >
        {/* Header */}
        <div className="GDCalendar_Header">
          {/* left */}
          <div className="GDCalendar_Header_leftSlot">
            <GDCurrentMonthConnected
              hideYear
              onClick={date && onMonthSelected && (() => onMonthSelected(date))}
            />
          </div>
          {/* middle */}
          <div className="GDCalendar_Header_middleSlot"></div>
          {/* right */}
          <div className="GDCalendar_Header_rightSlot"></div>
        </div>
        {/* View */}
        <div className="GDCalendar_View">
          <GDCalendarWeekRowConnected />
          <GDCalendarMonthGridConnected animate={animate} />
        </div>
        {/* Footer */}
      </div>
    </GDCalendarProvider>
  );
};
