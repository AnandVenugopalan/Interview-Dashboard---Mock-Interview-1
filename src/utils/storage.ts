import { Question } from '../types';

const STORAGE_KEY = 'interview_prep_tracker_questions_v1';
const GOAL_STORAGE_KEY = 'interview_prep_tracker_goal_v1';

export const INITIAL_MOCK_QUESTIONS: Question[] = [
  {
    id: 'q-1',
    title: 'LRU Cache Implementation in O(1)',
    category: 'DSA',
    difficulty: 'Hard',
    status: 'Completed',
    notes: 'Used a Doubly Linked List combined with a HashMap for O(1) get and put operations.',
    url: 'https://leetcode.com/problems/lru-cache/',
    dateAdded: '2026-10-01T10:00:00.000Z',
    dateCompleted: '2026-10-03T14:30:00.000Z',
    isFavorite: true,
    timeSpentMinutes: 45,
    tags: ['Doubly Linked List', 'HashMap', 'Design']
  },
  {
    id: 'q-2',
    title: 'Two Sum & 3Sum Variations',
    category: 'DSA',
    difficulty: 'Easy',
    status: 'Completed',
    notes: 'Two pointer approach after sorting for 3Sum. O(N^2) time complexity.',
    url: 'https://leetcode.com/problems/two-sum/',
    dateAdded: '2026-10-02T09:15:00.000Z',
    dateCompleted: '2026-10-02T10:00:00.000Z',
    isFavorite: false,
    timeSpentMinutes: 20,
    tags: ['Array', 'Two Pointers']
  },
  {
    id: 'q-3',
    title: 'Binary Tree Zigzag Level Order Traversal',
    category: 'DSA',
    difficulty: 'Medium',
    status: 'In Progress',
    notes: 'Queue BFS with direction flag toggles per level.',
    url: 'https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/',
    dateAdded: '2026-10-05T11:00:00.000Z',
    isFavorite: true,
    timeSpentMinutes: 35,
    tags: ['Tree', 'BFS']
  },
  {
    id: 'q-4',
    title: 'Git Interactive Rebase & Conflict Resolution',
    category: 'Git',
    difficulty: 'Medium',
    status: 'Completed',
    notes: 'Mastered `git rebase -i HEAD~3`, squashing commits, and resolving merge conflict markers cleanly.',
    dateAdded: '2026-10-04T16:20:00.000Z',
    dateCompleted: '2026-10-06T11:45:00.000Z',
    isFavorite: false,
    timeSpentMinutes: 30,
    tags: ['Rebase', 'CLI', 'Merge Conflicts']
  },
  {
    id: 'q-5',
    title: 'System Design: Design a Rate Limiter (Token Bucket vs Leaky Bucket)',
    category: 'Technical',
    difficulty: 'Hard',
    status: 'In Progress',
    notes: 'Compared Redis sliding window counters with Token Bucket. Handled distributed race conditions with Redis Lua scripts.',
    dateAdded: '2026-10-06T08:00:00.000Z',
    isFavorite: true,
    timeSpentMinutes: 60,
    tags: ['System Design', 'Redis', 'Algorithms']
  },
  {
    id: 'q-6',
    title: 'Build a Live Collaborative Code Editor Widget',
    category: 'Machine Coding',
    difficulty: 'Hard',
    status: 'In Progress',
    notes: 'React + WebSockets / Operational Transformation mockup. Debounced input syncing and active user cursor overlays.',
    dateAdded: '2026-10-07T14:10:00.000Z',
    isFavorite: true,
    timeSpentMinutes: 90,
    tags: ['React', 'WebSockets', 'DOM']
  },
  {
    id: 'q-7',
    title: 'Virtual Scrolling / Windowing Component',
    category: 'Machine Coding',
    difficulty: 'Medium',
    status: 'Completed',
    notes: 'Calculated visible slice index based on scrollTop / itemHeight to render 10,000 items at 60fps smoothly.',
    dateAdded: '2026-10-05T13:00:00.000Z',
    dateCompleted: '2026-10-08T17:00:00.000Z',
    isFavorite: false,
    timeSpentMinutes: 50,
    tags: ['Performance', 'Vanilla JS', 'React']
  },
  {
    id: 'q-8',
    title: 'JavaScript Event Loop, Microtasks & Macrotasks',
    category: 'CS Fundamentals',
    difficulty: 'Medium',
    status: 'Completed',
    notes: 'Promise callbacks vs setTimeout execution priority. MutationObserver behavior.',
    dateAdded: '2026-10-03T10:00:00.000Z',
    dateCompleted: '2026-10-04T12:00:00.000Z',
    isFavorite: false,
    timeSpentMinutes: 25,
    tags: ['JavaScript', 'Async', 'Event Loop']
  },
  {
    id: 'q-9',
    title: 'Git Cherry-Pick & Submodules Best Practices',
    category: 'Git',
    difficulty: 'Easy',
    status: 'Pending',
    notes: 'Review command syntax for copying specific commit SHAs into hotfix branches.',
    dateAdded: '2026-10-08T09:00:00.000Z',
    isFavorite: false,
    timeSpentMinutes: 0,
    tags: ['Git', 'Branching']
  },
  {
    id: 'q-10',
    title: 'Browser Storage (Cookies vs LocalStorage vs IndexedDB)',
    category: 'Technical',
    difficulty: 'Easy',
    status: 'Completed',
    notes: 'Security comparisons: HttpOnly flags, SameSite cookies, size limits, and asynchronous IndexedDB APIs.',
    dateAdded: '2026-10-02T11:30:00.000Z',
    dateCompleted: '2026-10-05T15:20:00.000Z',
    isFavorite: false,
    timeSpentMinutes: 15,
    tags: ['Web Security', 'Browsers']
  }
];

export const loadQuestionsFromStorage = (): Question[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      saveQuestionsToStorage(INITIAL_MOCK_QUESTIONS);
      return INITIAL_MOCK_QUESTIONS;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading questions from localStorage:', error);
    return INITIAL_MOCK_QUESTIONS;
  }
};

export const saveQuestionsToStorage = (questions: Question[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
  } catch (error) {
    console.error('Error saving questions to localStorage:', error);
  }
};

export const loadWeeklyGoalFromStorage = (): number => {
  try {
    const goal = localStorage.getItem(GOAL_STORAGE_KEY);
    return goal ? parseInt(goal, 10) : 12;
  } catch {
    return 12;
  }
};

export const saveWeeklyGoalToStorage = (goal: number): void => {
  try {
    localStorage.setItem(GOAL_STORAGE_KEY, goal.toString());
  } catch (error) {
    console.error('Error saving weekly goal:', error);
  }
};

export const exportDataAsJSON = (questions: Question[]): void => {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(questions, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `interview_prep_backup_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
};
