export interface Activity {
  id: string;
  name: string;
  createdAt: Date;
}

export interface Record {
  id: string;
  activityId: string;
  date: Date;
  completed: boolean;
}

export interface Reward {
  id: string;
  activityId: string;
  name: string;
  description: string;
  daysRequired: number;
  unlocked: boolean;
}