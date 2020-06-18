import React from 'react';
import s from './folders.module.scss';

const Folders = ({
  changeFolder,
  activeFolder,
  folders,
  newFolderText,
  changeNewFolderText,
  addNewFolder,
  deleteFolder,
}) => (
  <div className={s.container}>
    <ul className={s.folders}>
      {folders && folders.map(({ _id, title, editable }, index) => (
        <li
          key={index}
          className={activeFolder._id === _id ? s.active : ''}
        >
          <span
            className={s.title}
            onClick={() => changeFolder(_id)}
          >
            {title}
          </span>
          {editable && (<span
            className={s.action}
            onClick={() => deleteFolder(_id)}
          >
            x
          </span>)}
        </li>
      ))}
    </ul>

    <form
      onSubmit={e => {
        e.preventDefault();
        addNewFolder();
      }}
      className={s.form}>
      <input
        type="text"
        placeholder='Новая папка'
        value={newFolderText}
        onChange={e => changeNewFolderText(e.target.value)}
        className={s['form-text']}
      />
      <button>ok</button>
    </form>
  </div>
);

export default Folders;
