import React from 'react';
import { snapTo } from '../utils';

export interface IProps {
  show: 'minutes' | 'hours' | '24hours';
  ticks: number[];
  angStep: number;
  center: number;
  radiusOuter: number;
  radiusInner: number;
  onClick: (n: number, inner: boolean) => void;
}
const GDClockInteractiveDial: React.FC<IProps> = ({
  show,
  ticks,
  angStep,
  center,
  radiusOuter,
  radiusInner,
  onClick,
}: IProps): JSX.Element => {
  return (
    <g className="GDClockInteractiveDial">
      {ticks.map(
        (n): JSX.Element => {
          // rotate by 15 ticks
          // half-less
          const radFrom = angStep * (n - 14.5) * (Math.PI / 180);
          // half-more
          const radTo = angStep * (n - 15.5) * (Math.PI / 180);
          const sinRadFrom = Math.sin(radFrom);
          const cosRadFrom = Math.cos(radFrom);
          const sinRadTo = Math.sin(radTo);
          const cosRadTo = Math.cos(radTo);
          return (
            <React.Fragment key={n}>
              <polygon
                onClick={(): void => {
                  if (show === 'minutes') {
                    onClick(n, false);
                  } else {
                    const snapped = snapTo(n, 5, true) % ticks.length;
                    onClick(snapped, false);
                  }
                }}
                key={n}
                points={`${center + cosRadTo * radiusInner},${center +
                  sinRadTo * radiusInner} ${center +
                  cosRadFrom * radiusInner},${center +
                  sinRadFrom * radiusInner} ${center +
                  cosRadFrom * radiusOuter},${center +
                  sinRadFrom * radiusOuter} ${center +
                  cosRadTo * radiusOuter},${center + sinRadTo * radiusOuter}`}
                fill={n % 2 ? 'red' : 'blue'}
                className={`GDClockInteractiveDial interactive-marker-${n + 1}`}
              />
              <polygon
                onClick={(): void => {
                  if (show === 'minutes') {
                    onClick(n, true);
                  } else {
                    const snapped = snapTo(n, 5, true) % ticks.length;
                    onClick(snapped, true);
                  }
                }}
                key={`${n}-inner`}
                points={`${center},${center} ${center +
                  cosRadFrom * radiusInner},${center +
                  sinRadFrom * radiusInner} ${center +
                  cosRadTo * radiusInner},${center + sinRadTo * radiusInner}`}
                fill={n % 2 ? 'blue' : 'red'}
                className={`GDClockInteractiveDial interactive-marker-inner-${n +
                  1}`}
              />
            </React.Fragment>
          );
        }
      )}
    </g>
  );
};

export default GDClockInteractiveDial;
