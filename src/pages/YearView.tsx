import { useMemo, type FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { add, startOfDay } from '../components/GDCalendar/utils';
import type { IProps } from '../components/GDCalendar/types';
import { GDCalendarProvider } from '../components/GDCalendar/context/GDCalendarProvider';
import { GDCurrentMonth } from '../components/GDCalendar/GDCurrentMonth';
import { GDCalendarWeekRow } from '../components/GDCalendar/GDCalendarWeekRow';
import { GDCalendarGrid } from '../components/GDCalendar/GDCalendarGrid';
import SVGIcon from '../components/GDCalendar/SVGIcon';

const YearView: FC = () => {
  const navigate = useNavigate();
  const months = useMemo(() => {
    const jan = startOfDay(new Date());
    jan.setDate(1);
    jan.setMonth(0);

    const list: Date[] = [];
    for (let monthIndex = 0; monthIndex < 12; monthIndex += 1) {
      list.push(startOfDay(add(jan, monthIndex, 'month')));
    }
    return list;
  }, []);

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
        <div className="navigation">
          <button
            title="Previous year"
            className="GDCalendar_PrevMonth-btn"
            // onClick={prevMonth}
          >
            <SVGIcon icon="up-arrow" viewBox="0 8 48 48" />
          </button>
          <button className="today">Today</button>
          <button
            title="Next year"
            className="GDCalendar_NextMonth-btn"
            // onClick={nextMonth}
          >
            <SVGIcon icon="down-arrow" viewBox="16 8 48 48" />
          </button>
        </div>
      </article>
      <article className="widgets">
        <div className="year-layout">
          {months.map((month) => {
            return (
              <MonthOnlyCalendar
                date={month}
                key={month.toISOString()}
                onMonthSelected={handleMonthSelected}
              />
            );
          })}
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
  date = new Date(),
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
              onClick={onMonthSelected && (() => onMonthSelected(date))}
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
