import React from 'react';
import { Question } from '../types';
import { 
  CheckCircle2, 
  Code2, 
  Layers, 
  Laptop, 
  TrendingUp, 
  Target, 
  Sparkles,
  BookOpen
} from 'lucide-react';

interface DashboardOverviewProps {
  questions: Question[];
  weeklyGoal: number;
  onEditGoal: () => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  questions,
  weeklyGoal,
  onEditGoal,
}) => {
  const totalQuestions = questions.length;
  const completedQuestions = questions.filter(q => q.status === 'Completed').length;
  
  const completedDSA = questions.filter(q => q.category === 'DSA' && q.status === 'Completed').length;
  const totalDSA = questions.filter(q => q.category === 'DSA').length;

  const completedTechnical = questions.filter(
    q => (q.category === 'Technical' || q.category === 'Git' || q.category === 'CS Fundamentals') && q.status === 'Completed'
  ).length;
  const totalTechnical = questions.filter(
    q => q.category === 'Technical' || q.category === 'Git' || q.category === 'CS Fundamentals'
  ).length;

  const machineCodingQuestions = questions.filter(q => q.category === 'Machine Coding');
  const completedMachineCoding = machineCodingQuestions.filter(q => q.status === 'Completed').length;
  const inProgressMachineCoding = machineCodingQuestions.filter(q => q.status === 'In Progress').length;
  const pendingMachineCoding = machineCodingQuestions.filter(q => q.status === 'Pending').length;
  const totalMachineCoding = machineCodingQuestions.length;

  const overallPercentage = totalQuestions > 0 ? Math.round((completedQuestions / totalQuestions) * 100) : 0;
  const goalPercentage = weeklyGoal > 0 ? Math.min(100, Math.round((completedQuestions / weeklyGoal) * 100)) : 0;

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl glass-panel p-6 border border-slate-800 shadow-2xl bg-gradient-to-br from-slate-900/90 via-indigo-950/20 to-slate-900/90">
        
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Weekly Preparation Pulse</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {overallPercentage === 100 ? '🎉 Exceptional Work! Goal Reached!' : 'Keep Pushing Your Limits!'}
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              You have completed <strong className="text-indigo-400 font-bold">{completedQuestions}</strong> out of <strong className="text-white">{totalQuestions}</strong> tracked practice problems this week.
            </p>
          </div>

          <div className="w-full lg:w-auto bg-slate-900/90 border border-slate-800/80 rounded-2xl p-4 flex items-center justify-between gap-6 min-w-[280px]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                <Target className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <div className="text-xs text-slate-400 font-medium">Weekly Target</div>
                <div className="text-lg font-extrabold text-white">
                  {completedQuestions} / {weeklyGoal}
                  <span className="text-xs text-slate-400 font-normal ml-1">items</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1">
              <button
                onClick={onEditGoal}
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 hover:underline"
              >
                Set Target
              </button>
              <div className="text-xl font-mono font-bold text-cyan-400">
                {goalPercentage}%
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-5 border-t border-slate-800/60">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-slate-400 font-medium flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
              Overall Completion Rate
            </span>
            <span className="font-mono font-bold text-indigo-300">{overallPercentage}% ({completedQuestions}/{totalQuestions})</span>
          </div>
          <div className="w-full h-3 bg-slate-950/80 rounded-full overflow-hidden p-0.5 border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 rounded-full transition-all duration-700 shadow-sm"
              style={{ width: `${overallPercentage}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="glass-card rounded-2xl p-5 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Questions</span>
            <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 text-slate-300 group-hover:text-indigo-400 group-hover:bg-indigo-500/10 transition-colors">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white tracking-tight font-mono mb-1">
            {totalQuestions}
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="text-emerald-400 font-medium flex items-center gap-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> {completedQuestions} done
            </span>
            <span>•</span>
            <span>{totalQuestions - completedQuestions} remaining</span>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">DSA Problems</span>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
              <Code2 className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white tracking-tight font-mono mb-1">
            {completedDSA}
            <span className="text-sm font-normal text-slate-400 ml-1.5">/ {totalDSA}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
              <div
                className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${totalDSA > 0 ? (completedDSA / totalDSA) * 100 : 0}%` }}
              />
            </div>
            <span className="shrink-0 font-mono text-[11px] text-emerald-400">
              {totalDSA > 0 ? Math.round((completedDSA / totalDSA) * 100) : 0}%
            </span>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Technical & Git</span>
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white tracking-tight font-mono mb-1">
            {completedTechnical}
            <span className="text-sm font-normal text-slate-400 ml-1.5">/ {totalTechnical}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
              <div
                className="h-full bg-cyan-400 rounded-full transition-all duration-500"
                style={{ width: `${totalTechnical > 0 ? (completedTechnical / totalTechnical) * 100 : 0}%` }}
              />
            </div>
            <span className="shrink-0 font-mono text-[11px] text-cyan-400">
              {totalTechnical > 0 ? Math.round((completedTechnical / totalTechnical) * 100) : 0}%
            </span>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Machine Coding</span>
            <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 group-hover:bg-indigo-500/20 transition-colors">
              <Laptop className="w-5 h-5" />
            </div>
          </div>
          
          <div className="flex items-baseline justify-between mb-1">
            <div className="text-3xl font-extrabold text-white tracking-tight font-mono">
              {completedMachineCoding}
              <span className="text-sm font-normal text-slate-400 ml-1.5">/ {totalMachineCoding}</span>
            </div>
            <span className="text-xs font-semibold text-indigo-300 px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
              {completedMachineCoding === totalMachineCoding && totalMachineCoding > 0 ? 'All Complete!' : `${inProgressMachineCoding} Active`}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 mt-2">
            <span className="text-emerald-400">{completedMachineCoding} Done</span>
            <span>•</span>
            <span className="text-sky-400">{inProgressMachineCoding} Building</span>
            <span>•</span>
            <span className="text-slate-400">{pendingMachineCoding} Queued</span>
          </div>
        </div>

      </div>
    </div>
  );
};
