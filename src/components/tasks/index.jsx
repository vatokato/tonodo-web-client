import React from 'react';
import s from './tasks.module.scss';
import TaskForm from './form/task-form';
import TaskList from './list/task-list';
import Folders from './folders/folders';

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
    <div className={s.container}>
      <main className={s.content}>
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

      <div className={s.aside}>
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
