import jwtFetch from "./jwt"

const RECEIVE_USER = 'user/RECEIVE_USER'
const RECEIVE_ERRORS = 'user/RECEIVE_ERRORS'
const CLEAR_USER_ERRORS = 'user/CLEAR_USER_ERRORS'


const receiveUser = (user) => ({
    type: RECEIVE_USER,
    user
})

const receiveErrors = (errors) => ({
    type: RECEIVE_ERRORS,
    errors
})

const clearUserErrors = () => ({
    type: CLEAR_USER_ERRORS
})

export const getUser = (userId) => state => {
    return state.users ? state.users[userId] : null
}



export const fetchUser = (userId) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/users/${userId}/`)
        if (res.ok) {
            const user = await res.json()
            return dispatch(receiveUser(user))
        }
    } catch (err) {
        const res = await err.json()
        if (res.statusCode === 400) {
            return dispatch(receiveErrors(res.errors))
        }
    }
}

export const userErrorsReducer = (state=null, action) => {
    switch(action.type) {
        case RECEIVE_ERRORS: 
            return action.errors
        case CLEAR_USER_ERRORS:
            return null;
        default: 
            return state;
    }
}

const usersReducer = (state={}, action) => {
    switch (action.type) {
        case RECEIVE_USER:
            return action.user
        default: 
            return state
    }
}

export default usersReducer