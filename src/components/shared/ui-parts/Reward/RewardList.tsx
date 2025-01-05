import React from 'react';
import { Trophy, Lock, Unlock } from 'lucide-react';
import { Reward } from '../types';

interface RewardListProps {
  rewards: Reward[];
  streakDays: number;
}

export function RewardList({ rewards, streakDays }: RewardListProps) {
  return (
    <div className="space-y-4">
      {rewards.map((reward) => (
        <div
          key={reward.id}
          className={`p-4 rounded-lg border ${
            reward.unlocked ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className={reward.unlocked ? 'text-yellow-500' : 'text-gray-400'} />
              <h3 className="font-medium">{reward.name}</h3>
            </div>
            {reward.unlocked ? (
              <Unlock className="text-green-500" />
            ) : (
              <Lock className="text-gray-400" />
            )}
          </div>
          <p className="mt-2 text-sm text-gray-600">{reward.description}</p>
          <div className="mt-2 text-sm">
            <span className="font-medium">
              {reward.daysRequired}日達成で解除 
              ({Math.min(streakDays, reward.daysRequired)}/{reward.daysRequired})
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}