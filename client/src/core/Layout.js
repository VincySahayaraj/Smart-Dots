import React, {Fragment} from 'react'
import Header from './Header'
import Footer from './Footer'

const Layout = ({children}) => {
    return (
        <Fragment>
            <Header />
                {children}
            <Footer />    
            <div id="preloader"></div>   
        </Fragment>
    )
}

export default Layout
