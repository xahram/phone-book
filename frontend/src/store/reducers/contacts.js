import * as actionTypes from "../actionTypes";

const initialState = {
    contacts: [],
    currentUser: {}
}

const contactReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_CONTACTS:
            return { ...state, contacts: action.contacts }
        case actionTypes.GET_CURRENT_USER:
            return { ...state, currentUser: action.currentUser }

        default:
            return state
    }
}

export default contactReducer;