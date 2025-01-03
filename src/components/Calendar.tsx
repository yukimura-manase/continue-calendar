import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { Record } from '../types';

interface CalendarProps {
  records: Record[];
  activityId: string;
  onToggleDay: (date: Date) => void;
}

export function Calendar({ records, activityId, onToggleDay }: CalendarProps) {
  const today = new Date();
  const days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(today.getDate() - i);
    return date;
  }).reverse();

  const getRecord = (date: Date) => {
    return records.find(
      (r) =>
        r.activityId === activityId &&
        r.date.toDateString() === date.toDateString()
    );
  };

  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map((date) => {
        const record = getRecord(date);
        return (
          <button
            key={date.toISOString()}
            onClick={() => onToggleDay(date)}
            className={`aspect-square p-2 rounded-lg flex flex-col items-center justify-center ${
              record?.completed
                ? 'bg-green-100 hover:bg-green-200'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <span className="text-sm font-medium">
              {date.getDate()}
            </span>
            {record?.completed ? (
              <CheckCircle className="text-green-500" size={20} />
            ) : (
              <XCircle className="text-gray-400" size={20} />
            )}
          </button>
        );
      })}
    </div>
  );
}