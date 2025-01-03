import { useState } from "react";
import { Record } from "../../../../types";
import { MonthYearSelector } from "./MonthYearSelector";
import { CalendarGrid } from "./CalendarGrid";

interface CalendarProps {
  records: Record[];
  activityId: string;
  onToggleDay: (date: Date) => void;
}

export function Calendar({ records, activityId, onToggleDay }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <div>
      <MonthYearSelector
        currentDate={currentDate}
        onMonthChange={setCurrentDate}
      />
      <CalendarGrid
        currentDate={currentDate}
        records={records}
        activityId={activityId}
        onToggleDay={onToggleDay}
      />
    </div>
  );
}
