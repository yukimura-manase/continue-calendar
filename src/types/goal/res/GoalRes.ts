export interface GoalRes {
  userId: string;
  goalId: string;
  calendarId: string | null;
  title: string;
  createdAt: Date;
}

export interface DisplayGoal {
  goalId: string;
  title: string;
}
