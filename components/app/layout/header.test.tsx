import { render, screen, fireEvent } from '@/utils/testing';

import { Header } from './header';

import { useTodoStore } from '@/lib/store';
import { ToDoStore } from '@/lib/store';

// Mock Zustand store
jest.mock('@/lib/store', () => ({
  useTodoStore: jest.fn(),
}));

describe('Header', () => {
  const setupMockStore = (storeValues: Partial<ToDoStore>) => {
    (useTodoStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector(storeValues),
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the header title', () => {
    setupMockStore({
      completed: false,
      tasks: [],
      toggleShowCompleted: jest.fn(),
      clearTasks: jest.fn(),
    });

    render(<Header />);

    expect(screen.getByText('Branch Task Manager')).toBeInTheDocument();
  });

  it('does NOT show buttons when there are no tasks', () => {
    setupMockStore({
      completed: false,
      tasks: [],
      toggleShowCompleted: jest.fn(),
      clearTasks: jest.fn(),
    });

    render(<Header />);

    expect(screen.queryByText('Show Completed')).not.toBeInTheDocument();
    expect(screen.queryByText('Clear All')).not.toBeInTheDocument();
  });

  it("shows 'Clear All' when tasks exist", () => {
    setupMockStore({
      completed: false,
      tasks: [{ id: 1, title: 'Test', completed: false }],
      toggleShowCompleted: jest.fn(),
      clearTasks: jest.fn(),
    });

    render(<Header />);

    expect(screen.getByText('Clear All')).toBeInTheDocument();
  });

  it('shows toggle button when at least one task is completed', () => {
    setupMockStore({
      completed: false,
      tasks: [
        { id: 1, title: 'A', completed: false },
        { id: 2, title: 'B', completed: true },
      ],
      toggleShowCompleted: jest.fn(),
      clearTasks: jest.fn(),
    });

    render(<Header />);

    expect(screen.getByText('Show Completed')).toBeInTheDocument();
  });

  it('calls toggleShowCompleted when toggle button is clicked', () => {
    const toggleMock = jest.fn();

    setupMockStore({
      completed: false,
      tasks: [
        { id: 1, title: 'A', completed: false },
        { id: 2, title: 'B', completed: true },
      ],
      toggleShowCompleted: toggleMock,
      clearTasks: jest.fn(),
    });

    render(<Header />);

    fireEvent.click(screen.getByText('Show Completed'));
    expect(toggleMock).toHaveBeenCalledTimes(1);
  });

  it('calls clearTasks when Clear All is clicked', () => {
    const clearMock = jest.fn();

    setupMockStore({
      completed: false,
      tasks: [{ id: 1, title: 'A', completed: false }],
      toggleShowCompleted: jest.fn(),
      clearTasks: clearMock,
    });

    render(<Header />);

    fireEvent.click(screen.getByText('Clear All'));
    expect(clearMock).toHaveBeenCalled();
  });

  it('automatically toggles completed view inside useEffect when tasks change', () => {
    const toggleMock = jest.fn();

    setupMockStore({
      completed: true,
      tasks: [{ id: 1, title: 'A', completed: false }],
      toggleShowCompleted: toggleMock,
      clearTasks: jest.fn(),
    });

    render(<Header />);

    expect(toggleMock).toHaveBeenCalledTimes(1);
  });
});
