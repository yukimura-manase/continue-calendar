/**
 * FE専用: カレンダーの日付
 */
export type CalendarDay = {
  date: Date; // 該当日付 (yyyy-mm-dd)
  isCompleted: boolean; // ON/OFF
};

/**
 * FE専用: カレンダーの状態
 */
export type CalendarState = {
  days: CalendarDay[];
  currentDate: Date;
};

/**
 * カレンダー Entity
 */
export interface CalendarRes {
  userId: string;
  createdAt: Date;
  goalId: string;
  calendarId: string;
  title: string;
}

/**
 * カレンダーの日付 Entity
 */
export interface CalendarDate {
  calendarDateId: string;
  calendarId: string;
  date: Date;
  createdAt: Date;
}
