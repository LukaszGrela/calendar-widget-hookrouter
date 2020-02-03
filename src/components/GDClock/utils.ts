export const valueToString = (value: number): string =>
  `${value <= 9 ? '0' : ''}${value}`;

export const angleToValue = (
  angle: number,
  type: 'minutes' | 'hours'
): number => {
  angle %= 360;
  if (angle < 0) {
    angle += 360;
  }

  const value = type === 'minutes' ? angle / 6 : angle / 30;

  return type !== 'minutes' && value === 0 ? 12 : value;
};

/**
 * <p>Snaps given value to the nearest defined value.</p>
 *
 * <p><b>author:</b> Lukasz 'Severiaan' Grela</p>
 * @param	value value to be "snapped"
 * @param	snapStep snap value
 * @param	p_bUseRound if false then snaping occures on full snapStep change not on half (true). i.e. when true then <code>snapTo(5, 10) = 10</code> when false it is still 0
 * @return
 * @author Lukasz 'Severiaan' Grela
 */
export const snapTo = (
  value: number,
  snapStep: number,
  p_bUseRound: boolean = true
): number => {
  if (isNaN(value)) return NaN;
  if (isNaN(snapStep)) return value;
  //
  var x: number = value;
  var diff: number;
  var step: number = snapStep;
  var mod: number = x % step;

  if (mod > step >> 1 && p_bUseRound) {
    diff = -(step - mod);
  } else {
    diff = mod;
  }
  return x - diff;
};

export const getMousePosition = (
  cx: number,
  cy: number,
  matrix: DOMMatrix
): { x: number; y: number } => {
  return {
    x: (cx - matrix.e) / matrix.a,
    y: (cy - matrix.f) / matrix.d,
  };
};
export const closestEquivalentAngle = (from: number, to: number): number => {
  var delta = ((((to - from) % 360) + 540) % 360) - 180;
  return from + delta;
};
