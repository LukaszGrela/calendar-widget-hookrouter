import React, { useState, type ReactNode } from 'react';
import GDClock from '../components/GDClock/GDClock';
import { Link } from 'react-router-dom';
// import { snapTo } from '../components/GDClock/utils';

type TSpnapToMinutes = 5 | 10 | 15 | 30 | undefined;

const TSClock: React.FC = (): ReactNode => {
  const [date, setDate] = useState<Date>();
  const [hours24, setHours24] = useState(false);
  const [snap, setSnap] = useState<TSpnapToMinutes>(undefined);

  return (
    <section className="ts-clock">
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
        <p className="options">
          <button
            className="btn hours-24"
            onClick={() => {
              setHours24(!hours24);
            }}
          >
            {`Set ${hours24 ? '12-hours' : '24-hours'}`}
          </button>
          <label className="snap-selector-label">
            Snap minutes:
            <select
              className="snap-selector"
              name="snap-selector"
              onChange={(e) => {
                console.log(e.target.value);
                if (e.target.value === 'none') {
                  setSnap(undefined);
                } else {
                  setSnap(parseInt(e.target.value, 10) as TSpnapToMinutes);
                }
              }}
              value={snap}
            >
              {['none', '5', '10', '15', '30'].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>
        </p>
      </article>
      <article className="widgets">
        <GDClock
          snapMinutes={snap}
          date={new Date()}
          hoursType={hours24 ? '24hours' : 'hours'}
          onDateChanged={(date?: Date): void => {
            setDate(date);
          }}
        />
      </article>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </section>
  );
};

export default TSClock;
