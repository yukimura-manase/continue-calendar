import { useState } from "react";
import { UserRes } from "@/types/user/res/UserRes";

interface UseGoalFormProps {
  user: UserRes | null;
  createGoal: (userId: string, title: string) => Promise<void>;
  fetchGoals: (userId: string) => Promise<void>;
}

/**
 * 継続目標の新規作成フォーム Hooks
 */
export const useGoalForm = ({
  user,
  createGoal,
  fetchGoals,
}: UseGoalFormProps) => {
  const [title, setTitle] = useState("");

  /**
   * 新規継続目標の登録をする。
   *
   * - DBにGoalを作成する。
   * - 再度、Goalを取得する。
   */
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    console.log("handleSubmit Called");
    e.preventDefault();
    if (title.trim()) {
      // User Login している場合のみ Goal をDB作成する
      if (user) {
        await createGoal(user.userId, title.trim());

        // Goalを再取得する。
        await fetchGoals(user.userId);
      }
      // 入力フォームをクリア
      setTitle("");
    }
  };

  return {
    title,
    setTitle,
    handleSubmit,
  };
};
