import { useState } from "react";
import { Activity, Record, Reward } from "./types";
import { ActivityForm } from "./components/ActivityForm";
import { Calendar } from "./components/Calendar";
import { RewardForm } from "./components/RewardForm";
import { RewardList } from "./components/RewardList";
import { Calendar as CalendarIcon, Gift, CalendarCheck } from "lucide-react";
import { Header } from "./components/shared/ui-elements/Header";

function App() {
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
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
                <CalendarCheck />
                継続目標
              </h2>
              <ActivityForm onSubmit={handleAddActivity} />
              {activities.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {activities.map((activity) => (
                    <button
                      key={activity.id}
                      onClick={() => setSelectedActivity(activity.id)}
                      className={`px-4 py-2 rounded-full ${
                        selectedActivity === activity.id
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      {activity.name}
                    </button>
                  ))}
                </div>
              )}
            </section>

            {selectedActivity && (
              <section className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <CalendarIcon />
                  カレンダー
                </h2>
                <Calendar
                  records={records}
                  activityId={selectedActivity}
                  onToggleDay={handleToggleDay}
                />
              </section>
            )}
          </div>

          {selectedActivity && (
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
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
