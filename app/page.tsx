import { TaskForm } from '@/components/app/tasks/taskform';
import { TaskList } from '@/components/app/tasks/tasklist';

export const Home = () => {
  return (
    <>
      <TaskForm />
      <TaskList />
    </>
  );
};

export default Home;
