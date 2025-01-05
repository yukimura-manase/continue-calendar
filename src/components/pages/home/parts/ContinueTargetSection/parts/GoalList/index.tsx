import { GoalRes } from "@/types/goal/res/GoalRes";
import { useGoalList } from "./hooks/useGoalList";
import { useGoalStates } from "@/stores/goal";

interface GoalListProps {
  goals: GoalRes[];
  selectedGoalId: string | null;
  userId: string;
}

/**
 * 継続目標の選択ボタンList
 */
export const GoalList = ({ goals, selectedGoalId, userId }: GoalListProps) => {
  const { setSelectedGoalId, fetchCalendarAndDates } = useGoalStates();
  const { handleSelectGoal } = useGoalList({
    userId,
    setSelectedGoalId,
    fetchCalendarAndDates,
  });

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {goals.map((goal) => (
        <button
          key={goal.goalId}
          onClick={() => handleSelectGoal(goal.goalId)}
          className={`px-4 py-2 rounded-full ${
            selectedGoalId === goal.goalId
              ? "bg-blue-500 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          {goal.title}
        </button>
      ))}
    </div>
  );
};
