interface UseGoalListProps {
  userId: string;
  setSelectedGoalId: (selectedGoalId: string) => void;
  fetchCalendarAndDates: (userId: string, goalId: string) => Promise<void>;
}

export const useGoalList = ({
  userId,
  setSelectedGoalId,
  fetchCalendarAndDates,
}: UseGoalListProps) => {
  /**
   * 目標を選択する。
   *
   * - 選択中の目標IDを設定する。
   * - 目標に紐づいたカレンダーと日付を取得する。
   */
  const handleSelectGoal = async (goalId: string) => {
    await fetchCalendarAndDates(userId, goalId);
    setSelectedGoalId(goalId);
  };

  return { handleSelectGoal };
};
