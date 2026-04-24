import React, { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { GDCalendar } from '../components/GDCalendar';
import { datesSame } from '../components/GDCalendar/utils';

const Calendar: React.FC = (): ReactNode => {
  const [date, setDate] = useState<Date | undefined>();
  const onDateChanged = (date: Date | undefined): void => {
    console.log('GDCalendar2.onDateChanged', date);
    // setDate(date);
  };
  const calendarDayClicked = (date: Date | undefined): void => {
    console.log('GDCalendar2.calendarDayClicked', date);
    setDate((prevState) => {
      if (datesSame(prevState, date)) return undefined;
      return date;
    });
  };

  return (
    <section className="ts-calendar">
      <article>
        <p>React Calendar</p>
      </article>
      <article className="toolbox">
        <p>
          <span>Selected:</span>
          <span>{date ? date.toLocaleDateString() : 'not selected'}</span>
        </p>
      </article>
      <article className="widgets">
        <GDCalendar
          onDateChanged={onDateChanged}
          onDateSelected={calendarDayClicked}
          selectedDate={date}
          mondayFirst
        />
      </article>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </section>
  );
};

export default Calendar;
