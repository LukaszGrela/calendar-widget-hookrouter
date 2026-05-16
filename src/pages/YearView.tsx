import { useCallback, useMemo, useState, type FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  add,
  getDateString,
  startOfDay,
  subtract,
} from '../components/GDCalendar/utils';
import type { IProps, TRangeSelection } from '../components/GDCalendar/types';
import { GDCalendarProvider } from '../components/GDCalendar/context/GDCalendarProvider';
import { GDCurrentMonth } from '../components/GDCalendar/GDCurrentMonth';
import { GDCalendarWeekRow } from '../components/GDCalendar/GDCalendarWeekRow';
import { GDCalendarGrid } from '../components/GDCalendar/GDCalendarGrid';
import SVGIcon from '../components/GDCalendar/SVGIcon';

import { useImmer } from '../utils/useImmer';
import { GDCalendarSelectionProvider } from '../components/GDCalendar/context/GDCalendarSelectionProvider';

const jan = startOfDay(new Date());
jan.setDate(1);
jan.setMonth(0);

const YearView: FC = () => {
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
        <span className="year">{months[0].getFullYear()}</span>

        <div>
          <span>Selected:</span>
          <span>{getDateString(selection)}</span>
        </div>

        <div className="navigation">
          <button
            title="Previous year"
            className="GDCalendar_PrevMonth-btn"
            onClick={prevYear}
          >
            <SVGIcon icon="up-arrow" viewBox="0 8 48 48" />
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
            <SVGIcon icon="down-arrow" viewBox="16 8 48 48" />
          </button>
        </div>
      </article>
      <article className="widgets">
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
  selection,
  onDateSelected,
  mondayFirst,
  locale,
  onMonthSelected,
}) => {
  return (
    <GDCalendarProvider
      yearSpan={yearSpan}
      date={date}
      onDateChanged={onDateChanged}
      formatMonthDays={formatMonthDays}
      formatWeekDays={formatWeekDays}
      selection={selection}
      onDateSelected={onDateSelected}
      mondayFirst={mondayFirst}
      locale={locale}
    >
      <div className={`GDCalendar ${className ? className : ''}`}>
        {/* Header */}
        <div className="GDCalendar_Header">
          {/* left */}
          <div className="GDCalendar_Header_leftSlot">
            <GDCurrentMonth
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
          <GDCalendarWeekRow />
          <GDCalendarGrid />
        </div>
        {/* Footer */}
      </div>
    </GDCalendarProvider>
  );
};
