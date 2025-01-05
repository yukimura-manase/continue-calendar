import { useState, useCallback, useEffect } from "react";
import {
  CalendarDate,
  CalendarDay,
  CalendarState,
} from "@/types/calendar/calendar";
import { CalendarAPI } from "@/apis/calendarAPI";
import { FetchCalendarAndDatesRes } from "@/types/calendar/res/FetchCalendarAndDatesRes";

interface UseHabitCalendarProps {
  userId: string | null;
  goalId: string | null;
  calendarId: string | null;
  calendarAndDates: FetchCalendarAndDatesRes | null;
  fetchCalendarAndDates: (userId: string, goalId: string) => Promise<void>;
}

export function useHabitCalendar({
  userId,
  goalId,
  calendarId,
  calendarAndDates,
  fetchCalendarAndDates,
}: UseHabitCalendarProps) {
  const [calendarState, setCalendarState] = useState<CalendarState>(() => {
    const today = new Date();
    const days = generateCalendarDays(today);
    return {
      days,
      currentDate: today,
    };
  });

  /**
   * 更新対象の日付を発見する
   */
  const searchUpdateDays = useCallback(
    (calendarAndDates: FetchCalendarAndDatesRes): CalendarDay[] => {
      // カレンダーの継続日付Listを取得する。
      const continueDates: CalendarDate[] = calendarAndDates.continueDates;

      // ここでstate.daysのisCompletedを更新する。
      // continueDates.date と state.days.date が一致する場合、isCompletedをtrueにする。
      const updatedDays: CalendarDay[] = calendarState.days.map((day) => {
        const isCompleted = continueDates.some(
          (date: CalendarDate) =>
            new Date(date.date).getTime() === new Date(day.date).getTime()
        );
        return {
          ...day,
          isCompleted,
        };
      });

      return updatedDays;
    },
    []
  );

  // カレンダーが変わったら、カレンダーの状態を更新する。
  useEffect(() => {
    console.log("calendarAndDates", calendarAndDates);
    if (!calendarAndDates) {
      return;
    }

    const updatedDays = searchUpdateDays(calendarAndDates);
    setCalendarState({
      days: updatedDays,
      currentDate: calendarState.currentDate,
    });
  }, [calendarAndDates]);

  /**
   * カレンダーの継続日付をToggleする。
   *
   * - CalendarAPI.toggleCalendarDate:
   *    - 選択されたカレンダーの継続日付を新規作成 or 削除する。(Toggle)
   */
  const toggleDay = useCallback(async (date: Date) => {
    // ユーザーIDとカレンダーIDがない場合は処理を終了
    if (!userId || !goalId || !calendarId) {
      return;
    }
    console.log("toggleDay", date);

    // 選択されたカレンダーの継続日付を新規作成 or 削除する。(Toggle)
    await CalendarAPI.toggleCalendarDate({
      userId,
      calendarId,
      date,
    });

    // カレンダーの状態を更新する。
    setCalendarState((prev) => ({
      ...prev,
      days: prev.days.map((day) =>
        day.date.getTime() === date.getTime()
          ? { ...day, isCompleted: !day.isCompleted }
          : day
      ),
    }));

    // カレンダーの状態を更新する。
    await fetchCalendarAndDates(userId, goalId);
  }, []);

  /**
   * 月の変更処理
   */
  const changeMonth = useCallback((increment: number) => {
    if (!calendarAndDates) {
      setCalendarState((prev) => {
        const newDate = new Date(prev.currentDate);
        newDate.setMonth(newDate.getMonth() + increment);
        return {
          days: generateCalendarDays(newDate),
          currentDate: newDate,
        };
      });
    } else {
      // カレンダーの状態を更新する。
      setCalendarState((prev) => {
        const newDate = new Date(prev.currentDate);
        newDate.setMonth(newDate.getMonth() + increment);

        // 次の月の日付を取得。
        const nextMonthDates: CalendarDay[] = generateCalendarDays(newDate);

        // カレンダーの継続日付を取得する。
        const continueDates: CalendarDate[] = calendarAndDates.continueDates;
        // console.log("continueDates", continueDates);
        // console.log("calendarState.days", calendarState.days);

        // ここでstate.daysのisCompletedを更新する。
        // continueDates.date と state.days.date が一致する場合、isCompletedをtrueにする。
        const updatedDays: CalendarDay[] = nextMonthDates.map((day) => {
          const isCompleted = continueDates.some(
            (date: CalendarDate) =>
              new Date(date.date).getTime() === new Date(day.date).getTime()
          );
          return {
            ...day,
            isCompleted,
          };
        });

        return {
          days: updatedDays,
          currentDate: newDate,
        };
      });

      // const updatedDays = searchUpdateDays(calendarAndDates);
      // setCalendarState({
      //   days: updatedDays,
      //   currentDate: calendarState.currentDate,
      // });
    }
  }, []);

  return {
    days: calendarState.days,
    currentDate: calendarState.currentDate,
    toggleDay,
    changeMonth,
  };
}

/**
 * カレンダーの日付を生成する
 *
 * - 月初から月末までの日付を生成する。
 * - 月初と月末の前後には前月と翌月の日付を生成する。
 */
function generateCalendarDays(date: Date): CalendarDay[] {
  const year = date.getFullYear();
  const month = date.getMonth();

  // 月初と月末を取得
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const days: CalendarDay[] = [];

  // 前月の日付を追加
  const firstDayOfWeek = firstDay.getDay();
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const prevDate = new Date(year, month, -i);
    days.push({
      date: prevDate,
      isCompleted: false,
    });
  }

  // 当月の日付を追加
  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push({
      date: new Date(year, month, i),
      isCompleted: false,
    });
  }

  // 翌月の日付を追加
  const remainingDays = 42 - days.length; // 6週間分のグリッドを確保
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      date: new Date(year, month + 1, i),
      isCompleted: false,
    });
  }

  return days;
}
