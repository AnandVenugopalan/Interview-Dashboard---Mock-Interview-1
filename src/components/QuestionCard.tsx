import React, { useState } from 'react';
import { Question, StatusType } from '../types';
import { CATEGORY_COLORS, DIFFICULTY_COLORS, STATUS_COLORS } from '../utils/constants';
import { 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  FileText, 
  Star, 
  MoreVertical, 
  Edit3, 
  Trash2, 
  ChevronDown, 
  ChevronUp,
  Tag
} from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  onStatusChange: (id: string, newStatus: StatusType) => void;
  onToggleFavorite: (id: string) => void;
  onEdit: (question: Question) => void;
  onDelete: (id: string) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onStatusChange,
  onToggleFavorite,
  onEdit,
  onDelete,
}) => {
  const [isNotesExpanded, setIsNotesExpanded] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const categoryStyle = CATEGORY_COLORS[question.category] || CATEGORY_COLORS.DSA;
  const difficultyStyle = DIFFICULTY_COLORS[question.difficulty] || DIFFICULTY_COLORS.Medium;
  const statusStyle = STATUS_COLORS[question.status] || STATUS_COLORS.Pending;

  const getNextStatus = (current: StatusType): StatusType => {
    if (current === 'Pending') return 'In Progress';
    if (current === 'In Progress') return 'Completed';
    return 'Pending';
  };

  const handleCycleStatus = (e: React.MouseEvent) => {
    e.stopPropagation();
    onStatusChange(question.id, getNextStatus(question.status));
  };

  return (
    <div className={`glass-card rounded-2xl p-5 border transition-all relative flex flex-col justify-between ${
      question.status === 'Completed' ? 'border-emerald-500/20 bg-emerald-950/5' : 'border-slate-800'
    }`}>
      
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          
          <div className="flex items-center flex-wrap gap-2">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${categoryStyle.bg} ${categoryStyle.text} ${categoryStyle.border}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${categoryStyle.dot}`} />
              {question.category}
            </span>

            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${difficultyStyle.bg} ${difficultyStyle.text} ${difficultyStyle.border}`}>
              {question.difficulty}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => onToggleFavorite(question.id)}
              className="p-1.5 text-slate-400 hover:text-amber-400 rounded-lg hover:bg-slate-800 transition-colors"
              title={question.isFavorite ? 'Unstar question' : 'Star for review'}
            >
              <Star className={`w-4 h-4 ${question.isFavorite ? 'fill-amber-400 text-amber-400' : ''}`} />
            </button>

            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              {showMenu && (
                <>
                  <div
                    className="fixed inset-0 z-20"
                    onClick={() => setShowMenu(false)}
                  />
                  <div className="absolute right-0 top-8 z-30 w-36 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-1 text-xs">
                    <button
                      onClick={() => {
                        setShowMenu(false);
                        onEdit(question);
                      }}
                      className="w-full text-left px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800 flex items-center gap-2"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowMenu(false);
                        onDelete(question.id);
                      }}
                      className="w-full text-left px-3 py-2 text-rose-400 hover:bg-rose-500/10 flex items-center gap-2"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </>
              )}
            </div>

          </div>

        </div>

        <div className="space-y-1.5 mb-3">
          <h3 className={`text-base font-bold text-white leading-snug ${
            question.status === 'Completed' ? 'line-through text-slate-300 decoration-emerald-500/50' : ''
          }`}>
            {question.title}
          </h3>

          {question.url && (
            <a
              href={question.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 hover:underline"
            >
              <span>Practice Link</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>

        {question.tags && question.tags.length > 0 && (
          <div className="flex items-center flex-wrap gap-1.5 mb-3">
            {question.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded text-[11px] font-mono text-slate-400 bg-slate-800/60 border border-slate-700/40 flex items-center gap-1"
              >
                <Tag className="w-2.5 h-2.5 text-slate-400" />
                {tag}
              </span>
            ))}
          </div>
        )}

        {question.notes && (
          <div className="mt-2 mb-3">
            <button
              onClick={() => setIsNotesExpanded(!isNotesExpanded)}
              className="flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-indigo-400" />
              <span>{isNotesExpanded ? 'Hide Notes' : 'View Notes & Key Learnings'}</span>
              {isNotesExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {isNotesExpanded && (
              <div className="mt-2 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-relaxed font-mono whitespace-pre-wrap animate-fade-in">
                {question.notes}
              </div>
            )}
          </div>
        )}

      </div>

      <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs mt-2">
        
        <button
          onClick={handleCycleStatus}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border} hover:opacity-90 active:scale-95`}
          title="Click to cycle status (Pending ➔ In Progress ➔ Completed)"
        >
          <CheckCircle2 className={`w-3.5 h-3.5 ${question.status === 'Completed' ? 'text-emerald-400 fill-emerald-400/20' : ''}`} />
          <span>{question.status}</span>
        </button>

        <div className="text-slate-400 flex items-center gap-2 text-[11px]">
          {question.timeSpentMinutes !== undefined && (
            <span className="flex items-center gap-1 bg-slate-800/40 px-2 py-1 rounded-md text-slate-300">
              <Clock className="w-3 h-3 text-indigo-400" />
              {question.timeSpentMinutes} min
            </span>
          )}
        </div>

      </div>

    </div>
  );
};
