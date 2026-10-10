import React, { useState } from 'react';
import { Target, X, Check } from 'lucide-react';

interface GoalModalProps {
  isOpen: boolean;
  currentGoal: number;
  onClose: () => void;
  onSaveGoal: (newGoal: number) => void;
}

export const GoalModal: React.FC<GoalModalProps> = ({
  isOpen,
  currentGoal,
  onClose,
  onSaveGoal,
}) => {
  const [goalInput, setGoalInput] = useState(currentGoal.toString());

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(goalInput, 10);
    if (!isNaN(val) && val > 0) {
      onSaveGoal(val);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Set Weekly Target Goal</h3>
            <p className="text-xs text-slate-400">Target number of questions per week</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300">Target Questions</label>
            <input
              type="number"
              min="1"
              max="100"
              value={goalInput}
              onChange={(e) => setGoalInput(e.target.value)}
              className="w-full mt-1 px-4 py-2.5 rounded-xl glass-input text-sm text-white font-mono"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            {[5, 10, 15, 20].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setGoalInput(preset.toString())}
                className={`flex-1 py-1.5 text-xs font-mono font-semibold rounded-lg border transition-all ${
                  goalInput === preset.toString()
                    ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                    : 'bg-slate-800/60 text-slate-400 border-slate-700/50 hover:text-white'
                }`}
              >
                {preset}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-300 bg-slate-800 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg shadow-indigo-600/30"
            >
              <Check className="w-4 h-4" />
              <span>Save Goal</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
