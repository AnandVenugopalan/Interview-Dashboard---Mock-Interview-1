import React from 'react';
import { Question, StatusType } from '../types';
import { QuestionCard } from './QuestionCard';
import { Plus, Sparkles, SearchX, Inbox } from 'lucide-react';

interface QuestionListProps {
  questions: Question[];
  totalQuestionsCount: number;
  onStatusChange: (id: string, newStatus: StatusType) => void;
  onToggleFavorite: (id: string) => void;
  onEdit: (question: Question) => void;
  onDelete: (id: string) => void;
  onOpenAddModal: () => void;
  onLoadSampleData: () => void;
  onResetFilters: () => void;
}

export const QuestionList: React.FC<QuestionListProps> = ({
  questions,
  totalQuestionsCount,
  onStatusChange,
  onToggleFavorite,
  onEdit,
  onDelete,
  onOpenAddModal,
  onLoadSampleData,
  onResetFilters,
}) => {
  
  if (totalQuestionsCount === 0) {
    return (
      <div className="glass-panel rounded-3xl p-12 text-center border border-slate-800 my-6 max-w-xl mx-auto space-y-5 animate-fade-in">
        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mx-auto flex items-center justify-center">
          <Inbox className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white">No Practice Questions Yet</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
            Start tracking your interview preparation! Add your weekly DSA problems, technical concepts, Git exercises, or machine-coding projects.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={onOpenAddModal}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg shadow-indigo-600/30 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add First Question</span>
          </button>
          
          <button
            onClick={onLoadSampleData}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-xl transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Load Sample Practice Items</span>
          </button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="glass-panel rounded-3xl p-10 text-center border border-slate-800 my-6 max-w-lg mx-auto space-y-4 animate-fade-in">
        <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 mx-auto flex items-center justify-center">
          <SearchX className="w-7 h-7" />
        </div>
        <div className="space-y-1.5">
          <h3 className="text-lg font-bold text-white">No Matching Questions Found</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            We couldn't find any questions matching your active category, status, or search query.
          </p>
        </div>
        <button
          onClick={onResetFilters}
          className="px-4 py-2 text-xs font-semibold text-rose-400 hover:text-white bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 rounded-xl transition-all"
        >
          Reset All Filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {questions.map((q) => (
        <QuestionCard
          key={q.id}
          question={q}
          onStatusChange={onStatusChange}
          onToggleFavorite={onToggleFavorite}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
