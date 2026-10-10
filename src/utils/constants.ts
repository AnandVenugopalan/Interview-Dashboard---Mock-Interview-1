import { CategoryType, DifficultyType, StatusType } from '../types';

export const CATEGORIES: CategoryType[] = [
  'DSA',
  'Git',
  'Technical',
  'Machine Coding',
  'CS Fundamentals'
];

export const DIFFICULTIES: DifficultyType[] = ['Easy', 'Medium', 'Hard'];

export const STATUSES: StatusType[] = ['Pending', 'In Progress', 'Completed'];

export const CATEGORY_COLORS: Record<CategoryType, { bg: string; text: string; border: string; dot: string }> = {
  DSA: {
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
    border: 'border-emerald-500/30',
    dot: 'bg-emerald-400'
  },
  Git: {
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    border: 'border-amber-500/30',
    dot: 'bg-amber-400'
  },
  Technical: {
    bg: 'bg-cyan-500/10',
    text: 'text-cyan-400',
    border: 'border-cyan-500/30',
    dot: 'bg-cyan-400'
  },
  'Machine Coding': {
    bg: 'bg-indigo-500/10',
    text: 'text-indigo-400',
    border: 'border-indigo-500/30',
    dot: 'bg-indigo-400'
  },
  'CS Fundamentals': {
    bg: 'bg-purple-500/10',
    text: 'text-purple-400',
    border: 'border-purple-500/30',
    dot: 'bg-purple-400'
  }
};

export const DIFFICULTY_COLORS: Record<DifficultyType, { bg: string; text: string; border: string }> = {
  Easy: {
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
    border: 'border-emerald-500/30'
  },
  Medium: {
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    border: 'border-amber-500/30'
  },
  Hard: {
    bg: 'bg-rose-500/10',
    text: 'text-rose-400',
    border: 'border-rose-500/30'
  }
};

export const STATUS_COLORS: Record<StatusType, { bg: string; text: string; border: string; iconBg: string }> = {
  Pending: {
    bg: 'bg-slate-800/80',
    text: 'text-slate-400',
    border: 'border-slate-700',
    iconBg: 'bg-slate-700/50'
  },
  'In Progress': {
    bg: 'bg-sky-500/10',
    text: 'text-sky-400',
    border: 'border-sky-500/30',
    iconBg: 'bg-sky-500/20'
  },
  Completed: {
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
    border: 'border-emerald-500/30',
    iconBg: 'bg-emerald-500/20'
  }
};
