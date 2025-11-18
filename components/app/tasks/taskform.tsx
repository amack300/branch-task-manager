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

interface TaskFormProps {
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  disableSubmit?: boolean;
}

export const TaskForm = ({
  defaultValue = '',
  onChange,
  onSubmit,
  disableSubmit,
}: TaskFormProps) => {
  const addTask = useTodoStore((state) => state.addTask);

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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: defaultValue,
    },
    mode: 'onChange',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldOnChange: (...event: unknown[]) => void,
  ) => {
    if (onChange) {
      onChange(e.target.value);
    }
    fieldOnChange(e);
  };

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    if (!values.title.trim()) return;
    if (onSubmit) {
      onSubmit(values.title);
    } else {
      // Default to task creation if not used in edit mode
      addTask(values.title);
      form.resetField('title');
    }
  };

  return (
    <Form {...form}>
      <form
        role="form"
        className="flex space-x-3 w-full"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  className="w-full"
                  placeholder={
                    // Only show placeholder if use for task creation
                    !defaultValue.length ? 'Add a new task...' : undefined
                  }
                  {...field}
                  onChange={(e) => handleChange(e, field.onChange)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {!disableSubmit && (
          // Allow the ability to disable the submit button for use in edit mode
          <Button disabled={!form.formState.isValid} type="submit">
            Add Task
          </Button>
        )}
      </form>
    </Form>
  );
};
