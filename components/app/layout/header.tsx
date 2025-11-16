'use client';

import { useEffect } from 'react';

import { Button } from '@/components/ui/button';

import { useTodoStore } from '@/lib/store';

export const Header = () => {
  const completed = useTodoStore((state) => state.completed);
  const tasks = useTodoStore((state) => state.tasks);
  const toggleShowCompleted = useTodoStore(
    (state) => state.toggleShowCompleted,
  );
  const clearTasks = useTodoStore((state) => state.clearTasks);

  useEffect(() => {
    // Toggle back to all tasks view when there are no tasks marked as completed
    if (completed && tasks.find((task) => !task.completed)) {
      toggleShowCompleted();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks]);

  return (
    <header className="flex justify-between pt-4 px-4">
      <h1 className="text-3xl text-primary mb-6">Branch Task Manager</h1>
      <div className="flex items-start gap-2">
        {tasks.find((task) => task.completed) && (
          <Button variant="link" onClick={() => toggleShowCompleted()}>
            {completed ? 'Show All' : 'Show Completed'}
          </Button>
        )}
        {tasks.length !== 0 && (
          <Button variant="link" onClick={() => clearTasks()}>
            Clear All
          </Button>
        )}
      </div>
    </header>
  );
};
