import React from 'react';
import { FilterState } from '../types';
import { CATEGORIES, DIFFICULTIES, STATUSES } from '../utils/constants';
import { Search, X, ArrowUpDown, Star, RotateCcw } from 'lucide-react';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onResetFilters: () => void;
  totalFilteredCount: number;
  totalCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalFilteredCount,
  totalCount,
}) => {
  const isFiltered =
    filters.searchQuery.trim() !== '' ||
    filters.category !== 'All' ||
    filters.difficulty !== 'All' ||
    filters.status !== 'All' ||
    filters.onlyFavorites;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, searchQuery: e.target.value });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, category: e.target.value });
  };

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, difficulty: e.target.value });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, status: e.target.value });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, sortBy: e.target.value as FilterState['sortBy'] });
  };

  const toggleStarred = () => {
    onFilterChange({ ...filters, onlyFavorites: !filters.onlyFavorites });
  };

  return (
    <div className="space-y-4">
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 shadow-xl space-y-3">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by title, tag, or notes..."
              value={filters.searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-10 py-2.5 rounded-xl glass-input text-sm text-white placeholder-slate-400"
            />
            {filters.searchQuery && (
              <button
                onClick={() => onFilterChange({ ...filters, searchQuery: '' })}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center flex-wrap gap-2.5">
            
            <div className="relative">
              <select
                value={filters.category}
                onChange={handleCategoryChange}
                className="px-3.5 py-2.5 rounded-xl glass-input text-xs font-semibold bg-slate-900 border-slate-800 text-slate-200 cursor-pointer"
              >
                <option value="All">All Categories</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <select
                value={filters.difficulty}
                onChange={handleDifficultyChange}
                className="px-3.5 py-2.5 rounded-xl glass-input text-xs font-semibold bg-slate-900 border-slate-800 text-slate-200 cursor-pointer"
              >
                <option value="All">All Difficulties</option>
                {DIFFICULTIES.map((diff) => (
                  <option key={diff} value={diff}>
                    {diff}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <select
                value={filters.status}
                onChange={handleStatusChange}
                className="px-3.5 py-2.5 rounded-xl glass-input text-xs font-semibold bg-slate-900 border-slate-800 text-slate-200 cursor-pointer"
              >
                <option value="All">All Statuses</option>
                {STATUSES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={toggleStarred}
              className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                filters.onlyFavorites
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
              title="Show only starred questions"
            >
              <Star className={`w-3.5 h-3.5 ${filters.onlyFavorites ? 'fill-amber-400 text-amber-400' : ''}`} />
              <span>Starred</span>
            </button>

            <div className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl glass-input text-xs font-semibold bg-slate-900 border-slate-800 text-slate-200">
              <ArrowUpDown className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <select
                value={filters.sortBy}
                onChange={handleSortChange}
                className="bg-transparent text-xs font-semibold focus:outline-none cursor-pointer"
              >
                <option value="date-desc" className="bg-slate-900">Newest Added</option>
                <option value="date-asc" className="bg-slate-900">Oldest Added</option>
                <option value="difficulty-asc" className="bg-slate-900">Easy → Hard</option>
                <option value="difficulty-desc" className="bg-slate-900">Hard → Easy</option>
                <option value="title-asc" className="bg-slate-900">Title A-Z</option>
              </select>
            </div>

          </div>

        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/60 text-xs">
          <div className="text-slate-400 flex items-center gap-2">
            <span>
              Showing <strong className="text-white font-mono">{totalFilteredCount}</strong> of <strong className="text-slate-300 font-mono">{totalCount}</strong> questions
            </span>
            {isFiltered && (
              <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 text-[11px] border border-indigo-500/20 font-medium">
                Filtered
              </span>
            )}
          </div>

          {isFiltered && (
            <button
              onClick={onResetFilters}
              className="flex items-center gap-1 text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
