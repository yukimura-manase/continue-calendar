import { useEffect, useState } from "react";
import { Record } from "@/types";
import { UserRes } from "@/types/user/res/UserRes";
import { GoalApi } from "@/apis/goalAPI";
import { GoalRes } from "@/types/goal/res/GoalRes";

interface UseContinueTargetProps {
  user: UserRes | null;
}

export const useContinueTarget = ({ user }: UseContinueTargetProps) => {
  // 継続目標のリスト
  const [goals, setGoals] = useState<GoalRes[]>([]);

  // 継続目標の達成記録
  const [records, setRecords] = useState<Record[]>([]);

  // 選択中の継続目標
  const [selectedActivity, setSelectedGoal] = useState<string | null>(null);

  // ユーザーの継続目標を取得する。
  const fetchGoals = async (userId: string) => {
    const goalList = await GoalApi.fetchGoals(userId);
    setGoals(goalList);
  };

  // 継続目標を追加する。
  const handleAddGoal = async (title: string) => {
    // 仮データ
    const newGoal: GoalRes = {
      userId: user!.userId,
      goalId: crypto.randomUUID(),
      calendarId: null,
      title,
      createdAt: new Date(),
    };
    setGoals([...goals, newGoal]);
  };

  // 日付をトグルする
  const handleToggleDay = (date: Date) => {
    if (!selectedActivity) return;

    const existingRecord = records.find(
      (r) =>
        r.activityId === selectedActivity &&
        r.date.toDateString() === date.toDateString()
    );

    if (existingRecord) {
      setRecords(
        records.map((r) =>
          r.id === existingRecord.id ? { ...r, completed: !r.completed } : r
        )
      );
    } else {
      const newRecord: Record = {
        id: crypto.randomUUID(),
        activityId: selectedActivity,
        date,
        completed: true,
      };
      setRecords([...records, newRecord]);
    }
  };

  // ユーザーまたは、goalが変更されたら、継続目標を再度、取得する。
  useEffect(() => {
    if (!user) return;
    fetchGoals(user.userId);
  }, [user]);

  return {
    fetchGoals,
    goals,
    setGoals,
    records,
    selectedActivity,
    handleAddGoal,
    handleToggleDay,
    setSelectedGoal,
  };
};
