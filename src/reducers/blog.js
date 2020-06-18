import db from '../localDB';

const ADD_POST = 'ADD_POST';
const CHANGE_NEW_POST_TEXT = 'CHANGE_NEW_POST_TEXT';
const REMOVE_POST = 'REMOVE_POST';

const initialState =  {
  posts: db.get('posts') || [],
  inputText: '',
};

const blogReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_POST:
      if(state.inputText) {
        const posts = [
          {
            id: new Date().getTime(),
            text: state.inputText,
            lastModified: new Date().getTime(),
          },
          ...state.posts
        ];
        db.set('posts', posts);
        return {
          ...state,
          inputText: '',
          posts: posts
        }
      }
      return state;
    case CHANGE_NEW_POST_TEXT:
      return {...state, inputText: payload.text};
    case REMOVE_POST:
      const newPosts = state.posts.filter(post => post.id !== payload.id);
      db.set('posts', newPosts);
      return {...state, posts: newPosts};
    default:
      return state;
  }
};

export default blogReducer;


export const addPostCreator = () => ({
  type: ADD_POST,
});

export const changeNewPostTextCreator = (text) => ({
  type: CHANGE_NEW_POST_TEXT,
  payload: { text },
});

export const removePostCreator = (id) => ({
  type: REMOVE_POST,
  payload: { id },
});

