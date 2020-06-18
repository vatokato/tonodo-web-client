import {
  addTask,
  deleteTask,
  doneTask,
  unDoneTask,
  changeNewTaskText, editTaskTitle,
} from '../actions/tasks';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import TasksPage from '../components/tasks/';
import { getNewTaskText, getTasks } from "../selectors/tasks";
import { getActiveFolder, getFolders, getNewFolderText } from "../selectors/taskFolders";
import { addFolder, changeFolder, changeNewFolderText, deleteFolder } from "../actions/taskFolders";

const mapStateToProps = (store) => ({
  newTaskText: getNewTaskText(store),
  items: getTasks(store),
  activeFolder: getActiveFolder(store),
  folders: getFolders(store),
  newFolderText: getNewFolderText(store),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  addNewTask: e => {
    e.preventDefault();
    return addTask();
  },
  changeNewTaskText: e => {
    e.preventDefault();
    return changeNewTaskText(e.target.value);
  },
  editTaskTitle: task => editTaskTitle(task),
  doneTask: id => doneTask(id),
  unDoneTask: id => unDoneTask(id),
  deleteTask: id => deleteTask(id),

  changeFolder: folderId => changeFolder(folderId),
  changeNewFolderText: text => changeNewFolderText(text),
  addNewFolder: () => addFolder(),
  deleteFolder: id => deleteFolder(id),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TasksPage);
