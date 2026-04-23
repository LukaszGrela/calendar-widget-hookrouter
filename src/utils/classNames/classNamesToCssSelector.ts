/*
// benchmark x 6,087,535 ops/sec ±1.76% (97 runs sampled)
export const classNamesToCssSelector = (
  ...classes: (string | undefined | false)[]
): string | undefined => {
  const list = classes.filter(Boolean);
  if (list.length > 0) {
    return `.${list.join('.')}`;
  }

  return undefined;
};
*/
// benchmark x 12,906,595 ops/sec ±1.40% (99 runs sampled)
/**
 * Function to construct class selector string from class names conditionally.
 * @param classes
 * @returns
 */
export const classNamesToCssSelector = (
  ...classes: (string | undefined | false)[]
): string | undefined => {
  if (classes.length === 0) return undefined;

  let out = '';

  for (let i = 0; i < classes.length; i++) {
    const c = classes[i];
    // eslint-disable-next-line no-extra-boolean-cast
    if (Boolean(c)) {
      if (i > 0) {
        out += '.';
      }
      out += c;
    }
  }

  return out.length > 0 ? '.' + out : undefined;
};
