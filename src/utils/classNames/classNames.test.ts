import { classNames } from './classNames';

describe('utils', () => {
  describe('classNames', () => {
    it('Returns class name string', () => {
      const possibleNull: string | null = null;
      const possibleUndefined: string | undefined = undefined;
      const possibleNumber: 1 | undefined = 1;
      const possibleBoolean: boolean | undefined = false;
      expect(
        classNames(
          'a',
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          possibleBoolean && 'x',
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          !possibleBoolean && 'b',
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          possibleNumber && 'c',
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          possibleNull && 'y',
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          possibleUndefined && 'z',
        ),
      ).toEqual('a b c');
      expect(classNames('a')).toEqual('a');
      expect(classNames('a', 'b')).toEqual('a b');
      expect(classNames(...['a', 'b'], 'c')).toEqual('a b c');
    });
    it('returns empty', () => {
      expect(classNames()).toBe('');
      expect(classNames('', false, null, undefined, 0)).toBe('');
    });
  });
});
