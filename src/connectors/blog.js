import {
  addPostCreator,
  changeNewPostTextCreator,
  removePostCreator
} from '../reducers/blog';
import BlogPage from '../components/blog-page/';
import {connect} from 'react-redux';

const mapStateToProps = state => {
  const {blogPage} = state;
  return ({
    posts: blogPage.posts,
    inputText: blogPage.inputText,
  })
};

const mapDispatchToProps = dispatch => ({
  removePost: postId => dispatch(removePostCreator(postId)),
  addPost: () => dispatch(addPostCreator()),
  changePostText: text => dispatch(changeNewPostTextCreator(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BlogPage);
