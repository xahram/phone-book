import React from 'react'
import classes from './Image.module.css'
const Image = React.forwardRef((props, ref) => {
    return (<div className={classes.Image}><img ref={ref} src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" alt="profile" /></div>)
})

export default Image