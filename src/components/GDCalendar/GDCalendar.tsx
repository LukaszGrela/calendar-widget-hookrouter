import React, { useMemo, useState } from 'react';
import GDCalendarRow from './GDCalendarRow';
import GDCalendarMonthGrid from './GDCalendarMonthGrid';
import { noop, datesSame } from './utils';
import SVGIcon from './SVGIcon';
import './styles/index.scss';

export interface IProps {
  className?: string;
  weekdays: string[];
  // selected date
  date?: Date;
  // reference date for today
  todayDate?: Date;
  // display month reference date
  displayMonth?: Date;
  onDateChanged?: (date: Date | undefined) => void;
}

const GDCalendar: React.FC<IProps> = ({
  className,
  weekdays,
  date,
  onDateChanged = noop,
  displayMonth = new Date(),
  todayDate = new Date(),
}: IProps): JSX.Element => {
  const classNameMemo = useMemo((): string => {
    return `GDCalendar${className ? ` ${className}` : ''}`;
  }, [className]);

  const [currentMonth, setCurrentMonth] = useState(
    (date && new Date(date.getFullYear(), date.getMonth(), 1)) ||
      new Date(displayMonth.getFullYear(), displayMonth.getMonth(), 1)
  );

  const [selectedDate, setSelectedDate] = useState(date);

  const onDateClick = (date: string | Date): void => {
    if (date instanceof Date) {
      console.log('onDateClick', date);
      setSelectedDate(date);

      // inform about date change
      if (onDateChanged) {
        onDateChanged(selectedDate);
      }

      // auto-navigate when selected not-current month
      if (date && currentMonth) {
        if (!datesSame(date, currentMonth, 'month')) {
          console.log('onDateClick>setCurrentMonth', currentMonth);
          // change to selected month
          setCurrentMonth(new Date(date));
        }
      }
    }
  };

  const prevMonth = (): void => {
    const date = new Date(currentMonth);
    date.setDate(0); // will set to last day of previous month
    date.setDate(1); // set it to the first day of that month

    setCurrentMonth(date);
  };
  const nextMonth = (): void => {
    const date = new Date(currentMonth);
    date.setMonth(date.getMonth() + 1);

    setCurrentMonth(date);
  };

  return (
    <div className={classNameMemo}>
      <div className="GDCalendar_MonthPage">
        <div className="GDCalendar_Header">
          <button className="GDCalendar_PrevMonth-btn" onClick={prevMonth}>
            <SVGIcon icon="left-arrow" />
          </button>
          <span>
            {currentMonth.toLocaleDateString([], {
              month: 'long',
              year:
                currentMonth.getFullYear() !== todayDate.getFullYear()
                  ? 'numeric'
                  : undefined,
            })}
          </span>
          <button className="GDCalendar_NextMonth-btn" onClick={nextMonth}>
            <SVGIcon icon="right-arrow" />
          </button>
        </div>
        <div className="GDCalendar_View">
          <GDCalendarRow className="GDCalendar_WeekHeader" days={weekdays} />
          <GDCalendarMonthGrid
            date={selectedDate}
            monthDate={currentMonth}
            now={todayDate}
            onClick={onDateClick}
          />
        </div>
      </div>
    </div>
  );
};

export default GDCalendar;
