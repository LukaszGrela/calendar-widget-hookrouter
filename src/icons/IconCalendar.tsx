import { type FC, type SVGProps } from 'react';

const IconCalendar: FC<{ date?: string } & SVGProps<SVGSVGElement>> = ({
  date,
  ...props
}) => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    {/* outer frame */}
    <rect
      x="6"
      y="12"
      width="52"
      height="44"
      rx="6"
      fill="transparent"
      stroke="currentColor"
      strokeWidth="2"
    />

    {/* top bar */}
    <rect x="6" y="12" width="52" height="10" rx="3" fill="currentColor" />

    {/* hooks */}
    <rect x="16" y="6" width="6" height="12" rx="3" fill="currentColor" />
    <rect x="42" y="6" width="6" height="12" rx="3" fill="currentColor" />

    {/* date number */}
    <text
      x="32"
      y="40"
      textAnchor="middle"
      dominantBaseline="middle"
      fontFamily="Arial, Helvetica, sans-serif"
      fontSize="22"
      fontWeight="700"
      fill="currentColor"
    >
      {date ?? '31'}
    </text>
  </svg>
);

export default IconCalendar;
