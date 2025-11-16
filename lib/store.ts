import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { Task } from '@/types';

// Create a store to manage tasks
export interface ToDoStore {
  tasks: Task[];
  completed: boolean;
  toggleShowCompleted: () => void;
  addTask: (title: Task['title']) => void;
  editTask: (id: string, newTitle: string) => void;
  deleteTask: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
  clearTasks: () => void;
}

// Persist the global task store to localStorage
export const useTodoStore = create(
  persist<ToDoStore>(
    (set) => ({
      tasks: [],
      completed: false,
      toggleShowCompleted: () =>
        set((state) => ({
          completed: !state.completed,
        })),
      addTask: (title: Task['title']) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            { id: crypto.randomUUID(), title, completed: false },
          ],
        })),
      editTask: (id, newTitle) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, title: newTitle } : task,
          ),
        })),
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      toggleTaskCompletion: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task,
          ),
        })),
      clearTasks: () =>
        set(() => ({
          tasks: [],
        })),
    }),
    {
      name: 'task-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
