import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { Question, FilterState, StatusType, ToastMessage } from './types';
import { 
  loadQuestionsFromStorage, 
  saveQuestionsToStorage, 
  loadWeeklyGoalFromStorage, 
  saveWeeklyGoalToStorage,
  exportDataAsJSON,
  INITIAL_MOCK_QUESTIONS 
} from './utils/storage';
import { Header } from './components/Header';
import { DashboardOverview } from './components/DashboardOverview';
import { FilterBar } from './components/FilterBar';
import { QuestionList } from './components/QuestionList';
import { QuestionFormModal } from './components/QuestionFormModal';
import { GoalModal } from './components/GoalModal';
import { Toast } from './components/Toast';
import { ConfirmModal } from './components/ConfirmModal';
import { CATEGORIES } from './utils/constants';

export const App: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>(() => loadQuestionsFromStorage());
  const [weeklyGoal, setWeeklyGoal] = useState<number>(() => loadWeeklyGoalFromStorage());

  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    category: 'All',
    difficulty: 'All',
    status: 'All',
    sortBy: 'date-desc',
    onlyFavorites: false,
  });

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [questionToEdit, setQuestionToEdit] = useState<Question | null>(null);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    saveQuestionsToStorage(questions);
  }, [questions]);

  useEffect(() => {
    saveWeeklyGoalToStorage(weeklyGoal);
  }, [weeklyGoal]);

  const addToast = (title: string, description?: string, type: ToastMessage['type'] = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    const newToast: ToastMessage = { id, title, description, type };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      dismissToast(id);
    }, 3500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
    }
  };

  const handleSaveQuestion = (questionData: Omit<Question, 'id' | 'dateAdded'> & { id?: string }) => {
    if (questionData.id) {
      setQuestions((prev) =>
        prev.map((q) =>
          q.id === questionData.id
            ? {
                ...q,
                ...questionData,
              }
            : q
        )
      );
      addToast('Question Updated', `Updated "${questionData.title}" successfully.`, 'info');
    } else {
      const newQuestion: Question = {
        ...questionData,
        id: `q-${Date.now()}`,
        dateAdded: new Date().toISOString(),
      };
      setQuestions((prev) => [newQuestion, ...prev]);
      addToast('Question Added', `Added "${questionData.title}" to your tracker.`, 'success');
      
      if (questionData.status === 'Completed') {
        triggerConfetti();
      }
    }
  };

  const handleStatusChange = (id: string, newStatus: StatusType) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id === id) {
          const updated = {
            ...q,
            status: newStatus,
            dateCompleted: newStatus === 'Completed' ? new Date().toISOString() : undefined,
          };
          if (newStatus === 'Completed') {
            triggerConfetti();
            addToast('Problem Completed! 🎉', `Marked "${q.title}" as Completed.`, 'success');
          } else {
            addToast('Status Updated', `Changed "${q.title}" status to ${newStatus}.`, 'info');
          }
          return updated;
        }
        return q;
      })
    );
  };

  const handleToggleFavorite = (id: string) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id === id) {
          const newFav = !q.isFavorite;
          addToast(
            newFav ? 'Starred Question' : 'Unstarred Question',
            newFav ? 'Added to your revision list.' : 'Removed from revision list.',
            'info'
          );
          return { ...q, isFavorite: newFav };
        }
        return q;
      })
    );
  };

  const handleDeleteQuestion = (id: string) => {
    const target = questions.find((q) => q.id === id);
    setQuestions((prev) => prev.filter((q) => q.id !== id));
    addToast('Question Deleted', target ? `Deleted "${target.title}".` : undefined, 'warning');
  };

  const handleResetData = () => {
    setQuestions([]);
    addToast('All Data Cleared', 'Your tracker is now empty.', 'warning');
  };

  const handleLoadSampleData = () => {
    setQuestions(INITIAL_MOCK_QUESTIONS);
    addToast('Sample Data Loaded', 'Loaded 10 interview preparation questions.', 'success');
  };

  const handleExportData = () => {
    exportDataAsJSON(questions);
    addToast('Backup Downloaded', 'Exported your practice tracker JSON file.', 'success');
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target?.result as string);
        if (Array.isArray(importedData)) {
          setQuestions(importedData);
          addToast('Import Successful', `Imported ${importedData.length} questions.`, 'success');
        } else {
          addToast('Import Failed', 'Invalid JSON format. Expected an array of questions.', 'error');
        }
      } catch {
        addToast('Import Failed', 'Could not parse JSON file.', 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const resetFilters = () => {
    setFilters({
      searchQuery: '',
      category: 'All',
      difficulty: 'All',
      status: 'All',
      sortBy: 'date-desc',
      onlyFavorites: false,
    });
  };

  const filteredQuestions = useMemo(() => {
    return questions
      .filter((q) => {
        if (filters.searchQuery.trim()) {
          const query = filters.searchQuery.toLowerCase();
          const matchTitle = q.title.toLowerCase().includes(query);
          const matchNotes = q.notes?.toLowerCase().includes(query);
          const matchTags = q.tags?.some((t) => t.toLowerCase().includes(query));
          if (!matchTitle && !matchNotes && !matchTags) return false;
        }

        if (filters.category !== 'All' && q.category !== filters.category) {
          return false;
        }

        if (filters.difficulty !== 'All' && q.difficulty !== filters.difficulty) {
          return false;
        }

        if (filters.status !== 'All' && q.status !== filters.status) {
          return false;
        }

        if (filters.onlyFavorites && !q.isFavorite) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'date-desc') {
          return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
        }
        if (filters.sortBy === 'date-asc') {
          return new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime();
        }
        if (filters.sortBy === 'title-asc') {
          return a.title.localeCompare(b.title);
        }
        if (filters.sortBy === 'difficulty-asc') {
          const map = { Easy: 1, Medium: 2, Hard: 3 };
          return map[a.difficulty] - map[b.difficulty];
        }
        if (filters.sortBy === 'difficulty-desc') {
          const map = { Easy: 1, Medium: 2, Hard: 3 };
          return map[b.difficulty] - map[a.difficulty];
        }
        return 0;
      });
  }, [questions, filters]);

  const completedCount = useMemo(() => {
    return questions.filter((q) => q.status === 'Completed').length;
  }, [questions]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col antialiased">
      
      <Header
        onOpenAddModal={() => {
          setQuestionToEdit(null);
          setIsFormModalOpen(true);
        }}
        onExportData={handleExportData}
        onImportData={handleImportData}
        onResetData={() => setIsResetConfirmOpen(true)}
        onLoadSampleData={handleLoadSampleData}
        totalCount={questions.length}
        completedCount={completedCount}
        weeklyGoal={weeklyGoal}
        onEditGoal={() => setIsGoalModalOpen(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        <DashboardOverview
          questions={questions}
          weeklyGoal={weeklyGoal}
          onEditGoal={() => setIsGoalModalOpen(true)}
        />

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setFilters({ ...filters, category: 'All' })}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              filters.category === 'All'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            All Categories ({questions.length})
          </button>
          {CATEGORIES.map((cat) => {
            const count = questions.filter((q) => q.category === cat).length;
            const isSelected = filters.category === cat;
            return (
              <button
                key={cat}
                onClick={() => setFilters({ ...filters, category: cat })}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        <FilterBar
          filters={filters}
          onFilterChange={setFilters}
          onResetFilters={resetFilters}
          totalFilteredCount={filteredQuestions.length}
          totalCount={questions.length}
        />

        <QuestionList
          questions={filteredQuestions}
          totalQuestionsCount={questions.length}
          onStatusChange={handleStatusChange}
          onToggleFavorite={handleToggleFavorite}
          onEdit={(q) => {
            setQuestionToEdit(q);
            setIsFormModalOpen(true);
          }}
          onDelete={(id) => setDeleteConfirmId(id)}
          onOpenAddModal={() => {
            setQuestionToEdit(null);
            setIsFormModalOpen(true);
          }}
          onLoadSampleData={handleLoadSampleData}
          onResetFilters={resetFilters}
        />

      </main>

      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <p>PrepPulse Practice Tracker — Empowering candidates to crack tech interviews.</p>
      </footer>

      <QuestionFormModal
        isOpen={isFormModalOpen}
        questionToEdit={questionToEdit}
        onClose={() => {
          setIsFormModalOpen(false);
          setQuestionToEdit(null);
        }}
        onSubmit={handleSaveQuestion}
      />

      <GoalModal
        isOpen={isGoalModalOpen}
        currentGoal={weeklyGoal}
        onClose={() => setIsGoalModalOpen(false)}
        onSaveGoal={(newGoal) => {
          setWeeklyGoal(newGoal);
          addToast('Goal Updated', `Target set to ${newGoal} questions/week.`, 'info');
        }}
      />

      <ConfirmModal
        isOpen={!!deleteConfirmId}
        title="Delete Question?"
        message="Are you sure you want to remove this question from your tracker? This action cannot be undone."
        confirmText="Delete"
        isDanger={true}
        onConfirm={() => {
          if (deleteConfirmId) {
            handleDeleteQuestion(deleteConfirmId);
            setDeleteConfirmId(null);
          }
        }}
        onClose={() => setDeleteConfirmId(null)}
      />

      <ConfirmModal
        isOpen={isResetConfirmOpen}
        title="Reset All Data?"
        message="This will delete all tracked questions and notes from your browser LocalStorage."
        confirmText="Reset Everything"
        isDanger={true}
        onConfirm={() => {
          handleResetData();
          setIsResetConfirmOpen(false);
        }}
        onClose={() => setIsResetConfirmOpen(false)}
      />

      <Toast toasts={toasts} onDismiss={dismissToast} />

    </div>
  );
};

export default App;
