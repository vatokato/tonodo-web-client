import React from 'react';
import styles from './blog-page.scss';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

const BlogPage = ({
  addPost,
  removePost,
  changePostText,
  posts,
  inputText,
}) => (
  <div className={cx('wrap')}>
    <div className={cx('container')}>
      {posts && posts.map((post, index) => (
          <div
            key={index}
            className={cx('item')}
          >
            <p>{post.text}</p>
            <span
              className={cx('remove')}
              onClick={e => removePost(post.id)}
            >x</span>
          </div>
        )
      )}
    </div>

    <form
      className={cx('new-post')}
      onSubmit={e => {
        e.preventDefault();
        addPost();
      }}
    >
      <textarea
        onChange={(e) => changePostText(e.target.value)}
        value={inputText}
      />
      <input type='submit' value='New Post'/>
    </form>
  </div>
);

export default BlogPage;
