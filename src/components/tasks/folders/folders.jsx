import React from 'react';
import styles from './folders.scss';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

const Folders = ({
  changeFolder,
  activeFolder,
  folders,
  newFolderText,
  changeNewFolderText,
  addNewFolder,
  deleteFolder,
}) => (
  <div className={cx('container')}>
    <ul className={cx('folders')}>
      {folders && folders.map(({ _id, title, editable }, index) => (
        <li
          key={index}
          className={cx({
            active: _id === activeFolder._id,
          })}
        >
          <span
            className={cx('title')}
            onClick={() => changeFolder(_id)}
          >
            {title}
          </span>
          {editable && (<span
            className={cx('action')}
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
      className={cx('form')}>
      <input
        type="text"
        placeholder='Новая папка'
        value={newFolderText}
        onChange={e => changeNewFolderText(e.target.value)}
        className={cx('form-text')}
      />
      <button>ok</button>
    </form>
  </div>
);

export default Folders;
