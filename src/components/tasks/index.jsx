import React from 'react';
import styles from './tasks.scss';
import TaskForm from './form/task-form';
import TaskList from './list/task-list';
import Folders from './folders/folders';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

const TasksPage = ({
  newTaskText,
  items,
  folders,
  activeFolder,
  addNewTask,
  changeNewTaskText,
  editTaskTitle,
  doneTask,
  unDoneTask,
  deleteTask,
  changeFolder,
  newFolderText,
  changeNewFolderText,
  addNewFolder,
  deleteFolder,
}) => {
  return (
    <div className={cx('container')}>
      <main className={cx('content')}>
        <TaskForm
          addNewTask={addNewTask}
          changeNewTaskText={changeNewTaskText}
          newTaskText={newTaskText}
        />
        <TaskList
          items={items}
          activeFolder={activeFolder}
          editTaskTitle={editTaskTitle}
          doneTask={doneTask}
          unDoneTask={unDoneTask}
          deleteTask={deleteTask}
        />
      </main>

      <div className={cx('aside')}>
        <Folders
          activeFolder={activeFolder}
          folders={folders}
          changeFolder={changeFolder}
          newFolderText={newFolderText}
          changeNewFolderText={changeNewFolderText}
          addNewFolder={addNewFolder}
          deleteFolder={deleteFolder}
        />
      </div>
    </div>
  );
}


export default TasksPage;
