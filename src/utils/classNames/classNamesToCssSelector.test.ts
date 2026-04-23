import { classNamesToCssSelector } from './classNamesToCssSelector';

describe('utils', () => {
  describe('classNames', () => {
    describe('classNamesToCssSelector', () => {
      it('Returns class name string', () => {
        expect(
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, no-constant-binary-expression
          classNamesToCssSelector('a', false && 'x', true && 'b', 1 && 'c'),
        ).toEqual('.a.b.c');
        expect(classNamesToCssSelector('a')).toEqual('.a');
        expect(classNamesToCssSelector('a', 'b')).toEqual('.a.b');
      });
      it('Returns undefined', () => {
        expect(classNamesToCssSelector()).toEqual(undefined);
        expect(
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, no-constant-binary-expression
          classNamesToCssSelector('', false && 'x'),
        ).toEqual(undefined);
      });
    });
  });
});
