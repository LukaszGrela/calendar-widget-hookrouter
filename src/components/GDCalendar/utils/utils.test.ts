import { describe, expect, it } from 'vitest';
import { calendarDates, monthNames, weekDays } from '../utils';

describe('utils', () => {
  describe('weekDays', () => {
    it('returns English short week day names for en-US', () => {
      expect(weekDays('short', 'en-US')).toEqual([
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',
      ]);
    });
    it('returns Polish short week day names for PL, starting with monday', () => {
      expect(weekDays('short', 'pl', true)).toEqual([
        'pon.',
        'wt.',
        'śr.',
        'czw.',
        'pt.',
        'sob.',
        'niedz.',
      ]);
    });
  });
  describe('monthNames', () => {
    it('returns 12 localized month names for long format by default', () => {
      const months = monthNames('long');

      expect(months).toHaveLength(12);
      expect(
        months.every((month) => typeof month === 'string' && month.length > 0)
      ).toBe(true);
    });

    it('returns English short month names for en-US', () => {
      expect(monthNames('short', 'en-US')).toEqual([
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ]);
    });

    it('returns French long month names for fr-FR', () => {
      expect(monthNames('long', 'fr-FR')).toEqual([
        'janvier',
        'février',
        'mars',
        'avril',
        'mai',
        'juin',
        'juillet',
        'août',
        'septembre',
        'octobre',
        'novembre',
        'décembre',
      ]);
    });

    it('returns narrow month names in the expected order for en-US', () => {
      expect(monthNames('narrow', 'en-US')).toEqual([
        'J',
        'F',
        'M',
        'A',
        'M',
        'J',
        'J',
        'A',
        'S',
        'O',
        'N',
        'D',
      ]);
    });
  });

  describe('calendarDates', () => {
    it('returns month matrix of 6 weeks by 7 days', () => {
      expect(calendarDates(new Date()).flatMap((date) => date)).toHaveLength(
        6 * 7
      );
    });
    it('marks weekend correctly', () => {
      const monthData = calendarDates(new Date());
      expect(monthData.at(0)?.at(0)?.weekend).toBeTruthy();
      expect(monthData.at(0)?.at(6)?.weekend).toBeTruthy();

      // week starts at corract day
      const monthData2 = calendarDates(new Date(), true);
      expect(monthData2.at(0)?.at(5)?.weekend).toBeTruthy();
      expect(monthData2.at(0)?.at(6)?.weekend).toBeTruthy();
    });
    it('marks spill correctly', () => {
      const monthData = calendarDates(new Date());
      expect(monthData.at(0)?.at(0)?.spill).toBeTruthy();
      expect(monthData.at(1)?.at(6)?.spill).toBeFalsy();
      expect(monthData.at(5)?.at(6)?.spill).toBeTruthy();

      // week starts at corract day
      const monthData2 = calendarDates(new Date(), true);
      expect(monthData2.at(0)?.at(0)?.spill).toBeTruthy();
      expect(monthData2.at(1)?.at(6)?.spill).toBeFalsy();
      expect(monthData2.at(5)?.at(6)?.spill).toBeTruthy();
    });
    it('previous month is available in the first row', () => {
      // 0 day of the week
      const weekReferenceDateSunday = new Date(
        Date.UTC(2020, 10, 1, 0, 0, 0, 0)
      );

      const monthData = calendarDates(weekReferenceDateSunday);

      // previous month
      expect(monthData.at(0)?.at(0)?.date.getMonth()).toEqual(
        weekReferenceDateSunday.getMonth() - 1
      );
      // current month
      expect(monthData.at(1)?.at(0)?.date.getMonth()).toEqual(
        weekReferenceDateSunday.getMonth()
      );
      // next month
      expect(monthData.at(5)?.at(6)?.date.getMonth()).toEqual(
        weekReferenceDateSunday.getMonth() + 1
      );

      const weekReferenceDateMonday = new Date(
        Date.UTC(2025, 11, 1, 0, 0, 0, 0)
      );
      const monthData2 = calendarDates(weekReferenceDateMonday, true);
      // previous month
      expect(monthData2.at(0)?.at(0)?.date.getMonth()).toEqual(
        weekReferenceDateMonday.getMonth() - 1
      );
      // current month
      expect(monthData2.at(1)?.at(0)?.date.getMonth()).toEqual(
        weekReferenceDateMonday.getMonth()
      );
      // next month
      expect(monthData2.at(5)?.at(6)?.date.getMonth()).toEqual(0);
    });

    it('supports 6-day working week with mondayFirst', () => {
      const weekReferenceDate = new Date(Date.UTC(2020, 8, 1, 0, 0, 0, 0));
      const monthData = calendarDates(weekReferenceDate, true, 6);

      expect(monthData).toHaveLength(6);
      expect(monthData.flatMap((week) => week)).toHaveLength(42);
      expect(monthData[0]?.[0]?.date.getMonth()).toEqual(
        weekReferenceDate.getMonth() - 1
      );
      expect(monthData[1]?.[0]?.date.getMonth()).toEqual(
        weekReferenceDate.getMonth() - 1
      );
      expect(monthData[2]?.[0]?.date.getMonth()).toEqual(
        weekReferenceDate.getMonth()
      );
      expect(monthData[5]?.[6]?.date.getMonth()).toEqual(
        weekReferenceDate.getMonth() + 1
      );
    });

    it('supports 5-day working week with mondayFirst', () => {
      const weekReferenceDate = new Date(Date.UTC(2020, 8, 1, 0, 0, 0, 0));
      const monthData = calendarDates(weekReferenceDate, true, 5);

      expect(monthData).toHaveLength(6);
      expect(monthData.flatMap((week) => week)).toHaveLength(42);
      expect(monthData[0]?.[0]?.date.getMonth()).toEqual(
        weekReferenceDate.getMonth() - 1
      );
      expect(monthData[1]?.[0]?.date.getMonth()).toEqual(
        weekReferenceDate.getMonth() - 1
      );
      expect(monthData[2]?.[0]?.date.getMonth()).toEqual(
        weekReferenceDate.getMonth()
      );
      expect(monthData[5]?.[6]?.date.getMonth()).toEqual(
        weekReferenceDate.getMonth() + 1
      );
    });

    it('supports 7-day working week without mondayFirst for a Monday-start month', () => {
      // Sunday is last day of previous month
      const weekReferenceDate = new Date(Date.UTC(2021, 1, 1, 0, 0, 0, 0));
      const monthData = calendarDates(weekReferenceDate, false, 7);

      expect(monthData).toHaveLength(6);
      expect(monthData.flatMap((week) => week)).toHaveLength(42);

      // Sunday January
      expect(monthData[0]?.[0]?.date.getMonth()).toEqual(
        weekReferenceDate.getMonth() - 1
      );
      // Monday February
      expect(monthData[1]?.[0]?.date.getMonth()).toEqual(
        weekReferenceDate.getMonth()
      );
      expect(monthData[2]?.[0]?.date.getMonth()).toEqual(
        weekReferenceDate.getMonth()
      );
      expect(monthData[5]?.[6]?.date.getMonth()).toEqual(
        weekReferenceDate.getMonth() + 1
      );
    });

    it('supports 6-day working week without mondayFirst for a Monday-start month', () => {
      const weekReferenceDate = new Date(Date.UTC(2021, 1, 1, 0, 0, 0, 0));
      const monthData = calendarDates(weekReferenceDate, false, 6);

      expect(monthData).toHaveLength(6);
      expect(monthData.flatMap((week) => week)).toHaveLength(42);
      expect(monthData[0]?.[0]?.date.getMonth()).toEqual(
        weekReferenceDate.getMonth() - 1
      );
      expect(monthData[1]?.[0]?.date.getMonth()).toEqual(
        weekReferenceDate.getMonth() - 1
      );
      expect(monthData[2]?.[0]?.date.getMonth()).toEqual(
        weekReferenceDate.getMonth()
      );
      expect(monthData[5]?.[6]?.date.getMonth()).toEqual(
        weekReferenceDate.getMonth() + 1
      );
    });

    it('supports 5-day working week without mondayFirst for a Monday-start month', () => {
      const weekReferenceDate = new Date(Date.UTC(2021, 1, 1, 0, 0, 0, 0));
      const monthData = calendarDates(weekReferenceDate, false, 5);

      expect(monthData).toHaveLength(6);
      expect(monthData.flatMap((week) => week)).toHaveLength(42);
      expect(monthData[0]?.[0]?.date.getMonth()).toEqual(
        weekReferenceDate.getMonth() - 1
      );
      expect(monthData[1]?.[0]?.date.getMonth()).toEqual(
        weekReferenceDate.getMonth() - 1
      );
      expect(monthData[2]?.[0]?.date.getMonth()).toEqual(
        weekReferenceDate.getMonth()
      );
      expect(monthData[5]?.[6]?.date.getMonth()).toEqual(
        weekReferenceDate.getMonth() + 1
      );
    });
  });
});
