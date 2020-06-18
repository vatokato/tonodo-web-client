import React, { useState, useEffect } from 'react';
import s from './task-item.module.scss';

const TaskItem = ({
  id,
  checked,
  text,
  editTaskTitle,
  doneTask,
  unDoneTask,
  deleteTask,
}) => {
  const [doEdit, setDoEdit] = useState(false);
  const [title, setTitle] = useState(text);

  useEffect(() => {
    setTitle(text);
  }, [text]);

  useEffect(() => {
    console.log('effect')
    window.addEventListener('onKeyDown', e => {
      console.log(e.target)
    });
    return () => {
      console.log('unmount effect')
    }
  }, []);

  return (
    <div className={`${s.item} ${checked ? s.done : ''}`}>
      <div className={s.content}>
        <span className={s['input-container']}>
          <input
            name={`task-${id}`}
            type='checkbox'
            onChange={e => checked ? unDoneTask(id) : doneTask(id)}
            checked={checked}
          />
        </span>
        {doEdit
        ? (
          <input
            className={s['title-input']}
            type='text'
            value={title}
            onChange={e => setTitle(e.target.value)}
            autoFocus={true}
            onBlur={e => {
              setDoEdit(false);
              editTaskTitle({
                title: e.target.value,
                id
              });
            }}
          />
          )
        : (
          <span
            className={s.title}
            onDoubleClick={(e) => setDoEdit(true)}
          >
            {title}
          </span>
          )
        }
      </div>
      <div className={s.control}>
        <a
          href={`/remove-task/${id}`}
          onClick={e => {
            e.preventDefault();
            deleteTask(id);
          }}
        >
          x
        </a>
      </div>
    </div>
  )
};

export default TaskItem;
