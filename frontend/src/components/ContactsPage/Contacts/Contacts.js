import React from 'react'
import Contact from './Contact/Contact';
import classes from './Contacts.module.css'
const ContactList = ({ contactlist, onClick }) => {
    // use Map here

    const contacts = contactlist.map((contact) => {
        return (<Contact
            key={contact.id}
            id={contact.id}
            onClick={onClick}
            name={contact.name} />)
    })


    return (<div className={classes.Contacts}>{contacts}</div>)
}

export default ContactList