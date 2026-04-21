import './GDCalendarHeader.scss';
import type { FC } from 'react';
import { GDYearSelector } from '../GDYearSelector';
import { GDMonthSelector } from '../GDMonthSelector';
import { GDCurrentMonth } from '../GDCurrentMonth';
import { GDMonthNavigation } from '../GDMonthNavigation';

export const GDCalendarHeader: FC = () => {
  return (
    <div className="GDCalendar_Header">
      {/* left */}
      <div className="GDCalendar_Header_leftSlot">
        <GDMonthSelector />
        <GDYearSelector />
      </div>
      {/* middle */}
      <div className="GDCalendar_Header_middleSlot">
        <GDCurrentMonth />
      </div>
      {/* right */}
      <div className="GDCalendar_Header_rightSlot">
        <GDMonthNavigation />
      </div>
    </div>
  );
};
