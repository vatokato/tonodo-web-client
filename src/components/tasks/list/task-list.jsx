import React from 'react';
import styles from './task-list.scss';
import TaskItem from '../item/task-item';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

const TaskList = ({
  items,
  editTaskTitle,
  doneTask,
  unDoneTask,
  deleteTask,
}) => {
  return (
    <div className={cx('list')}>
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
