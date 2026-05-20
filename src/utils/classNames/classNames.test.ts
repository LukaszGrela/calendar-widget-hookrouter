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
          possibleBoolean && 'x',
          !possibleBoolean && 'b',
          possibleNumber && 'c',
          possibleNull && 'y',
          possibleUndefined && 'z'
        )
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
