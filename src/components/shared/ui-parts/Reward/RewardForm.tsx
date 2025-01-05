import React, { useState } from 'react';
import { Gift } from 'lucide-react';

interface RewardFormProps {
  activityId: string;
  onSubmit: (reward: { name: string; description: string; daysRequired: number }) => void;
}

export function RewardForm({ onSubmit }: RewardFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [daysRequired, setDaysRequired] = useState(7);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && description.trim()) {
      onSubmit({ name: name.trim(), description: description.trim(), daysRequired });
      setName('');
      setDescription('');
      setDaysRequired(7);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">ご褒美の名前</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">説明</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">達成に必要な日数</label>
        <input
          type="number"
          min="1"
          value={daysRequired}
          onChange={(e) => setDaysRequired(parseInt(e.target.value))}
          className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 flex items-center justify-center gap-2"
      >
        <Gift size={20} />
        ご褒美を追加
      </button>
    </form>
  );
}