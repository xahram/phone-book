import React from 'react'
import { NavLink } from 'react-router-dom';
import classes from './Contact.module.css';
import { withRouter } from 'react-router-dom'
const Contact = (props) => {
    return (<NavLink to={"/:" + props.id} >
        <div
            onClick={() => { props.onClick(props.id) }}
            className={classes.Contact}>
            {props.name}
        </div>
    </NavLink >)
}

export default withRouter(Contact)