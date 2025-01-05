import { serverUrl } from "@/constants/env";
import { FetchCalendarAndDatesReq } from "@/types/calendar/req/FetchCalendarAndDatesReq";
import { ToggleCalendarDateReq } from "@/types/calendar/req/ToggleCalendarDateReq";
import { FetchCalendarAndDatesRes } from "@/types/calendar/res/FetchCalendarAndDatesRes";
import { ToggleCalendarDateRes } from "@/types/calendar/res/ToggleCalendarDateRes";

export class CalendarAPI {
  private constructor() {}

  /**
   * 選択されたカレンダーと、そのカレンダーに紐づく継続日付の一覧を取得する。
   */
  static async fetchCalendarAndDates(
    req: FetchCalendarAndDatesReq
  ): Promise<FetchCalendarAndDatesRes> {
    const res = await fetch(`${serverUrl}/calendars`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req),
    });
    console.log("res", res);
    return res.json();
  }

  /**
   * 選択されたカレンダーの継続日付を新規作成 or 削除する。(Toggle)
   *
   * - 成功した場合は、{ isCompleted: true } を返す。
   */
  static async toggleCalendarDate(
    req: ToggleCalendarDateReq
  ): Promise<ToggleCalendarDateRes> {
    const res = await fetch(`${serverUrl}/calendars/toggle`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req),
    });
    console.log("res", res);
    return res.json();
  }
}
