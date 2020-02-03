import React, {
  useMemo,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import GDClockBevelMarkers from './svg/GDClockBevelMarkers';
import {
  valueToString,
  angleToValue,
  snapTo,
  getMousePosition,
  closestEquivalentAngle,
} from './utils';
import GDClockInteractiveDial from './svg/GDClockInteractiveDial';

export type TTimeSelectorType = '24hours' | 'hours' | 'minutes';
export interface IProps {
  value: number;
  show?: TTimeSelectorType;
  interactive?: boolean;
  onChange?: (value: number, type: TTimeSelectorType, stopped: boolean) => void;
}
const GDClockCase: React.FC<IProps> = ({
  value,
  onChange,
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

  const [dragging, setDrag] = useState(false);
  const [draggedAngle, setDraggedAngle] = useState(
    value * (show === 'minutes' ? 6 : 30)
  );

  const onStartDrag = useCallback(
    (e: MouseEvent): void => {
      e.preventDefault();
      const circle: SVGCircleElement = e.target as SVGCircleElement;
      const matrix = circle.getScreenCTM();
      if (circle && matrix) {
        setDrag(true);
        console.log(
          'onStartDrag',
          dragging,
          getMousePosition(e.clientX, e.clientY, matrix)
        );
      }
    },
    [setDrag, dragging]
  );
  const onDrag = useCallback(
    (e: MouseEvent): void => {
      if (dragging) {
        e.preventDefault();
        const circle: SVGCircleElement = e.target as SVGCircleElement;
        const matrix = circle.getScreenCTM();
        if (circle && matrix) {
          const end = getMousePosition(e.clientX, e.clientY, matrix);
          const begin = details.center;
          const a = end.x - begin;
          const b = end.y - begin;
          const distance = Math.sqrt(a * a + b * b);
          const rad = Math.atan2(b, a) + Math.PI * 2.5;
          const angle = Math.round((rad * 180) / Math.PI);
          const angleStep = show === 'minutes' ? 6 : 30;

          const _draggedAngle = snapTo(angle, angleStep, true) % 360;

          setDraggedAngle(closestEquivalentAngle(draggedAngle, _draggedAngle));
        }
      }
    },
    [dragging, details, show, setDraggedAngle, draggedAngle]
  );
  const onStopDrag = useCallback(
    (e: MouseEvent): void => {
      e.preventDefault();
      if (dragging) {
        const circle: SVGCircleElement = e.target as SVGCircleElement;
        const matrix = circle.getScreenCTM();
        if (circle && matrix) {
          const end = getMousePosition(e.clientX, e.clientY, matrix);
          const begin = details.center;
          const a = end.x - begin;
          const b = end.y - begin;
          const distance = Math.sqrt(a * a + b * b);
          const rad = Math.atan2(b, a) + Math.PI * 2.5;
          const angle = Math.round((rad * 180) / Math.PI);
          const angleStep = show === 'minutes' ? 6 : 30;
          const _draggedAngle = snapTo(angle, angleStep, true) % 360;

          console.log(distance, angle, angleStep, _draggedAngle);

          setDraggedAngle(closestEquivalentAngle(draggedAngle, _draggedAngle));
          //
          if (onChange) {
            const type = show === 'minutes' ? show : 'hours';
            onChange(angleToValue(_draggedAngle, type), type, true);
          }
        }
      }
      setDrag(false);
    },
    [setDrag, dragging, details, show, setDraggedAngle, onChange, draggedAngle]
  );

  const selfRef = useRef<SVGCircleElement>(null);
  useEffect(() => {
    console.log('UseEffect.add');
    const ref = selfRef.current;
    if (interactive && ref) {
      // add mouse handlers
      ref.addEventListener('mousedown', onStartDrag);
      ref.addEventListener('mousemove', onDrag);
      ref.addEventListener('mouseup', onStopDrag);
      ref.addEventListener('mouseleave', onStopDrag);
    }
    return () => {
      console.log('UseEffect.clean');
      // remove mouse handlers
      if (ref) {
        ref.removeEventListener('mousedown', onStartDrag);
        ref.removeEventListener('mousemove', onDrag);
        ref.removeEventListener('mouseup', onStopDrag);
        ref.removeEventListener('mouseleave', onStopDrag);
      }
    };
  }, [interactive, selfRef, onStartDrag, onDrag, onStopDrag]);

  // useEffect(() => {
  //   if (interactive && onChange) {
  //     console.log('draggedAngle', draggedAngle);
  //     const _show: TTimeSelectorType =
  //       show === 'minutes' ? 'minutes' : 'hours';
  //     onChange(angleToValue(draggedAngle, _show), _show, false);
  //   }
  // }, [draggedAngle, show, onChange, interactive]);

  return (
    <svg
      className={`GDClockCase`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${size} ${size}`}
      width="100%"
      height="100%"
    >
      <circle
        ref={selfRef}
        className="GDClockCase_dial"
        cx={size / 2}
        cy={size / 2}
        r={size / 2}
        fill="#ffffff"
      ></circle>
      <GDClockInteractiveDial
        ticks={details.ticks}
        angStep={details.angStep}
        center={details.center}
        radiusOuter={details.radiusOuter}
        radiusInner={details.radiusLabelInner + 10}
        onClick={(n: number, inner: boolean): void => {
          if (interactive) {
            console.log('Clicked on', n, inner);
          }
        }}
      />
      <GDClockBevelMarkers
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
      <g
        className="GDClockCase_hand"
        style={{
          transformOrigin: details.center,
          transform: `rotate(${draggedAngle + 270}deg)`,
          ...(dragging ? { transition: 'none' } : {}),
        }}
      >
        <line
          className="GDClockCase_hand_line"
          stroke="red"
          strokeWidth="4"
          x1={details.center}
          y1={details.center}
          x2={details.center + details.radiusOuter}
          y2={details.center}
        ></line>
      </g>

      <g
        className="GDClockCase_hand_indicator"
        style={{
          transformOrigin: details.center,
          transform: `rotate(${draggedAngle + 270}deg)`,
          ...(dragging ? { transition: 'none' } : {}),
        }}
      >
        <g
          className="GDClockCase_hand_indicator_group"
          style={{
            transformOrigin: details.center + details.radiusLabel,
            transform: `rotate(${450 - draggedAngle}deg)`,
            ...(dragging ? { transition: 'none' } : {}),
          }}
        >
          <circle
            className="GDClockCase_hand_indicator_circle"
            cx={details.center + details.radiusLabel}
            cy={details.center}
            r="20"
            fill="red"
          ></circle>
          <text
            x={details.center + details.radiusLabel}
            y={details.center}
            className="GDClockCase_hand_indicator_label"
            textLength="20"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="red"
          >
            {valueToString(
              angleToValue(
                draggedAngle,
                show === 'minutes' ? 'minutes' : 'hours'
              )
            )}
          </text>
        </g>
      </g>
      <circle
        className="GDClockCase_center"
        cx={size / 2}
        cy={size / 2}
        r={5}
        fill="#000000"
      ></circle>
    </svg>
  );
};

export default GDClockCase;
