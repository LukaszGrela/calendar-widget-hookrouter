import React from 'react';

const showIcon = (icon: string): JSX.Element => {
  switch (icon) {
    case 'i':
      return (
        <path d="M37,16.8V6.5h-10v10.3C27.1,16.8,37,16.8,37,16.8z M37,57.5V26.9h-10v30.4h10V57.5z" />
      );
    case 'info':
      return (
        <path
          d="M15,15c4.7-4.7,10.4-7.1,17-7.1s12.3,2.3,17,7.1s7.1,10.4,7.1,17S53.8,44.3,49,49s-10.4,7.1-17,7.1
          S19.7,53.8,15,49S7.9,38.6,7.9,32S10.2,19.7,15,15z M34.4,24.8v-4.9h-4.7v4.9C29.7,24.8,34.4,24.8,34.4,24.8z M34.4,44.1V29.6h-4.7
          V44L34.4,44.1L34.4,44.1z"
        />
      );
    case 'home':
      return <path d="M26,57.5H11v-24H2l30-27l30,27h-9v24H38v-18H26V57.5z" />;
    case 'edit':
      return (
        <path
          d="M10.5,44.5l26.4-26.4l9,9L19.5,53.5h-9V44.5z M52.8,20.1l-4.4,4.4l-9-9l4.4-4.4c0.4-0.4,1-0.7,1.7-0.7
    c0.7,0,1.2,0.2,1.7,0.7l5.6,5.6c0.4,0.4,0.7,1,0.7,1.7C53.5,19.1,53.3,19.7,52.8,20.1z"
        />
      );
    case 'add':
      return (
        <path d="M48.7,34.4H34.4v14.3h-4.7V34.4H15.3v-4.7h14.3V15.3h4.7v14.3h14.3V34.4z" />
      );
    case 'subtract':
      return <path d="M15.3,34.4v-4.8h33.3v4.8H15.3z" />;
    case 'tick':
      return (
        <path d="M24.3,41.4L49.6,16l3.4,3.4L24.3,48L11,34.7l3.2-3.4L24.3,41.4z" />
      );
    case 'cancel':
      return (
        <path
          d="M48.7,18.7L35.4,32l13.3,13.3l-3.4,3.4L32,35.4L18.7,48.7l-3.4-3.4L28.6,32L15.3,18.7l3.4-3.4L32,28.6
    l13.3-13.3L48.7,18.7z"
        />
      );

    case 'back':
      return (
        <path d="M51.2,29.6v4.7H22l13.3,13.4L32,51.2L12.8,32L32,12.8l3.4,3.4L22,29.6H51.2z" />
      );

    case 'calendar':
      return (
        <path
          d="M42.625,5.313H48v5.375h2.625c1.416,0,2.666,0.543,3.75,1.625C55.457,13.396,56,14.646,56,16.063v37.25
        c0,1.418-0.543,2.668-1.625,3.75c-1.084,1.084-2.334,1.625-3.75,1.625h-37.25c-1.5,0-2.771-0.541-3.813-1.625
        C8.52,55.98,8,54.73,8,53.313v-37.25c0-1.416,0.52-2.666,1.563-3.75c1.041-1.082,2.313-1.625,3.813-1.625H16V5.313h5.375v5.375
        h21.25V5.313z M50.625,53.313v-29.25h-37.25v29.25H50.625z M45.375,34.688v13.375H32V34.688H45.375z"
        />
      );
    case 'delete':
      return (
        <path
          d="M40.4,12.8h8.3v4.8H15.3v-4.8h8.3l2.5-2.4h11.9L40.4,12.8z M17.7,48.7V20h28.7v28.7c0,1.3-0.5,2.4-1.5,3.4
    c-1,1-2.1,1.5-3.4,1.5h-19c-1.3,0-2.4-0.5-3.4-1.5C18.1,51.1,17.7,50,17.7,48.7z M23.5,31.7l5.2,5.2l-5,5l3.4,3.4l5-5l5,5l3.4-3.4
    l-5-5l5-5.2L37,28.3l-5,5.2l-5-5.2L23.5,31.7z"
        />
      );
    case 'details':
      return (
        <path
          d="M14.125,17.5C19.457,13.834,25.416,12,32,12c6.582,0,12.541,1.834,17.875,5.5c5.332,3.668,9.166,8.5,11.5,14.5
        c-2.334,6-6.168,10.834-11.5,14.5C44.541,50.168,38.582,52,32,52c-6.584,0-12.543-1.832-17.875-5.5
        C8.791,42.834,4.957,38,2.625,32C4.957,26,8.791,21.168,14.125,17.5z M22.563,41.438c2.625,2.625,5.77,3.938,9.438,3.938
        c3.666,0,6.813-1.313,9.438-3.938s3.938-5.77,3.938-9.438c0-3.666-1.313-6.813-3.938-9.438S35.666,18.625,32,18.625
        c-3.668,0-6.813,1.313-9.438,3.938S18.625,28.334,18.625,32C18.625,35.668,19.938,38.813,22.563,41.438z M26.375,26.375
        C27.957,24.793,29.832,24,32,24c2.166,0,4.041,0.793,5.625,2.375C39.207,27.959,40,29.834,40,32c0,2.168-0.793,4.043-2.375,5.625
        C36.041,39.209,34.166,40,32,40c-2.168,0-4.043-0.791-5.625-2.375C24.791,36.043,24,34.168,24,32
        C24,29.834,24.791,27.959,26.375,26.375z"
        />
      );
    case 'up-arrow':
      return (
        <path d="M21,40.9l-3.4-3.4L32,23.1l14.3,14.3L43,40.9l-11-11L21,40.9z" />
      );
    case 'down-arrow':
      return (
        <path d="M21,23.1l11,11l11-11l3.4,3.4L32,40.9L17.7,26.5L21,23.1z" />
      );
    case 'left-arrow':
      return (
        <path d="M40.9,21l-11,11l11,11l-3.4,3.4L23.1,32l14.3-14.3L40.9,21z" />
      );
    case 'right-arrow':
      return (
        <path d="M26.5,17.7L40.9,32L26.5,46.3L23.1,43l11-11l-11-11L26.5,17.7z" />
      );
    case 'warning':
      return (
        <path d="M5.7,49.7L32,4.3l26.3,45.4H5.7z M34.4,33v-9.6h-4.7V33H34.4z M34.4,42.5v-4.8h-4.7v4.8H34.4z" />
      );

    case 'time':
      return (
        <path
          d="M13.188,13.188C18.395,7.98,24.666,5.375,32,5.375c7.332,0,13.604,2.605,18.813,7.813
			c5.207,5.209,7.813,11.48,7.813,18.813c0,7.334-2.605,13.605-7.813,18.813c-5.209,5.209-11.48,7.813-18.813,7.813
			c-7.334,0-13.605-2.604-18.813-7.813C7.979,45.605,5.375,39.334,5.375,32C5.375,24.668,7.979,18.396,13.188,13.188z
			 M16.938,47.063c4.207,4.209,9.229,6.313,15.063,6.313c5.832,0,10.854-2.104,15.063-6.313c4.207-4.207,6.313-9.229,6.313-15.063
			c0-5.832-2.105-10.854-6.313-15.063c-4.209-4.207-9.23-6.313-15.063-6.313c-5.834,0-10.855,2.105-15.063,6.313
			c-4.209,4.209-6.313,9.23-6.313,15.063C10.625,37.834,12.729,42.855,16.938,47.063z M33.375,18.625v14l12,7.125l-2,3.375l-14-8.5
			v-16H33.375z"
        />
      );
    case 'help':
      return (
        <path
          d="M15.1,15.1c4.7-4.7,10.3-7,16.9-7c6.6,0,12.2,2.3,16.9,7c4.7,4.7,7,10.3,7,16.9c0,6.6-2.3,12.2-7,16.9
          c-4.7,4.7-10.3,7-16.9,7c-6.6,0-12.2-2.3-16.9-7c-4.7-4.7-7-10.3-7-16.9C8.1,25.4,10.5,19.8,15.1,15.1z M18.5,45.5
        c3.8,3.8,8.3,5.7,13.5,5.7c5.2,0,9.7-1.9,13.5-5.7c3.8-3.8,5.7-8.3,5.7-13.5c0-5.2-1.9-9.7-5.7-13.5c-3.8-3.8-8.3-5.7-13.5-5.7
        c-5.2,0-9.7,1.9-13.5,5.7c-3.8,3.8-5.7,8.3-5.7,13.5C12.8,37.2,14.7,41.7,18.5,45.5z M25.3,20.5c1.9-1.9,4.1-2.8,6.7-2.8
        c2.6,0,4.9,0.9,6.7,2.8c1.9,1.9,2.8,4.1,2.8,6.7c0,2-1.2,4.1-3.6,6.2c-2.4,2.1-3.6,4.1-3.6,5.8h-4.7c0-1.7,0.4-3.2,1.1-4.4
        c0.7-1.2,1.6-2.1,2.5-2.7s1.7-1.3,2.5-2.1c0.7-0.8,1.1-1.8,1.1-2.8c0-1.3-0.5-2.4-1.5-3.3c-1-0.9-2.1-1.4-3.4-1.4
        c-1.3,0-2.4,0.5-3.4,1.4c-1,0.9-1.5,2-1.5,3.3h-4.7C22.5,24.6,23.4,22.3,25.3,20.5z M29.6,46.3v-4.8h4.7v4.8H29.6z"
        />
      );

    default:
      return (
        <path
          d="M15.1,15.1c4.7-4.7,10.3-7,16.9-7c6.6,0,12.2,2.3,16.9,7c4.7,4.7,7,10.3,7,16.9c0,6.6-2.3,12.2-7,16.9
          c-4.7,4.7-10.3,7-16.9,7c-6.6,0-12.2-2.3-16.9-7c-4.7-4.7-7-10.3-7-16.9C8.1,25.4,10.5,19.8,15.1,15.1z M32,51.2
          c4.5,0,8.4-1.3,11.8-4L16.9,20.2c-2.7,3.4-4,7.3-4,11.8c0,5.2,1.9,9.7,5.7,13.5C22.3,49.3,26.8,51.2,32,51.2z M47.1,43.8
          c2.7-3.4,4-7.3,4-11.8c0-5.2-1.9-9.7-5.7-13.5c-3.8-3.8-8.3-5.7-13.5-5.7c-4.5,0-8.4,1.3-11.8,4L47.1,43.8z"
        />
      );
  }
};

export type TIconType =
  | 'add'
  | 'back'
  | 'calendar'
  | 'cancel'
  | 'delete'
  | 'details'
  | 'down-arrow'
  | 'edit'
  | 'help'
  | 'home'
  | 'i'
  | 'info'
  | 'left-arrow'
  | 'right-arrow'
  | 'subtract'
  | 'tick'
  | 'time'
  | 'warning';

interface IProps {
  icon: TIconType;
  iconColour?: string;
  title?: string;
  className?: string;
}

const SVGIcon: React.FC<IProps> = ({
  icon,
  iconColour,
  title,
  className,
}: IProps): JSX.Element => (
  <svg
    role="img"
    className={`SVGIcon${iconColour ? ` ${iconColour}` : ''}${
      className ? ` ${className}` : ''
    }`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
  >
    {title && <title>{title}</title>}
    {showIcon(icon)}
  </svg>
);

export default SVGIcon;
