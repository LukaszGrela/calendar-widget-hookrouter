import { describe, expect, it } from 'vitest';
import { monthNames, weekDays } from '../utils';

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
});
