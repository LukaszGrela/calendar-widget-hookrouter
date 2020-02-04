import React, { useMemo, useState, useEffect } from 'react';
import GDClockBevelMarkers from './svg/GDClockBevelMarkers';
import { valueToString, closestEquivalentAngle } from './utils';
import GDClockInteractiveDial from './svg/GDClockInteractiveDial';
import GDClockHand from './svg/GDClockHand';

export type TTimeSelectorType = '24hours' | 'hours' | 'minutes';
export interface IProps {
  value: number;
  show?: TTimeSelectorType;
  interactive?: boolean;
  snapMinutes?: 5 | 10 | 15 | 30;
  onChange?: (value: number, type: TTimeSelectorType) => void;
}
const GDClockCase: React.FC<IProps> = ({
  value,
  onChange,
  snapMinutes,
  show = 'hours',
  interactive = false,
}: IProps): JSX.Element => {
  // outer size
  const size = 256;
  // details
  const details = useMemo(() => {
    const ticks = Array.from(Array(60), (_, n): number => n);
    const angStep: number = 360 / ticks.length;
    const center: number = size / 2;
    const radiusOuter: number = size / 2;
    const radiusInnerMarker: number = size / 2 - 5;
    const radiusInnerMarkerHour: number = size / 2 - 8;
    const radiusLabel: number = radiusInnerMarkerHour - 13;
    const radiusLabelInner: number = radiusLabel - 23;
    return {
      ticks,
      angStep,
      center,
      radiusOuter,
      radiusInnerMarker,
      radiusInnerMarkerHour,
      radiusLabel,
      radiusLabelInner,
    };
  }, [size]);

  const [angle, setAngle] = useState(value * (show === 'minutes' ? 6 : 30));

  useEffect((): void => {
    setAngle(
      closestEquivalentAngle(angle, value * (show === 'minutes' ? 6 : 30))
    );
  }, [value, show, angle]);

  return (
    <svg
      className={`GDClockCase`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${size} ${size}`}
      width="100%"
      height="100%"
    >
      <GDClockInteractiveDial
        snapMinutes={snapMinutes}
        show={show}
        ticks={details.ticks}
        angStep={details.angStep}
        center={details.center}
        radiusOuter={details.radiusOuter}
        radiusInner={details.radiusLabelInner + 10}
        onClick={(n: number, inner: boolean): void => {
          if (interactive) {
            const newAngle = n * 6;
            setAngle(closestEquivalentAngle(angle, newAngle));
            switch (show) {
              case 'minutes':
                onChange && onChange(n, show);
                break;
              case 'hours':
                onChange && onChange(n / 5, show);
                break;
              case '24hours':
                onChange && onChange(n / 5 + (inner ? 12 : 0), show);
                break;
            }
          }
        }}
      />
      <GDClockBevelMarkers
        snapMinutes={snapMinutes}
        show={show}
        ticks={details.ticks}
        angStep={details.angStep}
        center={details.center}
        radiusOuter={details.radiusOuter}
        radiusInnerMarker={details.radiusInnerMarker}
        radiusInnerMarkerHour={details.radiusInnerMarkerHour}
        radiusLabel={details.radiusLabel}
        radiusLabelInner={details.radiusLabelInner}
        className="GDClockCase"
      />
      <GDClockHand
        angle={angle}
        center={details.center}
        radiusOuter={details.radiusOuter}
        radiusLabel={
          value >= 12 && show === '24hours'
            ? details.radiusLabelInner
            : details.radiusLabel
        }
        label={valueToString(value)}
      />
    </svg>
  );
};

export default GDClockCase;
