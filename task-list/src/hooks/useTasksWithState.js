import { useState, useEffect } from 'react';
import { getTasks, addTask, removeTask, updateTask } from '../http/taskService';

export function useTasksWithState() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks().then(({ data }) => setTasks(data));
  }, []);

  const handleAddTask = async task => {
    const { data } = await addTask(task);
    setTasks([data, ...tasks]);
  };

  const handleCompleteTask = async id => {
    const completedTask = tasks.map(task => {
      if (task.id === id) {
        task.completed = true;
      }
      return task;
    });

    await updateTask(completedTask.find(task => task.id === id));

    setTasks(completedTask);
  };

  const handleRemoveTask = async id => {
    await removeTask(id);

    setTasks(tasks.filter(task => task.id !== id));
  };

  return {
    tasks,
    handleAddTask,
    handleCompleteTask,
    handleRemoveTask
  };
}
