import moment from 'moment';
import { getYearList, noop } from '../../utils/helpers';
import type { FC } from 'react';

interface IProps {
  className?: string;
  year: number;
  month: number;
  monthChanged?: (month: string) => void;
  yearChanged?: (year: string) => void;
}

const CalendarYearMonthSelectors: FC<IProps> = (props) => {
  const {
    className,
    month,
    year,
    monthChanged = noop,
    yearChanged = noop,
  } = props;
  const monthList = moment.monthsShort();
  const selectedMonth = monthList[month];
  const yearList = getYearList(year, 50);
  return (
    <div className={`year-month-selectors ${className}`}>
      <select
        className="month-selector"
        name="month-selector"
        onChange={(e) => monthChanged(e.target.value)}
        value={selectedMonth}
      >
        {monthList.map((month, index) => (
          <option key={index} value={month}>
            {month}
          </option>
        ))}
      </select>
      <select
        className="year-selector"
        name="year-selector"
        onChange={(e) => yearChanged(e.target.value)}
        value={year}
      >
        {yearList.map((year, index) => (
          <option key={index} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CalendarYearMonthSelectors;
