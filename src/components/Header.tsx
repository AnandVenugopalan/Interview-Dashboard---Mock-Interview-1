import React, { useRef } from 'react';
import { Plus, Download, Upload, RefreshCw, Sparkles, Code2, Target } from 'lucide-react';

interface HeaderProps {
  onOpenAddModal: () => void;
  onExportData: () => void;
  onImportData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onResetData: () => void;
  onLoadSampleData: () => void;
  totalCount: number;
  completedCount: number;
  weeklyGoal: number;
  onEditGoal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAddModal,
  onExportData,
  onImportData,
  onResetData,
  onLoadSampleData,
  totalCount,
  completedCount,
  weeklyGoal,
  onEditGoal,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const percentage = weeklyGoal > 0 ? Math.round((completedCount / weeklyGoal) * 100) : 0;

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/20 flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Code2 className="w-5 h-5 text-indigo-400 animate-pulse-glow" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                  PrepPulse
                  <span className="text-xs px-2 py-0.5 rounded-full font-mono font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    Tracker v1.0
                  </span>
                </h1>
              </div>
              <p className="text-xs text-slate-400">
                Weekly Interview Preparation & Machine Coding Tracker
              </p>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-3 bg-slate-900/80 border border-slate-800 rounded-xl px-3.5 py-1.5 text-xs text-slate-300">
            <div className="flex items-center gap-1.5 text-indigo-400 font-semibold">
              <Target className="w-4 h-4" />
              <span>Weekly Goal:</span>
            </div>
            <button
              onClick={onEditGoal}
              className="hover:underline font-bold text-white flex items-center gap-1 bg-slate-800 hover:bg-slate-700 px-2 py-0.5 rounded transition-colors"
              title="Click to change weekly goal target"
            >
              <span>{completedCount} / {weeklyGoal}</span>
              <span className="text-[10px] text-slate-400 font-normal">({percentage}%)</span>
            </button>
            <div className="w-16 bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, percentage)}%` }}
              />
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-2.5">
            {totalCount === 0 && (
              <button
                onClick={onLoadSampleData}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-xl transition-all"
                title="Load pre-populated sample questions"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Load Samples</span>
              </button>
            )}

            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-0.5">
              <button
                onClick={onExportData}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                title="Export Backup JSON"
              >
                <Download className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Export</span>
              </button>
              
              <button
                onClick={handleImportClick}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                title="Import Backup JSON"
              >
                <Upload className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Import</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={onImportData}
                className="hidden"
              />

              <button
                onClick={onResetData}
                className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                title="Reset All Data"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={onOpenAddModal}
              className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:scale-95 rounded-xl shadow-lg shadow-indigo-600/25 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Question</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
