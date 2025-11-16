import { render, screen, fireEvent } from '@/utils/testing';

import { TaskForm } from './taskform';

// Mock Zustand store
jest.mock('@/lib/store', () => ({
  useTodoStore: jest.fn(),
}));

import { useTodoStore } from '@/lib/store';

describe('TaskForm', () => {
  const addTaskMock = jest.fn();

  // Zustand selector mock
  beforeEach(() => {
    (useTodoStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        addTask: addTaskMock,
      }),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders input and button', () => {
    render(<TaskForm />);

    expect(
      screen.getByPlaceholderText('Add a new task...'),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Add Task' }),
    ).toBeInTheDocument();
  });

  it('disables button when input is empty', () => {
    render(<TaskForm />);

    const button = screen.getByRole('button', { name: 'Add Task' });
    expect(button).toBeDisabled();
  });

  it('enables button when user types text', () => {
    render(<TaskForm />);

    const input = screen.getByPlaceholderText('Add a new task...');
    const button = screen.getByRole('button', { name: 'Add Task' });

    fireEvent.change(input, { target: { value: 'Test Task' } });

    expect(button).not.toBeDisabled();
  });

  it('calls addTask and clears the input on submit', () => {
    render(<TaskForm />);

    const input = screen.getByPlaceholderText('Add a new task...');
    const form = screen.getByRole('form');

    fireEvent.change(input, { target: { value: 'My Task' } });

    fireEvent.submit(form);

    expect(addTaskMock).toHaveBeenCalledTimes(1);
    expect(addTaskMock).toHaveBeenCalledWith('My Task');
    expect(input).toHaveValue(''); // input should clear
  });

  it('does NOT call addTask when input is empty or whitespace', () => {
    render(<TaskForm />);

    const input = screen.getByPlaceholderText('Add a new task...');
    const form = screen.getByRole('form');

    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.submit(form);

    expect(addTaskMock).not.toHaveBeenCalled();
  });
});
