import { render, screen, fireEvent, waitFor } from '@/utils/testing';

import { TaskItem } from './taskItem';

const mockTask = {
  id: '1',
  title: 'Task A',
  completed: false,
};

describe('TaskItem', () => {
  const onToggle = jest.fn();
  const onDelete = jest.fn();
  const onEdit = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders task title', () => {
    render(
      <TaskItem
        task={mockTask}
        onToggle={onToggle}
        onDelete={onDelete}
        onEdit={onEdit}
      />,
    );

    expect(screen.getByText('Task A')).toBeInTheDocument();
  });

  it('calls onToggle when checkbox is clicked', () => {
    render(
      <TaskItem
        task={mockTask}
        onToggle={onToggle}
        onDelete={onDelete}
        onEdit={onEdit}
      />,
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(onToggle).toHaveBeenCalledWith('1', true);
  });

  it('enters edit mode when edit button is clicked', () => {
    render(
      <TaskItem
        task={mockTask}
        onToggle={onToggle}
        onDelete={onDelete}
        onEdit={onEdit}
      />,
    );

    // click Edit
    fireEvent.click(screen.getByLabelText('Edit'));

    // now an input should appear
    expect(screen.getByDisplayValue('Task A')).toBeInTheDocument();
  });

  it('saves edited title', () => {
    render(
      <TaskItem
        task={mockTask}
        onToggle={onToggle}
        onDelete={onDelete}
        onEdit={onEdit}
      />,
    );

    fireEvent.click(screen.getByLabelText('Edit'));

    const input = screen.getByDisplayValue('Task A');

    fireEvent.change(input, { target: { value: 'Updated Task' } });

    fireEvent.click(screen.getByLabelText('Save'));

    expect(onEdit).toHaveBeenCalledWith('1', 'Updated Task');
  });

  it('saves edited title via TaskForm onSubmit', async () => {
    render(
      <TaskItem
        task={mockTask}
        onToggle={onToggle}
        onDelete={onDelete}
        onEdit={onEdit}
      />,
    );

    fireEvent.click(screen.getByLabelText('Edit'));

    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'Updated Title' } });
    fireEvent.submit(input.closest('form')!);

    await waitFor(() => {
      expect(onEdit).toHaveBeenCalledWith('1', 'Updated Title');
    });
  });

  it('cancels edit and restores original title', () => {
    render(
      <TaskItem
        task={mockTask}
        onToggle={onToggle}
        onDelete={onDelete}
        onEdit={onEdit}
      />,
    );

    fireEvent.click(screen.getByLabelText('Edit'));

    const input = screen.getByDisplayValue('Task A');

    fireEvent.change(input, { target: { value: 'Different' } });

    fireEvent.click(screen.getByLabelText('Cancel'));

    // Editing closed, label is back
    expect(screen.getByText('Task A')).toBeInTheDocument();
  });

  it('opens delete dialog when delete button is clicked', () => {
    render(
      <TaskItem
        task={mockTask}
        onToggle={onToggle}
        onDelete={onDelete}
        onEdit={onEdit}
      />,
    );

    fireEvent.click(screen.getByLabelText('Delete'));

    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
    expect(
      screen.getByText(
        'This action cannot be undone. This will permanently delete your task.',
      ),
    ).toBeInTheDocument();
  });

  it('calls onDelete when confirming delete', () => {
    render(
      <TaskItem
        task={mockTask}
        onToggle={onToggle}
        onDelete={onDelete}
        onEdit={onEdit}
      />,
    );

    fireEvent.click(screen.getByLabelText('Delete'));

    fireEvent.click(screen.getByText('Confirm Delete'));

    expect(onDelete).toHaveBeenCalledWith('1');
  });
});
