import React from 'react';
import s     from './blog-page.module.scss';

const BlogPage = ({
  addPost,
  removePost,
  changePostText,
  posts,
  inputText,
}) => (
  <div className={s.wrap}>
    <div className={s.container}>
      {posts && posts.map((post, index) => (
          <div
            key={index}
            className={s.item}
          >
            <p>{post.text}</p>
            <span
              className={s.remove}
              onClick={e => removePost(post.id)}
            >
              x
            </span>
          </div>
        )
      )}
    </div>

    <form
      className={s['new-post']}
      onSubmit={e => {
        e.preventDefault();
        addPost();
      }}
    >
      <textarea
        onChange={(e) => changePostText(e.target.value)}
        value={inputText}
      />
      <input type='submit' value='New Post' />
    </form>
  </div>
);

export default BlogPage;
