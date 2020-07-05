import React from 'react';
import styles  from './task-form.scss';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

const TaskForm = ({
  newTaskText,
  addNewTask,
  changeNewTaskText,
}) => (
  <form
    onSubmit={addNewTask}
    className={cx('container')}>
    <input
      type="text"
      placeholder='Новая запись'
      onChange={changeNewTaskText}
      value={newTaskText}
    />
    <button>ok</button>
  </form>
);

export default TaskForm;
