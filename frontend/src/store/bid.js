import jwtFetch from './jwt';

export const RECEIVE_BID = 'bids/RECEIVE_BID'
export const RECEIVE_BIDS = 'bids/RECEIVE_BIDS'
export const RECEIVE_USER_BIDS = 'bids/RECEIVE_USER_BIDS'
export const RECEIVE_IDEA_BIDS = 'bids/RECEIVE_IDEA_BIDS'
export const UPDATE_IDEA_BID = 'bids/UPDATE_IDEA_BID'
export const REMOVE_BID = 'bids/REMOVE_BID'

export const CLEAR_BID_ERRORS = 'bids/CLEAR_BID_ERRORS'
export const RECEIVE_BID_ERRORS = 'bids/RECEIVE_BID_ERRORS'

export const receiveBids = (bids) => ({
    type: RECEIVE_BIDS,
    bids
})

export const receiveBid = (bid) => ({
    type: RECEIVE_BID,
    bid
})

export const receiveUserBids = bids => ({
    type: RECEIVE_USER_BIDS,
    bids
})

export const receiveIdeaBids = bids => ({
    type: RECEIVE_IDEA_BIDS,
    bids
})

export const updateIdeaBid = bid => ({
    type: UPDATE_IDEA_BID,
    bid
})

export const removeBid = bidId => ({
    type: REMOVE_BID,
    bidId
})

export const receiveBidErrors = errors => ({
    type: RECEIVE_BID_ERRORS,
    errors
})

export const clearBidErrors = () => ({
    type: CLEAR_BID_ERRORS
})

export const getBids = (state) => {
    return state.bids ? Object.values(state.bids) : []
}

export const getBid = bidId => state => {
    return state.bids ? state.bids[bidId] : null
}



export const fetchBids = () => async dispatch => {
    try {
        const res = await jwtFetch('api/bids');
        const bids = await res.json();
        dispatch(receiveBids(bids))
    } catch (err) {
        const resBody = await err.json()
        if (resBody.statusCode === 400) {
            return dispatch(receiveBidErrrors(resBody.errors));
        }
    }
};

export const fetchBid = (bidId) => async dispatch => {
    try {
        const res = await jwtFetch(`api/bids/${bidId}`);
        const bid = await res.json();
        dispatch(receiveBid(bid))
    } catch (err) {
        const resBody = await err.json()
        if(resBody.statusCode === 400) {
            return dispatch(receiveBidErrors(resBody.errors))
        }
    }
};

export const createBid = (bid) => async dispatch => {
    try {
        const res = await jwtFetch(`api/bids`, {
            method: 'POST',
            body: json.stringify(comment)
        })
        let newBid = await res.json();
        dispatch(receiveBid(newBid));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCod === 400) {
            return dispatch(receiveBidErrors(resBody.errors));
        }
    }
}

export const updateBid = (bid) => async dispatch => {
    try {
        const res = await jwtFetch(`api/bids/${bid._id}`,{
            method: 'PATCH',
            body: json.stringify(bid)
        })
        const updatedBid = await res.json()
        dispatch(updateIdeaBid(bid))
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            return dispatch(receiveBidErrors(resBody.errors));
        }
    }
}

export const deleteBid = (bidId) => async dispatch => {
    try {
        const res = await jwtFetch(`api/bids/${bidId}`, {
            method: 'DELETE'
        });
        if (res.ok) {
            dispatch(removeBid(bidId))
        }
    } catch (err) {
        const resBody = await err.json();
        if(resBody.statusCode === 400) {
            return dispatch(receiveCommentErrors(resBody.errors));
        }
    }
};

const nullErrors = null;

export const  bidErrorsReducer = (state = nullErrors, action) => {
    switch (action.type) {
        case RECEIVE_BID_ERRORS:
            return action.errors;
        case CLEAR_BID_ERRORS:
            return nullErrors;
        default: 
            return state;
    }
};

const bidsReducer =  (state={}, action) => {
    let newState = {...state}
    switch (action.type) {
        case RECEIVE_BIDS:
            return {...state, ...action.bids}
        case RECEIVE_BID:
            return {...state, [action.bid._id]: action.bid}
        case RECEIVE_USER_BIDS:
            return {...newState, ...action.bids}
        case RECEIVE_IDEA_BIDS:
            const ideaBids = {}
            for (let bid of action.bids) {
                ideaBids[bid._id] = bid
            }
            return ideaBids
        case REMOVE_BID:
            delete newState[action.bidId];
            return newState
        default: 
            return state;
    }
}

export default bidsReducer;