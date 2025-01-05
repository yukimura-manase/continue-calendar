import { PlusCircle } from "lucide-react";
import { useGoalForm } from "./hooks/useGoalForm";
import { useUserStates } from "@/stores/user";
import { useGoalStates } from "@/stores/goal";

/**
 * 継続目標の追加フォーム
 */
export const GoalForm = () => {
  const { user } = useUserStates();
  const { createGoal, fetchGoals } = useGoalStates();
  const { title, setTitle, handleSubmit } = useGoalForm({
    user,
    createGoal,
    fetchGoals,
  });

  return (
    <form
      onSubmit={async (e: React.FormEvent) => await handleSubmit(e)}
      className="flex gap-2"
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="新しい継続目標を入力"
        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
      >
        <PlusCircle size={20} />
        追加
      </button>
    </form>
  );
};
