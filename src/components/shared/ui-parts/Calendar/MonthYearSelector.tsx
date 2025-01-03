import { ChevronLeft, ChevronRight } from "lucide-react";

interface MonthYearSelectorProps {
  currentDate: Date;
  onMonthChange: (date: Date) => void;
}

export function MonthYearSelector({
  currentDate,
  onMonthChange,
}: MonthYearSelectorProps) {
  const handlePreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() - 1);
    onMonthChange(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + 1);
    onMonthChange(newDate);
  };

  return (
    <div className="flex items-center justify-between mb-4">
      <button
        onClick={handlePreviousMonth}
        className="p-2 hover:bg-gray-100 rounded-full"
        aria-label="前月"
      >
        <ChevronLeft size={20} />
      </button>

      <h3 className="text-lg font-medium">
        {currentDate.getFullYear()}年 {currentDate.getMonth() + 1}月
      </h3>

      <button
        onClick={handleNextMonth}
        className="p-2 hover:bg-gray-100 rounded-full"
        aria-label="次月"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
