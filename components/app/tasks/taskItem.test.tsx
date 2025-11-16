import { render, screen, fireEvent } from '@/utils/testing';

import { TaskItem } from './taskItem';

const mockTask = {
  id: '1',
  title: 'Test Task',
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

    expect(screen.getByText('Test Task')).toBeInTheDocument();
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
    expect(screen.getByDisplayValue('Test Task')).toBeInTheDocument();
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

    const input = screen.getByDisplayValue('Test Task');

    fireEvent.change(input, { target: { value: 'Updated Task' } });

    fireEvent.click(screen.getByLabelText('Save'));

    expect(onEdit).toHaveBeenCalledWith('1', 'Updated Task');
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

    const input = screen.getByDisplayValue('Test Task');

    fireEvent.change(input, { target: { value: 'Different' } });

    fireEvent.click(screen.getByLabelText('Cancel'));

    // Editing closed, label is back
    expect(screen.getByText('Test Task')).toBeInTheDocument();
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
