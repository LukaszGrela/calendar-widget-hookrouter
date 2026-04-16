import React, { useState, useRef, type ReactNode } from 'react';
import GDCalendar from '../components/GDCalendar/GDCalendar';
import { Link } from 'react-router-dom';

const TSCalendar: React.FC = (): ReactNode => {
  const gdCalendar = useRef<GDCalendar>(null);
  const [date, setDate] = useState<Date>();
  const calendarDayClicked = (date: Date | undefined): void => {
    console.log('TSCalendar.calendarDayClicked', date);
    setDate(date);
  };

  return (
    <section className="ts-calendar">
      <article>
        <p>TypeScript React Calendar Widget</p>
      </article>
      <article className="toolbox">
        <p>
          <span>Selected:</span>
          <span>{date ? date.toLocaleDateString() : 'not selected'}</span>
        </p>

        <button
          className="btn today"
          onClick={() => {
            if (gdCalendar.current) {
              gdCalendar.current.selectDate(new Date());
            }
          }}
        >
          Select Today
        </button>
        <button
          className="btn current-month"
          onClick={() => {
            if (gdCalendar.current) {
              gdCalendar.current.displayMonth(new Date());
            }
          }}
        >
          Show current month
        </button>
      </article>
      <article className="widgets">
        <GDCalendar
          ref={gdCalendar}
          date={date}
          onDateChanged={calendarDayClicked}
        />
      </article>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </section>
  );
};

export default TSCalendar;
