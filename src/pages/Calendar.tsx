import React, { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { GDCalendar } from '../components/GDCalendar';
import { datesSame } from '../components/GDCalendar/utils';
import type { TRangeSelection } from '../components/GDCalendar/types';

const Calendar: React.FC = (): ReactNode => {
  const [date, setDate] = useState<Date | undefined>();
  const [mondayFirst, setMondayFirst] = useState(true);
  const onDateChanged = (changed: Date | undefined): void => {
    console.log('Calendar.onDateChanged', changed);
    // setDate(changed);
  };
  const calendarDayClicked = (clicked?: Date | TRangeSelection): void => {
    if (!clicked || clicked instanceof Date) {
      setDate((prevState) => {
        if (datesSame(prevState, clicked)) return undefined;
        return clicked;
      });
    }
  };

  return (
    <section className="ts-calendar">
      <article>
        <p>React Calendar</p>
      </article>
      <article className="toolbox">
        <button onClick={() => setMondayFirst((old) => !old)}>
          {!mondayFirst ? 'Monday first' : 'Sunday first'}
        </button>
        <div>
          <span>Selected:</span>
          <span>{date ? date.toLocaleDateString() : 'not selected'}</span>
        </div>
      </article>
      <article className="widgets">
        <GDCalendar
          onDateChanged={onDateChanged}
          onDateSelected={calendarDayClicked}
          selection={date}
          mondayFirst={mondayFirst}
        />
      </article>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </section>
  );
};

export default Calendar;
