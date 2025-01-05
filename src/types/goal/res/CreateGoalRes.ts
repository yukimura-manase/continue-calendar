import { CalendarRes } from "@/types/calendar/calendar";
import { GoalRes } from "./GoalRes";

export interface CreateGoalRes {
  goal: GoalRes;
  calendar: CalendarRes;
}
