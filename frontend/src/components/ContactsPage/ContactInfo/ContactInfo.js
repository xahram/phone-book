import React from 'react'
import classes from './ContactInfo.module.css'
import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actionTypes'
import { NavLink, withRouter } from 'react-router-dom'

const ContactInfo = (props) => {
    console.log(props)
    React.useEffect(() => {
        // This will cause issur that currUser is undefined 
        // thats because when we directly type something as id in url
        // then this params id will be true on first time this useeffect runs
        // also keep in mind that this will run first before its parent's useeffect
        // hence no dispatch and hence state of contact list will be empty [] 
        // causing to acces contact[0] => undefined
        if (props.match.params.id && props.contacts.length) {
            const id = props.match.params.id.slice(1, props.match.params.id.length)
            const currUser = props.contacts.filter((curr) => {
                return id === curr.id
            })
            props.getCurrentUser(currUser[0])
            // console.log(props)
        }
        console.log(props.match.params.id)
    }, [props.match.params.id])
    return (<>
        <div data-aos="fade-left" className={classes.ContactInfo}>
            <h1>Contact Details</h1>
            <div className={classes.MainContent}>
                <div className={classes.profiledata}>
                    <div>
                        <img
                            src={props.currentUser.profilePic
                                ? 'http://localhost:5000' + props.currentUser.profilePic
                                : "https://cdn0.iconfinder.com/data/icons/social-media-network-4/48/male_avatar-512.png"}
                            alt="profile" />
                    </div>
                    <div>
                        <p><i class="fas fa-user"></i>  {props.currentUser.name}</p>
                        <p><i class="fas fa-phone"></i>  {props.currentUser.phoneNumber}</p>
                        <p><i class="fas fa-map-marker-alt"></i>  {props.currentUser.address}</p>
                    </div>
                </div>
                <div className={classes.bio}>
                    <p>{props.currentUser.bio}</p>
                </div>
                <NavLink to="/add-contact"> <button className={classes.btn}>Add New Contact</button></NavLink>
            </div>
        </div></>)
}

const mapStateToProps = (state) => {
    return {
        contacts: state.contacts,
        currentUser: state.currentUser
    }
}
const mapActionToProps = (dispatch) => {
    return {
        getCurrentUser: (currUser) => { dispatch({ type: actionTypes.GET_CURRENT_USER, currentUser: currUser }) }
    }
}
export default withRouter(connect(mapStateToProps, mapActionToProps)(ContactInfo))