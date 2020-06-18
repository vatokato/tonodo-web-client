import React from 'react';
import s  from './task-form.module.scss';

const TaskForm = ({
  newTaskText,
  addNewTask,
  changeNewTaskText,
}) => (
  <form
    onSubmit={addNewTask}
    className={s.container}>
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
