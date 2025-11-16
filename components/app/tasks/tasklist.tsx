'use client';

import { useTodoStore } from '@/lib/store';

import { TaskItem } from './taskItem';

export const TaskList = () => {
  const tasks = useTodoStore((state) => state.tasks);
  const completed = useTodoStore((state) => state.completed);
  const editTask = useTodoStore((state) => state.editTask);
  const deleteTask = useTodoStore((state) => state.deleteTask);
  const toggleTaskCompletion = useTodoStore(
    (state) => state.toggleTaskCompletion,
  );

  return (
    <section className="grid gap-4">
      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center">No tasks yet. Add one!</p>
      ) : (
        tasks
          .filter((task) => (completed ? task.completed : task))
          .map((task) => (
            <TaskItem
              completed={completed}
              key={task.id}
              task={task}
              onToggle={toggleTaskCompletion}
              onDelete={deleteTask}
              onEdit={editTask}
            />
          ))
      )}
    </section>
  );
};
