import React from 'react'
import classes from './Image.module.css'
const Image = React.forwardRef((props, ref) => {
    return (<div className={classes.Image}><img ref={ref} src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png" alt="profile" /></div>)
})

export default Image