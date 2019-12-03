import React from 'react';
import { Form } from './Form';
import { TaskList } from './TaskList';
import { useTasksWithState } from '../hooks/useTasksWithState';

export default function Home() {
  const {
    tasks,
    handleAddTask,
    handleCompleteTask,
    handleRemoveTask
  } = useTasksWithState();

  return (
    <React.Fragment>
      <Form onAddTask={handleAddTask} />
      <hr />
      <div className="row">
        <div className="col-12 col-sm-6 mt-4">
          <h3>Task</h3>
          <hr />
          <TaskList
            tasks={tasks.filter(task => !task.completed)}
            onComplete={handleCompleteTask}
            onRemove={handleRemoveTask}
          />
        </div>
        <div className="col-12 col-sm-6 mt-4">
          <h3>Completed task</h3>
          <hr />
          <TaskList
            tasks={tasks.filter(task => task.completed)}
            onComplete={handleCompleteTask}
            onRemove={handleRemoveTask}
          />
        </div>
      </div>
    </React.Fragment>
  );
}
