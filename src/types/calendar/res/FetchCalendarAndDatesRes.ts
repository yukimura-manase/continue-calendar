import { CalendarDate, CalendarRes } from "../calendar";

export interface FetchCalendarAndDatesRes {
  calendar: CalendarRes;
  continueDates: CalendarDate[]; // 継続している箇所の日付
}
