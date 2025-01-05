import { useState } from "react";
import { Activity, Record, Reward } from "@/types";

export const RewardPage = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [records, setRecords] = useState<Record[]>([]);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);

  const handleAddActivity = (name: string) => {
    const newActivity: Activity = {
      id: crypto.randomUUID(),
      name,
      createdAt: new Date(),
    };
    setActivities([...activities, newActivity]);
  };

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

  const handleAddReward = (rewardData: {
    name: string;
    description: string;
    daysRequired: number;
  }) => {
    if (!selectedActivity) return;

    const newReward: Reward = {
      id: crypto.randomUUID(),
      activityId: selectedActivity,
      ...rewardData,
      unlocked: false,
    };
    setRewards([...rewards, newReward]);
  };

  const getStreakDays = () => {
    if (!selectedActivity) return 0;
    return records.filter(
      (r) => r.activityId === selectedActivity && r.completed
    ).length;
  };

  return (
    <div>
      <h1>Reward Page</h1>

      {/* ご褒美 */}
      {/* {selectedActivity && (
            <div className="space-y-8">
              <section className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <Gift />
                  ご褒美
                </h2>
                <RewardForm
                  activityId={selectedActivity}
                  onSubmit={handleAddReward}
                />
                <div className="mt-6">
                  <RewardList
                    rewards={rewards.filter(
                      (r) => r.activityId === selectedActivity
                    )}
                    streakDays={getStreakDays()}
                  />
                </div>
              </section>
            </div>
          )} */}
    </div>
  );
};
