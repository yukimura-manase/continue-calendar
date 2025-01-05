import { CheckCircle, XCircle } from "lucide-react";
import { Record } from "../../../../types";
import {
  getDaysInMonth,
  getFirstDayOfMonth,
} from "../../../../utils/dateUtils";

interface CalendarGridProps {
  currentDate: Date;
  records: Record[];
  activityId: string;
  onToggleDay: (date: Date) => void;
}

export function CalendarGrid({
  currentDate,
  records,
  activityId,
  onToggleDay,
}: CalendarGridProps) {
  const firstDay = getFirstDayOfMonth(currentDate);
  const daysInMonth = getDaysInMonth(currentDate);
  const days = Array.from({ length: 42 }, (_, i) => {
    const day = i - firstDay + 1;
    if (day <= 0 || day > daysInMonth) return null;

    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    return date;
  });

  const weekDays = ["日", "月", "火", "水", "木", "金", "土"];

  const getRecord = (date: Date | null) => {
    if (!date) return null;
    return records.find(
      (r) =>
        r.activityId === activityId &&
        r.date.toDateString() === date.toDateString()
    );
  };

  return (
    <div>
      <div className="grid grid-cols-7 gap-2 mb-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-500"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days.map((date, index) => {
          if (!date) {
            return <div key={index} className="aspect-square" />;
          }

          const record = getRecord(date);
          const isToday = date.toDateString() === new Date().toDateString();

          return (
            <button
              key={date.toISOString()}
              onClick={() => onToggleDay(date)}
              className={`aspect-square p-2 rounded-lg flex flex-col items-center justify-center relative ${
                record?.completed
                  ? "bg-green-100 hover:bg-green-200"
                  : "bg-gray-100 hover:bg-gray-200"
              } ${isToday ? "ring-2 ring-blue-500" : ""}`}
            >
              <span className="text-sm font-medium">{date.getDate()}</span>
              {record?.completed ? (
                <CheckCircle className="text-green-500" size={20} />
              ) : (
                <XCircle className="text-gray-400" size={20} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
