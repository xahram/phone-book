import React from 'react'
import Contacts from './Contacts/Contacts'
import ContactInfo from './ContactInfo/ContactInfo'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/contactsActions'
import classes from './ContactsPage.module.css';
import { Route } from 'react-router-dom'
const ContactsPage = (props) => {
    function onClickHandler(id) {

    }
    console.log(props)
    React.useEffect(() => {
        props.getContactsList(props.history)
    }, [])
    return (<div className={classes.ContactsPage}>
        <Contacts onClick={onClickHandler} contactlist={props.contacts} />
        <Route path="/:id" render={() => { return (<ContactInfo ></ContactInfo>) }} />
        {/* <ContactInfo></ContactInfo> */}
    </div>)
}

const mapStateToProps = (state) => {
    return {
        contacts: state.contacts
    }
}
const mapActionsToDispatch = (dispatch) => {
    return {
        getContactsList: (history) => { dispatch(actions.getContactsList(history)) }
    }
}
export default connect(mapStateToProps, mapActionsToDispatch)(ContactsPage);