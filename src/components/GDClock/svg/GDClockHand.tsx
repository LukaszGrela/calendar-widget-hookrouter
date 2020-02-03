import React from 'react';

export interface IProps {
  angle: number;
  center: number;
  radiusOuter: number;
  radiusLabel: number;
  label: string;
}

const GDClockHand: React.FC<IProps> = ({
  center,
  radiusOuter,
  radiusLabel,
  angle,
  label,
}: IProps): JSX.Element => {
  return (
    <>
      <g
        className="GDClockHand"
        style={{
          transformOrigin: center,
          transform: `rotate(${angle + 270}deg)`,
        }}
      >
        <line
          className="GDClockHand_line"
          stroke="red"
          strokeWidth="4"
          x1={center}
          y1={center}
          x2={center + radiusOuter}
          y2={center}
        ></line>
      </g>

      <g
        className="GDClockHand_indicator"
        style={{
          transformOrigin: center,
          transform: `rotate(${angle + 270}deg)`,
        }}
      >
        <g
          className="GDClockHand_indicator_group"
          style={{
            transformOrigin: center + radiusLabel,
            transform: `rotate(${450 - angle}deg)`,
          }}
        >
          <circle
            className="GDClockHand_indicator_circle"
            cx={center + radiusLabel}
            cy={center}
            r="20"
            fill="red"
          ></circle>
          <text
            x={center + radiusLabel}
            y={center}
            className="GDClockHand_indicator_label"
            textLength="20"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="red"
          >
            {label}
          </text>
        </g>
      </g>
      <circle
        className="GDClockHand_center"
        cx={center}
        cy={center}
        r={5}
        fill="#000000"
      ></circle>
    </>
  );
};
export default GDClockHand;
