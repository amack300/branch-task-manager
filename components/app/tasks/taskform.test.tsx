import { render, screen, fireEvent, waitFor } from '@/utils/testing';

import { TaskForm } from './taskform';

import { useTodoStore } from '@/lib/store';

// Mock Zustand store
jest.mock('@/lib/store', () => ({
  useTodoStore: jest.fn(),
}));

describe('TaskForm', () => {
  const addTaskMock = jest.fn();

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

  it('renders and button starts disabled', () => {
    render(<TaskForm />);

    expect(
      screen.getByPlaceholderText('Add a new task...'),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add Task' })).toBeDisabled();
  });

  it('enables submit button when input becomes valid', async () => {
    render(<TaskForm />);

    const input = screen.getByPlaceholderText('Add a new task...');
    fireEvent.input(input, { target: { value: 'Task A' } });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Add Task' })).toBeEnabled();
    });
  });

  it('shows validation error for short input', async () => {
    render(<TaskForm />);

    const input = screen.getByPlaceholderText('Add a new task...');
    fireEvent.input(input, { target: { value: 'hi' } });
    fireEvent.blur(input);

    expect(
      await screen.findByText(/at least 3 characters/i),
    ).toBeInTheDocument();
  });

  it('calls onSubmit prop instead of addTask', async () => {
    const onSubmitMock = jest.fn();

    render(<TaskForm onSubmit={onSubmitMock} />);

    const input = screen.getByPlaceholderText('Add a new task...');
    const button = screen.getByRole('button', { name: 'Add Task' });

    fireEvent.change(input, { target: { value: 'Custom Task' } });

    await waitFor(() => {
      expect(button).toBeEnabled();
    });

    fireEvent.click(button);

    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalledWith('Custom Task');
    });

    expect(addTaskMock).not.toHaveBeenCalled();
  });
});
