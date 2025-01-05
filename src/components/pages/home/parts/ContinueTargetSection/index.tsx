import { GoalForm } from "@/components/pages/home/parts/ContinueTargetSection/parts/GoalForm";
import { CalendarCheck } from "lucide-react";
import { GoalList } from "./parts/GoalList";
import { HabitCalendar } from "../HabitCalendar";
import { useUserStates } from "@/stores/user";
import { useGoalStates } from "@/stores/goal";
import { useEffect } from "react";

/**
 * 継続目標の設定 Section
 */
export const ContinueTargetSection = () => {
  const { user } = useUserStates();
  const { goalList, fetchGoals, selectedGoalId } = useGoalStates();

  // ユーザーまたは、goalが変更されたら、継続目標を再度、取得する。
  useEffect(() => {
    if (!user) return;
    fetchGoals(user.userId);
  }, [user]);

  return (
    <div className="lg:col-span-2 space-y-8">
      <section className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
          <CalendarCheck />
          継続目標
        </h2>
        {/* 継続目標の新規作成フォーム */}
        <GoalForm />

        {/* 継続目標 List */}
        {goalList.length > 0 && (
          <GoalList
            goals={goalList}
            selectedGoalId={selectedGoalId}
            userId={user!.userId}
          />
        )}
      </section>

      {/* 目標が選択されている時に、カレンダーを表示する */}
      {selectedGoalId && (
        <section className="bg-white p-6 rounded-lg shadow-sm">
          <HabitCalendar />
        </section>
      )}
    </div>
  );
};
