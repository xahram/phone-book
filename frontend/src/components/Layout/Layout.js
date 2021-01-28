import React from 'react'
import { Toaster } from 'react-hot-toast'
const Layout = (props) => {
    return (<>
        <header></header>
        <main>
            {props.children}
            <Toaster />
        </main>
        <footer></footer>
    </>)
}

export default Layout