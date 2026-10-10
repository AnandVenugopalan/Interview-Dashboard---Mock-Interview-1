export type CategoryType = 'DSA' | 'Git' | 'Technical' | 'Machine Coding' | 'CS Fundamentals';
export type DifficultyType = 'Easy' | 'Medium' | 'Hard';
export type StatusType = 'Pending' | 'In Progress' | 'Completed';

export interface Question {
  id: string;
  title: string;
  category: CategoryType;
  difficulty: DifficultyType;
  status: StatusType;
  notes?: string;
  url?: string;
  dateAdded: string;
  dateCompleted?: string;
  isFavorite?: boolean;
  timeSpentMinutes?: number;
  tags?: string[];
}

export interface FilterState {
  searchQuery: string;
  category: string;
  difficulty: string;
  status: string;
  sortBy: 'date-desc' | 'date-asc' | 'difficulty-asc' | 'difficulty-desc' | 'title-asc';
  onlyFavorites: boolean;
}

export interface DashboardStats {
  totalQuestions: number;
  completedDSA: number;
  completedTechnical: number;
  machineCodingStatus: {
    total: number;
    completed: number;
    inProgress: number;
    pending: number;
    percentage: number;
  };
  overallCompletionPercentage: number;
  weeklyGoal: number;
}

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: ToastType;
}
