/*
// benchmark x 6,513,843 ops/sec ±0.51% (99 runs sampled)
export const classNames = (
  ...classes: (string | undefined | false)[]
): string => classes.filter(Boolean).join(' ');
*/
// benchmark x 12,625,441 ops/sec ±0.54% (98 runs sampled)
/**
 * Function to construct className string conditionally.
 *
 * ```
 * <div className={classNames('MyComponent', isLoading && 'loading', isDisabled && 'disabled')}></div>
 * ```
 * @param classes list of arguments to combine into a className string
 * @returns combined string class name or empty string
 */
export const classNames = (
  ...classes: (string | undefined | null | false | number)[]
): string => {
  let out = '';
  for (let i = 0; i < classes.length; i++) {
    const c = classes[i];
    // eslint-disable-next-line no-extra-boolean-cast
    if (Boolean(c)) {
      if (i > 0) {
        out += ' ';
      }
      out += c;
    }
  }
  return out;
};
