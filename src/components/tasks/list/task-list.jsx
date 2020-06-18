import React from 'react';
import s from './task-list.module.scss';
import TaskItem from '../item/task-item';

const TaskList = ({
  items,
  editTaskTitle,
  doneTask,
  unDoneTask,
  deleteTask,
}) => {
  return (
    <div className={s.list}>
      {Array.isArray(items) && items.map(({ _id: id, completed, title }, index) => (
        <TaskItem
          key={index}
          id={id}
          checked={completed}
          text={title}
          editTaskTitle={editTaskTitle}
          doneTask={doneTask}
          unDoneTask={unDoneTask}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  )
};

export default TaskList;
