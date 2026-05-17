import { useCallback, useState, type FC } from 'react';
import { Link } from 'react-router-dom';
import { getDateString } from '../../components/GDCalendar/utils';
import { type TRangeSelection } from '../../components/GDCalendar';
import { useImmer } from '../../utils/useImmer';
import { RangeDateSelect, SingleDateSelect } from './DateSelect';

const DateSelector: FC = () => {
  const [mondayFirst, setMondayFirst] = useState(true);

  const [singleDateSelection, setSingleSelection] = useState<Date | null>(null);
  const onSingleDateSelected = useCallback(
    (range?: Date | TRangeSelection | null) => {
      if (!range || range instanceof Date) {
        console.log('setSingleSelection', range);
        setSingleSelection(range ?? null);
      }
    },
    []
  );

  const [rangeDateSelection, setRangeDateSelection] = useImmer<TRangeSelection>(
    [null, null]
  );
  const onRangeDateSelected = useCallback(
    (range?: Date | TRangeSelection | null) => {
      // console.log('LinkedCalendar.handleRangeSelection', range);
      if (!(range instanceof Date)) {
        setRangeDateSelection((draft) => {
          draft[0] = range?.[0] ?? null;
          draft[1] = range?.[1] ?? null;
        });
      }
    },
    [setRangeDateSelection]
  );

  return (
    <section className="date-selector">
      <article>
        <p>Calendar widget used within the float-ui dropdown</p>
      </article>
      <article className="toolbox">
        <button onClick={() => setMondayFirst((old) => !old)}>
          {!mondayFirst ? 'Monday first' : 'Sunday first'}
        </button>
      </article>
      <article className="widgets">
        <div className="single-select">
          <p>Single select</p>
          <SingleDateSelect
            mondayFirst={mondayFirst}
            onDateSelected={onSingleDateSelected}
            selection={singleDateSelection}
          />
        </div>
        <div className="range-select">
          <p>Range select</p>
          <RangeDateSelect
            mondayFirst={mondayFirst}
            onDateSelected={onRangeDateSelected}
            selection={rangeDateSelection}
          />
        </div>
      </article>
      <nav>
        <Link to="/">Home</Link>
      </nav>
      <footer>
        <div className="credits">
          Dropdown implemented with{' '}
          <a
            href="https://floating-ui.com/docs/react"
            target="_blank"
            rel="noopener noreferrer"
          >
            @floating-ui
          </a>
        </div>
      </footer>
    </section>
  );
};

export default DateSelector;
