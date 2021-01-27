import * as actionTypes from '../actionTypes'
// import axios from '../../utils/axios'
import axios from 'axios'


const contactList = (contacts) => {
    return { type: actionTypes.GET_ALL_CONTACTS, contacts: contacts }
}

export const getContactsList = (history) => {
    return (dispatch,getState) => {
        console.log("Within Dispatch")
        axios.get("http://127.0.0.1:5000/api/v1/contacts-list")
            .then((res) => {
                console.log("Within axios")
                console.log(res.data)
                dispatch(contactList(res.data.contacts))
                dispatch({type:actionTypes.GET_CURRENT_USER, currentUser:res.data.contacts[0]})
                // console.log(getState().currentUser.id)
                history.push("/:"+getState().currentUser.id)
            })
            .catch((err) => {
                console.log(err)
            })
        return contactList()
    }
}


