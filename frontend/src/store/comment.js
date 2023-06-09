import jwtFetch from './jwt';
import { fetchIdea } from './idea';
export const RECEIVE_COMMENTS = 'comments/RECEIVE_COMMENTS';
export const RECEIVE_COMMENT = 'comments/RECEIVE_COMMENT';
export const RECEIVE_USER_COMMENTS = 'comments/RECEIVE_USER_COMMENTS';
export const REMOVE_COMMENT = 'comments/REMOVE_COMMENT';
export const RECEIVE_IDEA_COMMENTS = 'comments/RECEIVE_IDEA_COMMENTS';
export const UPDATE_IDEA_COMMENT = 'comments/UPDATE_IDEA_COMMENT';
export const CLEAR_COMMENT_ERRORS = 'comments/CLEAR_COMMENT_ERRORS';
export const RECEIVE_COMMENT_ERRORS =
  'comments/RECEIVE_COMMENT_ERRORS';

const receiveComments = (comments) => ({
  type: RECEIVE_COMMENTS,
  comments,
});

const receiveComment = (comment) => ({
  type: RECEIVE_COMMENT,
  comment,
});

const updateIdeaComment = (comment) => ({
  type: UPDATE_IDEA_COMMENT,
  comment,
});

const receiveUserComments = (comments) => ({
  type: RECEIVE_USER_COMMENTS,
  comments,
});

const receiveIdeaComments = (ideaId, comments) => ({
  type: RECEIVE_IDEA_COMMENTS,
  ideaId,
  comments,
});

const removeComment = (commentId) => ({
  type: REMOVE_COMMENT,
  commentId,
});

const receiveCommentErrors = (errors) => ({
  type: RECEIVE_COMMENT_ERRORS,
  errors,
});

const clearCommentErrors = () => ({
  type: CLEAR_COMMENT_ERRORS,
});

export const getComments = (state) => {
  return state.comments ? Object.values(state.comments) : [];
};

export const getComment = (commentId) => (state) => {
  return state.comment ? state.comment[commentId] : null;
};

export const fetchComments = () => async (dispatch) => {
  try {
    const res = await jwtFetch('/api/comments');
    const comments = await res.json();
    dispatch(receiveComments(comments));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveCommentErrors(resBody.errors));
    }
  }
};

export const fetchComment = (commentId) => async (dispatch) => {
  try {
    const res = await jwtFetch(`/api/comments/${commentId}`);
    const comment = await res.json();
    dispatch(receiveComment(comment));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveCommentErrors(resBody.errors));
    }
  }
};

export const fetchUserComments = (userId) => async (dispatch) => {
  try {
    const res = await jwtFetch(`/api/comments/user/${userId}/`);
    const comments = await res.json();
    dispatch(receiveUserComments(comments));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveCommentErrors(resBody.errors));
    }
  }
};

export const fetchIdeaComments = (ideaId) => async (dispatch) => {
  const res = await fetch(`/api/comments/ideas/${ideaId}`);
  if (res.ok) {
    const comments = await res.json();
    dispatch(receiveIdeaComments(ideaId, comments));
  }
};

export const createComment = (comment, idea) => async (dispatch) => {
  try {
    const res = await jwtFetch(`/api/comments/ideas/${idea._id}`, {
      method: 'POST',
      body: JSON.stringify(comment),
    });
    let newComment = await res.json();
    dispatch(receiveComment(newComment));
    fetchIdeaComments(idea._id);
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveCommentErrors(resBody.errors));
    }
  }
};

export const updateComment = (comment) => async (dispatch) => {
  const res = await jwtFetch(`/api/comments/${comment._id}`, {
    method: 'PATCH',
    body: JSON.stringify(comment),
  });
  const newComment = await res.json();
  dispatch(updateIdeaComment(newComment));
};

export const deleteComment = (commentId) => async (dispatch) => {
  try {
    const res = await jwtFetch(`/api/comments/${commentId}`, {
      method: 'DELETE',
    });
    dispatch(removeComment(commentId));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveCommentErrors(resBody.errors));
    }
  }
};

const nullErrors = null;

export const commentErrorsReducer = (state = nullErrors, action) => {
  switch (action.type) {
    case RECEIVE_COMMENT_ERRORS:
      return action.errors;
    case CLEAR_COMMENT_ERRORS:
      return nullErrors;
    default:
      return state;
  }
};

const commentsReducer = (state = {}, action) => {
  let newState = { ...state };
  switch (action.type) {
    case RECEIVE_COMMENTS:
      return { ...state, ...action.comments };
    case RECEIVE_COMMENT:
      return { ...newState, [action.comment._id]: action.comment };
    case RECEIVE_USER_COMMENTS:
      return { ...newState, ...action.comments };
    case RECEIVE_IDEA_COMMENTS:
      const ideaComments = {};
      for (let comment of action.comments) {
        ideaComments[comment._id] = comment;
      }
      return ideaComments;
    case UPDATE_IDEA_COMMENT:
      newState[action.comment._id] = action.comment;
      return newState;
    case REMOVE_COMMENT:
      delete newState[action.commentId];
      return newState;
    default:
      return state;
  }
};

export default commentsReducer;
