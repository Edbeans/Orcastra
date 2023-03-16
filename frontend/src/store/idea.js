import jwtFetch from './jwt';
import { RECEIVE_COMMENT, REMOVE_COMMENT, RECEIVE_IDEA_COMMENTS } from './comment';

export const RECEIVE_IDEAS = 'ideas/RECEIVE_IDEAS'
export const RECEIVE_IDEA = 'ideas/RECEIVE_IDEA'
export const RECEIVE_USER_IDEAS = 'ideas/RECEIVE_USER_IDEAS'
export const REMOVE_IDEA = 'ideas/REMOVE_IDEA'

export const CLEAR_IDEA_ERRORS = 'ideas/CLEAR_IDEA_ERRORS'
export const RECEIVE_IDEA_ERRORS = 'ideas/RECEIVE_IDEA_ERRORS'

const receiveIdeas = (ideas) => ({
    type: RECEIVE_IDEAS,
    ideas
})

const receiveIdea = (idea) => ({
    type: RECEIVE_IDEA,
    idea
})

const receiveUserIdeas = (ideas) => ({
    type: RECEIVE_USER_IDEAS,
    ideas
})

const removeIdea = (ideaId) => ({
    type: REMOVE_IDEA,
    ideaId
})

const receiveIdeaErrors = (errors) => ({
    type: RECEIVE_IDEA_ERRORS,
    errors
})

const clearIdeaErrors = () => ({
    type: CLEAR_IDEA_ERRORS
})

export const getIdeas = (state) => {
    return state.ideas ? Object.values(state.ideas) : []
}

export const getIdea = (ideaId) => (state) => {
    return state.ideas ? state.ideas[ideaId] : null
}

export const getCommentsForIdeas = (state, ideaId) => {
    const idea = state?.ideas[ideaId]
    return ideaId.comments ? Object.values(idea.comments) : []
}

export const fetchIdeas = () => async dispatch => {
    try {
        const res = await jwtFetch('/api/ideas/')
        const ideas = await res.json()
        dispatch(receiveIdeas(ideas))
    } catch(err) {
        const resBody = await err.json()
        if (resBody.statusCode === 400) {
            return dispatch(receiveIdeaErrors(resBody.errors))
        }
    }
}

export const fetchIdea = (ideaId) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/ideas/${ideaId}`)
        const idea = await res.json()
        dispatch(receiveIdea(idea))
    } catch(err) {
        const resBody = await err.json()
        if (resBody.statusCode === 400) {
            return dispatch(receiveIdeaErrors(resBody.errors))
        }
    }
}

export const fetchUserIdeas = (userId) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/ideas/user/${userId}/`)
        const idea = await res.json()
        dispatch(receiveUserIdeas(idea))
    } catch(err) {
        const resBody = await err.json()
        if (resBody.statusCode === 400) {
            return dispatch(receiveIdeaErrors(resBody.errors))
        }
    }
}

export const createIdea = (title, body, images) => async dispatch => {
    try {
        const formData = new FormData(); 
        formData.append("title", title);
        formData.append("body", body); 
        Array.from(images).forEach(image => formData.append("images", image));

        const res = await jwtFetch('/api/ideas/', {
            method: 'POST',
            body: formData
        })
        let newIdea = await res.json()
        dispatch(receiveIdea(newIdea))
        return newIdea
    } catch (err) {
        const resBody = await err.json()
        if (resBody.statusCode === 400) {
            return dispatch(receiveIdeaErrors(resBody.errors))
        }
    }
}

//need to test this
export const updateIdea = (idea) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/ideas/${idea._id}`, {
            method: 'PATCH',
            body: JSON.stringify(idea)
        })
        let newIdea = await res.json()
        dispatch(receiveIdea(newIdea))
        return newIdea
    } catch (err) {
        const resBody = await err.json()
        if (resBody.statusCode === 400) {
            return dispatch(receiveIdeaErrors(resBody.errors))
        }
    }
}


export const deleteIdea = (ideaId) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/ideas/${ideaId}`,{
            method: 'DELETE'
        })
        dispatch(removeIdea(ideaId))
    } catch (err) {
        const resBody = await err.json()
        if (resBody.statusCode === 400) {
            return dispatch(receiveIdeaErrors(resBody.errors))
        }
    }
}

const nullErrors = null;

export const ideaErrorsReducer = (state = nullErrors, action) => {
    switch (action.type) {
        case RECEIVE_IDEA_ERRORS:
            return action.errors;
        case CLEAR_IDEA_ERRORS:
            return nullErrors
        default: 
            return state;
    }
}

const ideasReducer = (state={}, action) => {
    let newState = {...state}
    switch (action.type) {
        case RECEIVE_IDEAS:
            return action.ideas
        case RECEIVE_IDEA:
            return {...newState, [action.idea._id]: action.idea}
        case RECEIVE_USER_IDEAS:
            return { ...newState, ...action.ideas }
        case RECEIVE_COMMENT:
            const { comment } = action
            const ideaId = comment.idea
            const newIdea = {
                ...newState[ideaId],
                comments: [...newState[ideaId].comments, comment]
            }

            return {...newState, [ideaId]: newIdea}

        case REMOVE_IDEA: 
            delete newState[action.ideaId]
            return newState
        default: 
            return state;
    }
}
//ideas[action.comment.idea ]
export default ideasReducer