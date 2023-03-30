import CommentIndexItem from './CommentIndexItem';
import { useDispatch, useSelector } from 'react-redux';
import {
  createComment,
  fetchIdeaComments,
} from '../../store/comment';
import { useState, useEffect } from 'react';
import './Comments.css';

export default function CommentContainer({ idea }) {
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);
  const comments = useSelector((state) =>
    Object.values(state.comments)
  );

  useEffect(() => {
    dispatch(fetchIdeaComments(idea._id));
  }, [idea._id]);

  const [commentText, setCommentText] = useState('');
  let comment = {
    author: '',
    idea: '',
    text: '',
  };

  if (!comments) return null;

  if (!sessionUser) {
    return (
      <div className='isp-comments-display'>
        {comments
          .sort(
            (a, b) =>
              new Date(a.date_created) - new Date(b.date_created)
          )
          .map((comment) => (
            <CommentIndexItem key={comment._id} comment={comment} />
          ))}
      </div>
    );
  } else {
    const author = sessionUser._id;
    function handleCommentSubmit(e, errors) {
      e.preventDefault();
      const newComment = {
        ...comment,
        author,
        idea: idea._id,
        text: commentText,
      };
      dispatch(createComment(newComment, idea));
      setCommentText('');
    }
    return (
      <div>
        <form
          className='isp-create-comment-form'
          onSubmit={handleCommentSubmit}
        >
          <div className='form-input-group'>
            <textarea
              className='form-inputs'
              id='create-comment-textbox'
              onChange={(e) => setCommentText(e.target.value)}
              required
            />
            <span className='form-input-labels'>
              Write your comments here
            </span>
          </div>
          <button
            className='default-button-1'
            id='create-comment-submit-button'
          >
            Submit
          </button>
        </form>

        <div className='isp-comments-display'>
          {comments
            .sort(
              (a, b) =>
                new Date(a.date_created) - new Date(b.date_created)
            )
            .map((comment) => (
              <div>
                <CommentIndexItem comment={comment} />
              </div>
            ))}
        </div>
      </div>
    );
  }
}
