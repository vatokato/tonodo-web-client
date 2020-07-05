import React, { useState, useEffect } from 'react';
import styles from './task-item.scss';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

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
    <div className={cx('item', checked && 'done')}>
      <div className={cx('content')}>
        <span className={cx('input-container')}>
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
            className={cx('title-input')}
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
            className={cx('title')}
            onDoubleClick={(e) => setDoEdit(true)}
          >
            {title}
          </span>
          )
        }
      </div>
      <div className={cx('control')}>
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
