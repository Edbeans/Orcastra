import jwtFetch from './jwt';

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

export const createIdea = (idea) => async dispatch => {
    try {
        // debugger
        const res = await jwtFetch('/api/ideas/', {
            method: 'POST',
            body: JSON.stringify(idea)
        })
        let newIdea = await res.json()
        console.log(idea)
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
        const res = await jwtFetch(`api/idea/${ideaId}`,{
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
    switch (action.typee) {
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
            // const idea = action.idea
            // console.log('idea', idea)
            // newState[idea.id] = idea
            // return newState
            return {...newState, [action.idea._id]: action.idea}
        case RECEIVE_USER_IDEAS: 
            return {...newState, ...action.ideas}
        case REMOVE_IDEA: 
            delete newState[action.ideaId]
            return newState
        default: 
            return state;
    }
}

export default ideasReducer