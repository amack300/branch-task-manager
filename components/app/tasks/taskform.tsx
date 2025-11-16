'use client';

import { useState } from 'react';
import { useTodoStore } from '@/lib/store';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const TaskForm = () => {
  const addTask = useTodoStore((state) => state.addTask);
  const [taskText, setTaskText] = useState('');

  const handleSubmit = () => {
    if (!taskText.trim()) return;
    addTask(taskText);
    setTaskText('');
  };

  return (
    <form
      role="form"
      className="flex mb-6 space-x-2"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <Input
        placeholder="Add a new task..."
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
      />
      <Button disabled={!taskText.length} type="submit">
        Add Task
      </Button>
    </form>
  );
};
