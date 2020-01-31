import React, { ReactNode, useMemo } from 'react';

export interface IProps {
  date: Date;
  show?: 'hours' | 'minutes' | 'none';
}
const GDClockCase: React.FC<IProps> = ({
  date,
  show = 'none',
}: IProps): JSX.Element => {
  // outer size
  const size = 256;
  // details
  const details = useMemo(() => {
    const ticks = Array.from(Array(60), (_, n): number => n);
    const angStep = 360 / ticks.length;
    const center = size / 2;
    const radiusOuter = size / 2;
    const radiusInner = size / 2 - 5;
    const radiusInnerHour = size / 2 - 8;
    return {
      ticks,
      angStep,
      center,
      radiusOuter,
      radiusInner,
      radiusInnerHour,
    };
  }, [size]);
  // create markers
  const bevelMarkers = useMemo((): JSX.Element => {
    const {
      ticks,
      angStep,
      center,
      radiusOuter,
      radiusInner,
      radiusInnerHour,
    } = details;
    return (
      <>
        <g className="bevel-markers">
          {ticks.map(
            (n): JSX.Element => {
              // rotate by 15 ticks
              const rad = angStep * (n - 15) * (Math.PI / 180);
              const isHour = n % 5 === 0;
              return (
                <line
                  key={n}
                  className={`bevel-marker marker-${n + 1}${
                    isHour ? ' marker-hour' : ''
                  }`}
                  strokeWidth={isHour ? 4 : 2}
                  stroke={n === 0 ? 'red' : 'black'}
                  x1={
                    center +
                    Math.cos(rad) * (isHour ? radiusInnerHour : radiusInner)
                  }
                  y1={
                    center +
                    Math.sin(rad) * (isHour ? radiusInnerHour : radiusInner)
                  }
                  x2={center + Math.cos(rad) * radiusOuter}
                  y2={center + Math.sin(rad) * radiusOuter}
                ></line>
              );
            }
          )}
        </g>
        {show === 'hours' && (
          <g className="bevel-hours">
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
                      Math.cos(rad) * (radiusInnerHour - 13)} ${center +
                      Math.sin(rad) * (radiusInnerHour - 13)})`}
                    className={`bevel-hour hour-${label}`}
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
        {show === 'minutes' && (
          <g className="bevel-minutes">
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
                      Math.cos(rad) * (radiusInnerHour - 13)} ${center +
                      Math.sin(rad) * (radiusInnerHour - 13)})`}
                    className={`bevel-minute minute-${label}`}
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
  }, [show, details]);

  const renderHand = (n: number = 0, label: string = ''): JSX.Element => {
    const {
      angStep,
      center,
      radiusOuter,
      radiusInner,
      radiusInnerHour,
    } = details;
    const rad = angStep * (n - 15) * (Math.PI / 180);
    const isHour = n % 5 === 0;
    return (
      <g className="GDClockCase_hand">
        <line
          stroke="red"
          strokeWidth="4"
          x1={center + Math.cos(rad)}
          y1={center + Math.sin(rad)}
          x2={center + Math.cos(rad) * radiusOuter}
          y2={center + Math.sin(rad) * radiusOuter}
        ></line>
        <g
         className="GDClockCase_hand_indicator"
          transform={`translate(${center +
            Math.cos(rad) * (radiusInnerHour - 13)} ${center +
            Math.sin(rad) * (radiusInnerHour - 13)})`}
        >
          <circle r="20" fill="red"></circle>
          <text
            textLength="20"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
          >
            {label}
          </text>
        </g>
      </g>
    );
  };

  return (
    <svg
      className={`GDClockCase`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${size} ${size}`}
      width="100%"
      height="100%"
    >
      <circle 
      className="GDClockCase_dial"
      cx={size / 2} cy={size / 2} r={size / 2} fill="#ffffff"></circle>
      {bevelMarkers}
      {renderHand(10, show === 'minutes' ? '7' : `${10 / 5}`)}
      <circle 
      className="GDClockCase_center"
      cx={size / 2} cy={size / 2} r={5} fill="#000000"></circle>
    </svg>
  );
};

export default GDClockCase;
