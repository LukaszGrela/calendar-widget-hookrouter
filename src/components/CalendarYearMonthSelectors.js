import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { getYearList, noop } from '../utils/helpers';


const CalendarYearMonthSelectors = (props) => {
    const { className, month, year, monthChanged = noop, yearChanged = noop } = props;
    const monthList = moment.monthsShort();
    const selectedMonth = monthList[month];
    const yearList = getYearList(year, 50);
    return (
        <div className={`year-month-selectors ${className}`}>
            <select
                className='month-selector'
                name='month-selector'
                onChange={(e) => monthChanged(e.target.value)}
                value={selectedMonth}>
                {
                    monthList.map((month, index) => <option key={index} value={month}>{month}</option>)
                }
            </select>
            <select
                className='year-selector'
                name='year-selector'
                onChange={(e) => yearChanged(e.target.value)}
                value={year}>
                {
                    yearList.map((year, index) => <option key={index} value={year}>{year}</option>)
                }
            </select>
        </div>
    );
};
CalendarYearMonthSelectors.propTypes = {
    className: PropTypes.string,
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    monthChanged: PropTypes.func,
    yearChanged: PropTypes.func
};

export default CalendarYearMonthSelectors;