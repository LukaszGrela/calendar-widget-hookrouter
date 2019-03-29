export const noop = () => { };

export const getYearList = (start, around) => {
    let years = [];
    for (let i = start - around; i <= start + around; i++) {
        years.push(i);
    }
    return years;
}

import moment from 'moment';

export const calendarDates = (now) => {
    const monthLength = now.daysInMonth();
    const firstOfMonth = now.clone().date(1);
    const startsAt = firstOfMonth.day();
    let weeks = [
        [],
        [],
        [],
        [],
        [],
        []
    ];//6 weeks always to allow for 31days starting at last day of week
    let start = -startsAt;
    let week = 0;
    while (week < weeks.length) {
        let weekDay = 0;
        while (weekDay < 7) {
            weeks[week].push(firstOfMonth.clone().add(start, 'days'));
            start++;
            weekDay++;
        }
        week++;
    }
    return weeks;
}