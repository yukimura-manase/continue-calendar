import { CalendarAPI } from "@/apis/calendarAPI";
import { GoalApi } from "@/apis/goalAPI";
import { FetchCalendarAndDatesRes } from "@/types/calendar/res/FetchCalendarAndDatesRes";
import { CreateGoalRes } from "@/types/goal/res/CreateGoalRes";
import { GoalRes } from "@/types/goal/res/GoalRes";
import { create } from "zustand";

interface GoalStates {
  goalList: GoalRes[];
  calendarAndDates: FetchCalendarAndDatesRes | null;
  selectedGoalId: string | null; // 選択中のGoalId
  selectedCalendarId: string | null; // 選択中のカレンダー
}

interface GoalActions {
  fetchGoals: (userId: string) => Promise<void>;
  setGoalList: (goalList: GoalRes[]) => void;
  createGoal: (userId: string, title: string) => Promise<void>;
  addGoalList: (goal: GoalRes) => void;
  setSelectedGoalId: (selectedGoalId: string) => void;
  fetchCalendarAndDates: (userId: string, goalId: string) => Promise<void>;
}

/**
 * Userの状態管理
 */
export const useGoalStates = create<GoalStates & GoalActions>()((set) => ({
  // ------------------------- States -------------------------
  goalList: [],
  selectedGoalId: null,
  calendarAndDates: null,
  selectedCalendarId: null,

  // ------------------------- Actions -------------------------
  /** 継続目標のリストを取得する */
  fetchGoals: async (userId: string) => {
    try {
      const goalList = await GoalApi.fetchGoals(userId);
      set({
        goalList,
      });
    } catch (error) {
      console.error(error);
    }
  },
  setGoalList: (goalList: GoalRes[]) =>
    set({
      goalList,
    }),
  /** 継続目標を新規作成する。 */
  createGoal: async (userId: string, title: string) => {
    try {
      const createGoalRes: CreateGoalRes = await GoalApi.createGoal({
        userId,
        title,
      });
      console.log("createGoalRes", createGoalRes);
    } catch (error) {
      console.error(error);
    }
  },
  /** 継続目標をリストに追加する。 */
  addGoalList: (goal: GoalRes) =>
    set((state) => ({
      goalList: [...state.goalList, goal],
    })),

  /**
   * 選択中のGoalId を設定する。
   *
   * - 選択中のGoalId に紐づくカレンダーと日付を取得する。
   */
  setSelectedGoalId: (selectedGoalId: string) => {
    set({
      selectedGoalId,
    });
  },

  // ------------------------- Calendar -------------------------
  fetchCalendarAndDates: async (userId: string, goalId: string) => {
    try {
      const calendarAndDates: FetchCalendarAndDatesRes =
        await CalendarAPI.fetchCalendarAndDates({
          userId,
          goalId,
        });
      console.log("calendarAndDates", calendarAndDates);

      set({
        calendarAndDates,
        selectedCalendarId: calendarAndDates.calendar.calendarId, // 選択中のカレンダーIDを設定
      });
    } catch (error) {
      console.error(error);
    }
  },
}));
