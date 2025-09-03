import type { Todo } from './types';
export const todos: Todo[] = [
  {
    id: 1,
    text: 'Learn Next.js API Routes',
    completed: true,
    createdAt: new Date(),
  },
  {
    id: 2,
    text: 'Build a robust CRUD API',
    completed: false,
    createdAt: new Date(),
  },
  {
    id: 3,
    text: 'Master error handling and status codes',
    completed: false,
    createdAt: new Date(),
  },
];
