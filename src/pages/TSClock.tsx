import React, { useState } from 'react';
import { A } from 'hookrouter';
import GDClock from '../components/GDClock/GDClock';

export interface IProps {}
const TSClock: React.FC<IProps> = (props: IProps): JSX.Element => {
  const [date, setDate] = useState<Date>();
  const [hours24, setHours24] = useState(false);

  return (
    <section className="ts-calendar">
      <article>
        <p>TypeScript React Clock Widget</p>
      </article>
      <article className="toolbox">
        <p>
          <span>Selected:</span>
          <span>
            {date
              ? date.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : 'not selected'}
          </span>
        </p>

        <button
          className="btn hours-24"
          onClick={() => {
            setHours24(!hours24);
          }}
        >
          {`Set ${hours24 ? '12-hours' : '24-hours'}`}
        </button>
      </article>
      <article className="widgets">
        <GDClock
          date={new Date()}
          hoursType={hours24 ? '24hours' : 'hours'}
          onDateChanged={(date?: Date): void => {
            setDate(date);
          }}
        />
      </article>
      <nav>
        <A href="/">Home</A>
      </nav>
    </section>
  );
};

export default TSClock;
