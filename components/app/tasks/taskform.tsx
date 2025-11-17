'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useTodoStore } from '@/lib/store';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  title: z
    .string()
    .min(3, {
      message: 'Task title must be at least 3 characters.',
    })
    .max(100, {
      message: 'Task title must be no more than 100 characters.',
    }),
});

export const TaskForm = () => {
  const addTask = useTodoStore((state) => state.addTask);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
    mode: 'onChange',
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!values.title.trim()) return;
    addTask(values.title);
    form.resetField('title');
  };

  return (
    <Form {...form}>
      <form
        role="form"
        className="flex mb-6 space-x-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  className="w-full"
                  placeholder="Add a new task..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={!form.formState.isValid} type="submit">
          Add Task
        </Button>
      </form>
    </Form>
  );
};
