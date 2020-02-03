import React, { ReactNode } from 'react';

export interface IProps {
  show: 'minutes' | 'hours' | '24hours';
  ticks: number[];
  angStep: number;
  center: number;
  radiusOuter: number;
  radiusInnerMarker: number;
  radiusInnerMarkerHour: number;
  radiusLabel: number;
  radiusLabelInner: number;
  className?: string;
  showMarkers?: boolean;
}

const GDClockBevelMarkers: React.FC<IProps> = ({
  show,
  ticks,
  angStep,
  center,
  radiusOuter,
  radiusInnerMarker,
  radiusInnerMarkerHour,
  radiusLabel,
  radiusLabelInner,
  className = 'GDClockBevelMarkers',
  showMarkers = true,
}: IProps): JSX.Element => {
  return (
    <>
      {showMarkers && (
        <g className={`${className}_bevel-markers`}>
          {ticks.map(
            (n): JSX.Element => {
              // rotate by 15 ticks
              const rad = angStep * (n - 15) * (Math.PI / 180);
              const sinRad = Math.sin(rad);
              const cosRad = Math.cos(rad);
              const isHour = n % 5 === 0;
              return (
                <line
                  key={n}
                  className={`${className}_bevel-marker marker-${n + 1}${
                    isHour ? ' marker-hour' : ''
                  }`}
                  strokeWidth={isHour ? 4 : 2}
                  stroke={n === 0 ? 'red' : 'black'}
                  x1={
                    center +
                    cosRad *
                      (isHour ? radiusInnerMarkerHour : radiusInnerMarker)
                  }
                  y1={
                    center +
                    sinRad *
                      (isHour ? radiusInnerMarkerHour : radiusInnerMarker)
                  }
                  x2={center + cosRad * radiusOuter}
                  y2={center + sinRad * radiusOuter}
                ></line>
              );
            }
          )}
        </g>
      )}
      {show === 'hours' && (
        <g className={`${className}_bevel-hours`}>
          {ticks.map(
            (n): ReactNode => {
              // rotate by 15 ticks (90 degrees)
              const rad = angStep * (n - 15) * (Math.PI / 180);
              const isHour = n % 5 === 0;
              const label = n === 0 ? 12 : n / 5;

              return isHour ? (
                <g
                  key={n}
                  transform={`translate(${center +
                    Math.cos(rad) * radiusLabel} ${center +
                    Math.sin(rad) * radiusLabel})`}
                  className={`${className}_bevel-hour hour-${label}`}
                >
                  <text
                    textLength="20"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    {label}
                  </text>
                </g>
              ) : (
                undefined
              );
            }
          )}
        </g>
      )}
      {show === '24hours' && (
        <g className={`${className}_bevel-hours-24`}>
          <g className={`${className}_bevel-hours-24-am`}>
            {ticks.map(
              (n): ReactNode => {
                // rotate by 15 ticks (90 degrees)
                const rad = angStep * (n - 15) * (Math.PI / 180);
                const isHour = n % 5 === 0;
                const label = n === 0 ? 0 : n / 5;

                return isHour ? (
                  <g
                    key={n}
                    transform={`translate(${center +
                      Math.cos(rad) * radiusLabel} ${center +
                      Math.sin(rad) * radiusLabel})`}
                    className={`${className}_bevel-hour-24-am hour-${label}`}
                  >
                    <text
                      textLength="20"
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      {label}
                    </text>
                  </g>
                ) : (
                  undefined
                );
              }
            )}
          </g>
          <g className={`${className}_bevel-hours-24-pm`}>
            {ticks.map(
              (i): ReactNode => {
                const n = i + 12 * 5;
                // rotate by 15 ticks (90 degrees)
                const rad = angStep * (n - 15) * (Math.PI / 180);
                const isHour = n % 5 === 0;
                const label = i === 0 ? 12 : n / 5;

                return isHour ? (
                  <g
                    key={n}
                    transform={`translate(${center +
                      Math.cos(rad) * radiusLabelInner} ${center +
                      Math.sin(rad) * radiusLabelInner})`}
                    className={`${className}_bevel-hour-24-pm hour-${label}`}
                  >
                    <text
                      textLength="20"
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      {label}
                    </text>
                  </g>
                ) : (
                  undefined
                );
              }
            )}
          </g>
        </g>
      )}
      {show === 'minutes' && (
        <g className={`${className}_bevel-minutes`}>
          {ticks.map(
            (n): ReactNode => {
              // rotate by 15 ticks (90 degrees)
              const rad = angStep * (n - 15) * (Math.PI / 180);
              const isHour = n % 5 === 0;
              const label = n;

              return isHour ? (
                <g
                  key={n}
                  transform={`translate(${center +
                    Math.cos(rad) * radiusLabel} ${center +
                    Math.sin(rad) * radiusLabel})`}
                  className={`${className}_bevel-minute minute-${label}`}
                >
                  <text
                    textLength="20"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    {label}
                  </text>
                </g>
              ) : (
                undefined
              );
            }
          )}
        </g>
      )}
    </>
  );
};

export default GDClockBevelMarkers;
