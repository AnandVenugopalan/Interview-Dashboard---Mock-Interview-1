import React, { useState, useEffect } from 'react';
import { Question, CategoryType, DifficultyType, StatusType } from '../types';
import { CATEGORIES, DIFFICULTIES, STATUSES, DIFFICULTY_COLORS, STATUS_COLORS } from '../utils/constants';
import { X, Plus, Save, Link as LinkIcon, FileText, Tag, Star, AlertCircle } from 'lucide-react';

interface QuestionFormModalProps {
  isOpen: boolean;
  questionToEdit?: Question | null;
  onClose: () => void;
  onSubmit: (questionData: Omit<Question, 'id' | 'dateAdded'> & { id?: string }) => void;
}

export const QuestionFormModal: React.FC<QuestionFormModalProps> = ({
  isOpen,
  questionToEdit,
  onClose,
  onSubmit,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<CategoryType>('DSA');
  const [difficulty, setDifficulty] = useState<DifficultyType>('Medium');
  const [status, setStatus] = useState<StatusType>('Pending');
  const [notes, setNotes] = useState('');
  const [url, setUrl] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [timeSpentMinutes, setTimeSpentMinutes] = useState<number | ''>('');

  const [errors, setErrors] = useState<{ title?: string; url?: string }>({});

  useEffect(() => {
    if (questionToEdit) {
      setTitle(questionToEdit.title);
      setCategory(questionToEdit.category);
      setDifficulty(questionToEdit.difficulty);
      setStatus(questionToEdit.status);
      setNotes(questionToEdit.notes || '');
      setUrl(questionToEdit.url || '');
      setTagsInput(questionToEdit.tags ? questionToEdit.tags.join(', ') : '');
      setIsFavorite(!!questionToEdit.isFavorite);
      setTimeSpentMinutes(questionToEdit.timeSpentMinutes !== undefined ? questionToEdit.timeSpentMinutes : '');
    } else {
      setTitle('');
      setCategory('DSA');
      setDifficulty('Medium');
      setStatus('Pending');
      setNotes('');
      setUrl('');
      setTagsInput('');
      setIsFavorite(false);
      setTimeSpentMinutes('');
    }
    setErrors({});
  }, [questionToEdit, isOpen]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: { title?: string; url?: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Question title is required.';
    } else if (title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters.';
    }

    if (url.trim()) {
      try {
        new URL(url);
      } catch {
        newErrors.url = 'Please enter a valid URL (e.g. https://leetcode.com/...)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const parsedTags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    onSubmit({
      ...(questionToEdit ? { id: questionToEdit.id } : {}),
      title: title.trim(),
      category,
      difficulty,
      status,
      notes: notes.trim() || undefined,
      url: url.trim() || undefined,
      tags: parsedTags.length > 0 ? parsedTags : undefined,
      isFavorite,
      timeSpentMinutes: timeSpentMinutes !== '' ? Number(timeSpentMinutes) : undefined,
      dateCompleted: status === 'Completed' ? (questionToEdit?.dateCompleted || new Date().toISOString()) : undefined
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl my-8 max-h-[90vh] flex flex-col">
        
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              {questionToEdit ? 'Edit Practice Question' : 'Add New Question'}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {questionToEdit ? 'Update details, difficulty or completion status.' : 'Track a new DSA, Git, Technical or Machine Coding challenge.'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto pt-6 space-y-6 pr-1">
          
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
              <span>Question Title <span className="text-rose-400">*</span></span>
              <span className="text-[11px] text-slate-400">{title.length}/120</span>
            </label>
            <input
              type="text"
              maxLength={120}
              placeholder="e.g., LRU Cache Implementation, React Virtualized List, Git Rebase..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl glass-input text-sm focus:ring-0 ${
                errors.title ? 'border-rose-500/80 focus:border-rose-500' : ''
              }`}
            />
            {errors.title && (
              <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.title}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Category <span className="text-rose-400">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CategoryType)}
                className="w-full px-4 py-3 rounded-xl glass-input text-sm bg-slate-900 cursor-pointer"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat} className="bg-slate-900 text-white">
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Difficulty <span className="text-rose-400">*</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {DIFFICULTIES.map((diff) => {
                  const isSelected = difficulty === diff;
                  const colors = DIFFICULTY_COLORS[diff];
                  return (
                    <button
                      key={diff}
                      type="button"
                      onClick={() => setDifficulty(diff)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                        isSelected
                          ? `${colors.bg} ${colors.text} ${colors.border} ring-2 ring-indigo-500/30 shadow-md`
                          : 'bg-slate-800/50 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {diff}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">
              Status <span className="text-rose-400">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-950/80 rounded-2xl border border-slate-800">
              {STATUSES.map((st) => {
                const isSelected = status === st;
                const colors = STATUS_COLORS[st];
                return (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setStatus(st)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
                      isSelected
                        ? `${colors.bg} ${colors.text} border ${colors.border} shadow-lg`
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {st}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <LinkIcon className="w-3.5 h-3.5 text-slate-400" />
              <span>Practice / Solution URL</span>
              <span className="text-[10px] text-slate-400 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              placeholder="https://leetcode.com/problems/... or GitHub repo"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className={`w-full px-4 py-2.5 rounded-xl glass-input text-sm ${
                errors.url ? 'border-rose-500/80' : ''
              }`}
            />
            {errors.url && (
              <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.url}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-slate-400" />
                <span>Tags / Topics</span>
                <span className="text-[10px] text-slate-400 font-normal">(Comma separated)</span>
              </label>
              <input
                type="text"
                placeholder="Array, BFS, System Design, React"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Time Spent (Minutes) <span className="text-[10px] text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                type="number"
                min="0"
                max="999"
                placeholder="e.g. 45"
                value={timeSpentMinutes}
                onChange={(e) => setTimeSpentMinutes(e.target.value === '' ? '' : parseInt(e.target.value, 10))}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              <span>Notes / Key Learnings & Approach</span>
              <span className="text-[10px] text-slate-400 font-normal">(Optional)</span>
            </label>
            <textarea
              rows={3}
              placeholder="Record time/space complexity, core idea, edge cases to remember..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-3 rounded-xl glass-input text-sm resize-none"
            />
          </div>

          <div className="flex items-center gap-3 pt-1">
            <button
              type="button"
              onClick={() => setIsFavorite(!isFavorite)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-semibold transition-all ${
                isFavorite
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  : 'bg-slate-800/40 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-400 text-amber-400' : ''}`} />
              <span>{isFavorite ? 'Starred Question' : 'Star for Revision'}</span>
            </button>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-xl transition-all border border-slate-700/50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg shadow-indigo-600/30 transition-all active:scale-95"
            >
              {questionToEdit ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              <span>{questionToEdit ? 'Save Changes' : 'Create Question'}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
