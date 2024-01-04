import React from 'react'

const Header = () => {
    return (
        <div id="topbar" className="d-none d-lg-flex align-items-center fixed-top">
            <div className="container d-flex">
            <div className="contact-info mr-auto">
                <i className="icofont-home "></i> <a href="/">Back to Home</a>
            </div>
            <div className="social-links">
                
                <a href="#/" className="facebook"><i className="icofont-facebook"></i></a>
                <a href="#/" className="twitter"><i className="icofont-twitter"></i></a>
                <a href="#/" className="instagram"><i className="icofont-instagram"></i></a>
                <a href="#/" className="skype"><i className="icofont-youtube"></i></a>
                <a href="#/" className="linkedin"><i className="icofont-linkedin"></i></a>
            </div>
            </div>
        </div>
    )
}

export default Header
