import {
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  Calendar as CalendarIcon,
} from "lucide-react";
import { Button } from "@/components/shared/ui-elements/button";
import { cn } from "@/libs/utils";
import { useHabitCalendar } from "@/components/pages/home/parts/HabitCalendar/hooks/useHabitCalendar";
import { useUserStates } from "@/stores/user";
import { useGoalStates } from "@/stores/goal";

/**
 * 継続カレンダー Component
 */
export const HabitCalendar = () => {
  const { user } = useUserStates();
  const userId = user?.userId ?? null;
  const {
    selectedGoalId,
    selectedCalendarId,
    calendarAndDates,
    fetchCalendarAndDates,
  } = useGoalStates();

  const { days, currentDate, toggleDay, changeMonth } = useHabitCalendar({
    userId,
    goalId: selectedGoalId,
    calendarId: selectedCalendarId,
    calendarAndDates,
    fetchCalendarAndDates,
  });
  // console.log("days", days);
  // console.log("currentDate", currentDate);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("ja-JP", {
      year: "numeric",
      month: "long",
    }).format(date);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2 items-center">
            <h2 className="text-2xl font-bold">カレンダー</h2>
            <CalendarIcon />
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => changeMonth(-1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-lg font-medium">
              {formatDate(currentDate)}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => changeMonth(1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* 曜日 */}
        <div className="grid grid-cols-7 gap-1 mb-1">
          {["日", "月", "火", "水", "木", "金", "土"].map((day) => (
            <div
              key={day}
              className="text-center text-sm font-medium text-muted-foreground p-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* 日付 */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            const isCurrentMonth =
              day.date.getMonth() === currentDate.getMonth();
            return (
              <button
                key={`day_btn_${index}`}
                onClick={() => toggleDay(day.date)}
                className={cn(
                  "aspect-square p-2 flex flex-col items-center justify-center rounded-lg transition-colors",
                  isCurrentMonth ? "bg-background" : "bg-muted/50",
                  day.isCompleted && "bg-green-100 dark:bg-green-900/20"
                )}
              >
                <span className="text-sm font-medium">
                  {day.date.getDate()}
                </span>
                <div className="mt-1">
                  {day.isCompleted ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <X className="h-4 w-4 text-muted-foreground/50" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
