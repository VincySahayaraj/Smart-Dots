import React from 'react'
const Year=new Date().getFullYear()

const Footer = () => {
    return (
        <footer id="footer">
            <div className="footer-top">
                <div className="container">
                    <div className="row">
 
                    <div className="col-lg-3 col-md-6 footer-links">
                        <h4>Solutions</h4>
                        <ul>
                        <li><i className="bx bx-chevron-right"></i> <a href="/automower">Robotic Mowers</a></li>
                        <li><i className="bx bx-chevron-right"></i> <a href="/smart-irrigation">Spruce Irrigation</a></li>
                       {/*  <li><i className="bx bx-chevron-right"></i> <a href="#/">Smart Home</a></li> */}
                        <li><i className="bx bx-chevron-right"></i> <a href="services">Our Services </a></li>
                        
                        </ul>
                    </div>

                    <div className="col-lg-3 col-md-6 footer-links">
                        <h4>Company</h4>
                        <ul>
                        <li><i className="bx bx-chevron-right"></i> <a href="/about-us">About</a></li>
                       {/*  <li><i className="bx bx-chevron-right"></i> <a href="#/">Store</a></li> */}
                        <li><i className="bx bx-chevron-right"></i> <a rel="noreferrer" target="_blank" href="https://blog.smart-dots.com/">BLOG</a></li>
                        
                        </ul>
                    </div>

                    <div className="col-lg-3 col-md-6 footer-links">
                        <h4>Support</h4>
                        <ul>
                        {/* <li><i className="bx bx-chevron-right"></i> <a href="#/">Support Page</a></li> */}
                        <li><i className="bx bx-chevron-right"></i> <a href="/contact-us">Contact Us</a></li>
                        {/* <li><i className="bx bx-chevron-right"></i> <a href="#/">User Login</a></li> */}
                        
                        </ul>
                    </div>

                    <div className="col-lg-3 col-md-6 footer-links">
                        <h4>Quick Contact</h4>
                        <ul>
                        <li><a href="#/">info@smart-dots com</a></li>
                        <li><a href="#/">469.629.6922</a></li>
                        
                        </ul>
                    </div>

                    </div>
                </div>
                </div>

            
                <div className="container-fluid py-4">
                <div className="copyright pt-5">
                <p className="mb-0 text-support"><a href="https://smart-dots.zendesk.com/hc/en-us" rel="noreferrer" style={{color: '#f0a400', fontSize: '2rem'}} target="_blank"><span><img src="assets/img/support.png" width="30px" alt="" /></span> Support</a></p>
                    <p>{Year} © Smart-dots.com. All Rights Reserved. Powered By Claruz Digital</p>
                </div>
                <div className="credits mr-2">
                    
                    <img src="assets/img/wave.png" width="100px" alt="" /><br />
                    Z-Wave <br />Certified Installer
                </div>
                <div className="credits mr-2">
                
                    <img src="assets/img/au-deal.png" width="65px" alt="" /><br />
                    Husqvarna <br />Authorized dealer
                </div>
                <div className="credits mr-2 pt-4">
                
                    <img src="assets/img/safely-team.png" width="150px" alt="" />
                </div>
                <div className="credits mr-2 pt-3">
                
                    <img src="assets/img/spruce.png" width="150px" alt="" /><br />
                    Partner
                </div>
            </div>
        </footer>
    )
}

export default Footer
