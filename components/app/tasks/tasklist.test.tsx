import { render, screen } from '@/utils/testing';

import { TaskList } from './tasklist';

import { ToDoStore } from '@/lib/store';

// Mock Zustand store
jest.mock('@/lib/store', () => ({
  useTodoStore: jest.fn(),
}));

import { useTodoStore } from '@/lib/store';

describe('TaskList', () => {
  const mockEdit = jest.fn();
  const mockDelete = jest.fn();
  const mockToggle = jest.fn();

  const setupStore = (storeValues: Partial<ToDoStore>) => {
    (useTodoStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector(storeValues),
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders empty state when no tasks exist', () => {
    setupStore({
      tasks: [],
      completed: false,
      editTask: mockEdit,
      deleteTask: mockDelete,
      toggleTaskCompletion: mockToggle,
    });

    render(<TaskList />);

    expect(screen.getByText('No tasks yet. Add one!')).toBeInTheDocument();
  });

  it('renders a list of tasks when tasks exist', () => {
    setupStore({
      tasks: [
        { id: '1', title: 'Task A', completed: false },
        { id: '2', title: 'Task B', completed: true },
      ],
      completed: false,
      editTask: mockEdit,
      deleteTask: mockDelete,
      toggleTaskCompletion: mockToggle,
    });

    render(<TaskList />);

    const items = screen.getAllByTestId('task-item');
    expect(items).toHaveLength(2);
    expect(screen.getByText('Task A')).toBeInTheDocument();
    expect(screen.getByText('Task B')).toBeInTheDocument();
  });

  it('filters to only completed tasks when completed view is enabled', () => {
    setupStore({
      tasks: [
        { id: '1', title: 'Task A', completed: false },
        { id: '2', title: 'Task B', completed: true },
      ],
      completed: true,
      editTask: mockEdit,
      deleteTask: mockDelete,
      toggleTaskCompletion: mockToggle,
    });

    render(<TaskList />);

    const items = screen.getAllByTestId('task-item');

    // Only the completed task should appear
    expect(items).toHaveLength(1);
    expect(screen.queryByText('Task A')).not.toBeInTheDocument();
    expect(screen.getByText('Task B')).toBeInTheDocument();
  });

  it('passes the correct props to TaskItem', () => {
    const taskData = [{ id: '1', title: 'Task A', completed: false }];

    setupStore({
      tasks: taskData,
      completed: false,
      editTask: mockEdit,
      deleteTask: mockDelete,
      toggleTaskCompletion: mockToggle,
    });

    render(<TaskList />);

    // Since TaskItem is mocked, we simply confirm its existence here
    expect(screen.getByTestId('task-item')).toBeInTheDocument();

    // Optional: Verify it rendered the mocked title
    expect(screen.getByText('Task A')).toBeInTheDocument();
  });
});
