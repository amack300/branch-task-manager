'use client';

import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Edit2, Trash2, Save, X } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';

import type { Task } from '@/types';

import { cn } from '@/lib/utils';

interface TaskItemProps {
  task: Task;
  completed?: boolean;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
}

export const TaskItem = ({
  task,
  completed,
  onToggle,
  onDelete,
  onEdit,
}: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const handleSave = () => {
    onEdit(task.id, editTitle);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setIsEditing(false);
  };

  return (
    <article
      data-testid="task-item"
      className="flex items-center justify-between p-4 bg-white shadow-sm rounded-lg border"
    >
      <div className="flex items-center space-x-3">
        {isEditing ? (
          <Input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="mr-3 w-100"
          />
        ) : (
          <>
            <Checkbox
              id={`task-${task.id}`}
              checked={task.completed}
              onCheckedChange={(checked) =>
                onToggle(task.id, checked as boolean)
              }
            />
            <Label
              htmlFor={`task-${task.id}`}
              className={cn(
                'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                task.completed &&
                  !completed &&
                  'line-through text-muted-foreground',
                task.completed && !completed && 'text-primary',
              )}
            >
              {task.title}
            </Label>
          </>
        )}
      </div>
      <div className="flex items-center space-x-2">
        {isEditing ? (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSave}
              aria-label="Save"
            >
              <Save className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCancel}
              aria-label="Cancel"
            >
              <X className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditing(true)}
              aria-label="Edit"
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Delete">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure?</DialogTitle>
                  <DialogDescription>
                    Dialog to confirm the deletion of a task.
                  </DialogDescription>
                </DialogHeader>
                <p>
                  This action cannot be undone. This will permanently delete
                  your task.
                </p>
                <DialogFooter>
                  <Button
                    onClick={() => onDelete(task.id)}
                    variant="destructive"
                  >
                    Confirm Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>
    </article>
  );
};
