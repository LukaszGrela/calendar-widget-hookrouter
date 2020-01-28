import React, { useState, useRef } from 'react';
import { A } from 'hookrouter';
import GDCalendar from '../components/GDCalendar/GDCalendar';

export interface IProps {}
const TSCalendar: React.FC<IProps> = (props: IProps): JSX.Element => {
  const gdCalendar = useRef<GDCalendar>(null);
  const [date, setDate] = useState<Date>();
  const calendarDayClicked = (date: Date | undefined): void => {
    console.log('TSCalendar.calendarDayClicked', date);
    setDate(date);
  };

  return (
    <section>
      <article>
        <p>TypeScript React Calendar Widget</p>
      </article>
      <article className="widgets">
        <p>
          <span>Selected:</span>
          <span>{date?.toLocaleDateString()}</span>
        </p>
        <button
          onClick={() => {
            if (gdCalendar.current) {
              gdCalendar.current.selectDate(new Date());
            }
          }}
        >
          Select Today
        </button>
        <button
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
        <A href="/">Home</A>
      </nav>
    </section>
  );
};

export default TSCalendar;
