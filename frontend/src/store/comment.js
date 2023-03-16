import jwtFetch from './jwt';

export const RECEIVE_COMMENTS = 'comments/RECEIVE_COMMENTS'
export const RECEIVE_COMMENT = 'comments/RECEIVE_COMMENT'
export const RECEIVE_USER_COMMENTS = 'comments/RECEIVE_USER_COMMENTS'
export const REMOVE_COMMENT = 'comments/REMOVE_COMMENT'

export const CLEAR_COMMENT_ERRORS = 'comments/CLEAR_COMMENT_ERRORS'
export const RECEIVE_COMMENT_ERRORS = 'comments/RECEIVE_COMMENT_ERRORS'

const receiveComments = (comments) => ({
    type: RECEIVE_COMMENTS,
    comments
})

const receiveComment = (comment) => ({
    type: RECEIVE_COMMENT,
    comment
})

const receiveUserComments = (comments) => ({
    type: RECEIVE_USER_COMMENTS,
    comments
})

const removeComment = (commentId) => ({
    type: REMOVE_COMMENT,
    commentId
})

const receiveCommentErrors = (errors) => ({
    type: RECEIVE_COMMENT_ERRORS,
    errors
})

const clearCommentErrors = () => ({
    type: CLEAR_COMMENT_ERRORS
})

export const getComments = (state) => {
    return state.comments ? Object.values(state.comments) : []
}

export const getComment = (commentId) => (state) => {
    return state.comment ? state.comment[commentId] : null
}

export const fetchComments = () => async dispatch => {
    try {
        const res = await jwtFetch('/api/comments/')
        const comments = await res.json()
        dispatch(receiveComments(comments))
    } catch(err) {
        const resBody = await err.json()
        if (resBody.statusCode === 400) {
            return dispatch(receiveCommentErrors(resBody.errors))
        }
    }
}

export const fetchComment = (commentId) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/comments/${commentId}`)
        const comment = await res.json()
        dispatch(receiveComment(comment))
    } catch(err) {
        const resBody = await err.json()
        if (resBody.statusCode === 400) {
            return dispatch(receiveCommentErrors(resBody.errors))
        }
    }
}

export const fetchUserComments = (userId) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/comments/user/${userId}/`)
        const comments = await res.json()
        dispatch(receiveUserComments(comments))
    } catch(err) {
        const resBody = await err.json()
        if (resBody.statusCode === 400) {
            return dispatch(receiveCommentErrors(resBody.errors))
        }
    }
}

export const createComment = (comment) => async dispatch => {
    // fix this
    console.log(comment.idea)
    try {
        const res = await jwtFetch(`/api/comments/ideas/${comment.idea}`, {
            method: 'POST',
            body: JSON.stringify(comment)
        })
        let newComment = await res.json()
        dispatch(receiveComment(newComment))
        return newComment
    } catch (err) {
        const resBody = await err.json()
        if (resBody.statusCode === 400) {
            return dispatch(receiveCommentErrors(resBody.errors))
        }
    }
}

export const updateComment = (comment) => async dispatch => {
    try {
        const res = await jwtFetch(`api/comments/${comment._id}`, {
            method: 'PATCH',
            body: JSON.stringify(comment)
        })
        let newComment = await res.json()
        dispatch(receiveComment(newComment))
        return newComment
    } catch (err) {
        const resBody = await err.json()
        if (resBody.statusCode === 400) {
            return dispatch(receiveCommentErrors(resBody.errors))
        }
    }
}

export const deleteComment = (commentId) => async dispatch => {
    try {
        const res = await jwtFetch(`api/comment/${commentId}`,{
            method: 'DELETE'
        })
        dispatch(removeComment(commentId))
    } catch (err) {
        const resBody = await err.json()
        if (resBody.statusCode === 400) {
            return dispatch(receiveCommentErrors(resBody.errors))
        }
    }
}

const nullErrors = null;

export const commentErrorsReducer = (state = nullErrors, action) => {
    switch (action.typee) {
        case RECEIVE_COMMENT_ERRORS:
            return action.errors;
        case CLEAR_COMMENT_ERRORS:
            return nullErrors
        default: 
            return state;
    }
}

const commentsReducer = (state={}, action) => {
    let newState = {...state}
    switch (action.type) {
        case RECEIVE_COMMENTS:
            return action.comments
        case RECEIVE_COMMENT:
            return {...newState, [action.comment._id]: action.comment}
        case RECEIVE_USER_COMMENTS: 
            return {...newState, ...action.comments}
        case REMOVE_COMMENT: 
            delete newState[action.commentId]
            return newState
        default: 
            return state;
    }
}

export default commentsReducer