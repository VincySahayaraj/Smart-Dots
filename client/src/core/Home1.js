import React, {useState} from 'react'
import Layout from './Layout'
import {createContact} from '../Apis/apis'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
  
const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
}));

const Home = () => {

    const classes = useStyles();

    const [openContErr, setOpenContErr] = useState(false);

    const [contactValues, setContactValues] = useState({
        contactName:'',
        email:'',
        message:'',
        contactSuccess:false,
        contactError:'',
        btnloading:false
    });

    const { contactName, email, message, contactSuccess, contactError, btnloading } = contactValues;

    const handleChangeContact = name => event => {
        setOpenContErr(false);
        setContactValues({ ...contactValues, contactError: false, [name]: event.target.value,btnloading:false});
    };

    const clickSubmitContact = (e) => {
        e.preventDefault();
        setContactValues({...contactValues, contactSuccess:false, contactError: '',btnloading:true });
        createContact({contactName, message, email,reg_type:1})
        .then(data => {
            if(data.error) {
                setOpenContErr(true);
                setContactValues({...contactValues, contactSuccess:false, contactError: data.error,btnloading:false });
            } else {
                setContactValues({
                    ...contactValues,
                    contactName:'',
                    email:'',
                    message:'',
                    contactSuccess:true,
                    contactError: '', 
                    btnloading:false 
                });
            }
        });
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpenContErr(false);
    }

    const handleCloseSuccess = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setContactValues({...contactValues, contactSuccess: false})
    }

    return (
        <Layout>

            {/* <!-- Start Portfolio Details Section --> */}

            <section className="portfolio-details">
                <div className="container-fluid px-0">

                    <div className="portfolio-details-container">

                        <div className="owl-carousel portfolio-details-carousel mar-top-fot">
                            <img rel="preload" as="image" src="assets/img/slider/slider-1.webp" className="img-fluid" alt="" />                
                        </div>

                        <div className="portfolio-info wid-35">
                            <h1 style={{fontSize: '2.3rem'}}>Get an<br/>
                ‘always mowed’ lawn</h1>
                            <p style={{fontSize: 'small'}}>Our residential and commercial robotic lawn mower solutions ensures that your lawn remains mowed throughout the year, while giving you time to tackle other important things.</p>
                            <div className="col-md-12 top-phone mb-2">
                                <i className="icofont-ui-call"></i> : (469) 629-6922 FOR A FREE DEMO
                            </div>
                            
                            <div className="col-lg-12 px-0">
                                <form className="php-email-form">
                                    <div className="form-row">
                                        <div className="col form-group">
                                            <input type="text" onChange={handleChangeContact('contactName')} name="name" className="form-control form-radi" id="name" placeholder="Your Name" value={contactName} data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
                                            <div className="validate"></div>
                                        </div>
                                        <div className="col form-group">
                                            <input type="email" onChange={handleChangeContact('email')} className="form-control form-radi" value={email} name="email" id="email" placeholder="Your Email" data-rule="email" data-msg="Please enter a valid email" />
                                            <div className="validate"></div>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="col form-group">
                                        <input type="text" name="message" onChange={handleChangeContact('message')} className="form-control form-radi" id="name" value={message} placeholder="Your Message" data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
                                        <div className="validate"></div>
                                        </div>
                                        <div className="col form-group">
                                        <div className="text-center"><button onClick={clickSubmitContact} type="submit" className=" btn btn-success send-bg px-0" disabled={btnloading}>{btnloading ? "Loading..." : "Send Message"}</button></div>
                                        <div className="validate"></div>
                                        </div>                                      
                                    </div>                   
                                </form>
                            </div>
                        </div>

                        <div className="portfolio-description">
                            <div className="container oswald-font text-center">
                                <h1 className="orange-color">Our Products & Services</h1>
                                <p>
                                We provide comprehensive Smart Home and Lawn Automation Solutions with End-to-End services. Smartdots is the leading company to offer Robotic Lawn Mower Solution for residential and commercial deployments since 2014.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className={classes.root}>
                <Snackbar open={openContErr} autoHideDuration={6000} onClose={handleClose}>                                             
                    <Alert onClose={handleClose} severity="error">{contactError}</Alert>                                                                                  
                </Snackbar>

                <Snackbar open={contactSuccess} autoHideDuration={6000} onClose={handleCloseSuccess}>                                             
                    <Alert onClose={handleCloseSuccess} severity="success">Your message has been successfully sent.</Alert>                                                                                  
                </Snackbar>
            </div>

            {/* <!-- End Portfolio Details Section --> */}

            {/* <!-- Start Main Section --> */}
            <main id="main">

                {/* <!-- Featured Services Section --> */}

                <section id="featured-services" className="featured-services">
                    <div className="container" data-aos="fade-up">
                        <div className="row">
                            <div className="col-md-6 col-lg-6 d-flex align-items-stretch mb-lg-2 px-1">
                                <a href="#/"><img src="assets/img/husq1.webp" className="img-fluid" alt="" /></a>
                            </div>

                            <div className="col-md-6 col-lg-6 d-flex align-items-stretch mb-lg-2 px-1">
                                <a href="#/"><img src="assets/img/husq2.webp" className="img-fluid" alt="" /></a>
                            </div>

                            <div className="col-md-6 col-lg-6 d-flex align-items-stretch mb-lg-2 px-1">
                                <a href="#/"><img src="assets/img/husq3.webp" className="img-fluid" alt="" /></a>
                            </div>

                            <div className="col-md-6 col-lg-6 d-flex align-items-stretch mb-lg-2 px-1">
                                <a href="#/"><img src="assets/img/husq4.webp" className="img-fluid" alt="" /></a>
                            </div>
                        </div>
                        <div className="col-md-12 text-center pt-5">
                            <a style={{padding:'18px 80px'}} className="btn btn-warning white-color orange-bg font-larger oswald-font shop-btn" data-src={window.location.href} href="/product-listing">Shop Now</a>
                        </div>
                    </div>
                </section>
                {/* <!-- End Featured Services Section --> */}

                {/* <!-- ======= Clients Section ======= --> */}
                {/* <section id="clients" className="clients">
                
                    <div className="row">

                        <div className="col-lg-4 col-md-4 d-flex align-items-center justify-content-center adv-bg py-5">
                            <h2 className="mb-0">ADVANTAGES</h2>
                        </div>

                        <div className="col-lg-4 col-md-4 d-flex align-items-center justify-content-center solu-bg py-5">
                            <h2 className="mb-0">SOLUTIONS</h2>
                        </div>

                        <div className="col-lg-4 col-md-4 d-flex align-items-center justify-content-center testi-bg py-5">
                            <h2 className="mb-0">TESTIMONIALS</h2>
                        </div>   
                    </div>
    
                </section> */}
                {/* <!-- End Clients Section --> */}

            <div className="col-md-12 px-0">
                <div className="container">
                    <div className="col-md-5 col-lg-4 welcome-pos tp-menu-show">
                        
                        <h2 className="oswald-font">Welcome to Smart Dots</h2>
                        <hr className="new5" />
                        <p className="oswald-font">At SmartDots we are committed to provide the most cost-effective & 
                comprehensive solutions that make your home or business smarter.<br/><br/>

                Our goal is to ensure that we minimize your spending and add a lot of value to your daily lifestyle, by developing a customized solution using the most 
                appropriate off the shelf products and by integrating systems with 
                innovative products designed by us.<br/><br/>

                We don't just automate your home or business, but connect it to the world of IoT (Internet of Things) in a way that will truly help you know your home or business like you know yourself.</p>
                    </div>

                </div>
                    <img src="assets/img/ad-btm.webp" className="img-fluid" alt="" />
            </div>

            <div className="col-md-12 sh-img pt-3">
        
                <h2 className="oswald-font">Welcome to Smart Dots</h2>
                <hr className="new5" />
                <p className="oswald-font">At SmartDots we are committed to provide the most cost-effective & 
        comprehensive solutions that make your home or business smarter.<br/><br/>

        Our goal is to ensure that we minimize your spending and add a lot of value to your daily lifestyle, by developing a customized solution using the most 
        appropriate off the shelf products and by integrating systems with 
        innovative products designed by us.<br/><br/>

        We don't just automate your home or business, but connect it to the world of IoT (Internet of Things) in a way that will truly help you know your home or business like you know yourself.</p>
            </div>

            <div className="col-md-12 px-4 bg-dark-grey py-5">
                <div className="row">
                    <div className="col-md-3 col-sm-6 px-4 mb-3">
                    
                    <div className="col-md-12 text-center border-whi p-5-wel">
                        
                        <img src="assets/img/c1.png" className="img-fluid" alt="" />
                        <h2 className="white-cons oswald-font">consulting</h2>
                    </div>
                    </div>

                    <div className="col-md-3 col-sm-6 px-4 mb-3">
                    
                    <div className="col-md-12 text-center border-whi p-5-wel">
                        
                        <img src="assets/img/c2.png" className="img-fluid" alt="" />
                        <h2 className="white-cons oswald-font">customization</h2>
                    </div>
                    </div>

                    <div className="col-md-3 col-sm-6 px-4 mb-3">
                    
                    <div className="col-md-12 text-center border-whi p-5-wel">
                        
                        <img src="assets/img/c3.png" className="img-fluid" alt="" />
                        <h2 className="white-cons oswald-font">installation</h2>
                    </div>
                    </div>

                    <div className="col-md-3 col-sm-6 px-4">
                    
                    <div className="col-md-12 text-center border-whi p-5-wel">
                        
                        <img src="assets/img/c4.png" className="img-fluid" alt="" />
                        <h2 className="white-cons oswald-font">configuration</h2>
                    </div>
                    </div>
                </div>
            </div>

            {/* <!-- ======= About Section ======= -->
            <!-- ======= Portfolio Section ======= --> */}

            <section id="portfolio" className="portfolio">
                <div id="demo" className="carousel slide" data-ride="carousel">

                    {/* <!-- Indicators --> */}
                    <ul className="carousel-indicators">
                        <li data-target="#demo" data-slide-to="0" className="active"></li>
                        <li data-target="#demo" data-slide-to="1"></li>
                        <li data-target="#demo" data-slide-to="2"></li>
                        <li data-target="#demo" data-slide-to="3"></li>
                        <li data-target="#demo" data-slide-to="4"></li>
                    </ul>
                
                    {/* <!-- The slideshow --> */}
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="position-absolute container tp-menu-show">
                                <div className="col-md-12 self-top">
                                        <h1 className="oswald-font secu-color">
                                        Save MORE Time While Keeping Your<br/> Lawn Always Ready</h1>
                                        <p className="self-mono" style={{fontSize: '1.5rem', paddingTop: '2rem', paddingBottom: '2rem'}}>Free up time to do other important things like <br/>
          spending time with family or learning music <br/>while your lawn is always ready for you – No more <br/>last-minute mowing before a party.</p>
                                <button type="button" className="btn btn-warning white-color orange-bg font-larger oswald-font learn-btn">Shop Now</button>
                                </div>
                            </div>
                            <img src="assets/img/bann-1.webp" alt="Los Angeles" width="100%" className="tp-menu-show" />
                            
                            <div className="container sh-img">
                                <div className="col-md-12 first-testi">
                                        <h1 className="oswald-font secu-color">
                                        Save MORE Time While Keeping Your<br/> Lawn Always Ready</h1>
                                        <p className="self-mono" style={{fontSize: '1.5rem', paddingTop: '2rem', paddingBottom: '2rem'}}>Free up time to do other important things like 
          spending time with family or learning music while your lawn is always ready for you – No more last-minute mowing before a party.</p>
                                <button type="button" className="btn btn-warning white-color orange-bg font-larger oswald-font learn-btn">Shop Now</button>
                                </div>
                            </div>
                        </div>

                        <div className="carousel-item">
                            <div className="position-absolute container tp-menu-show">
                                <div className="col-md-12 self-top">
                                    <h1 className="oswald-font secu-color">
                                    Go 'GREEN' With 'COOL'</h1>
                                    <p className="self-mono" style={{fontSize: '1.5rem', paddingTop: '2rem', paddingBottom: '2rem'}}>The robotic mower works on Lithium-Ion <br/>Batteries, and hence no emissions. <br/> Eco-friendly solution, reduced 
          carbon <br/>footprint. It will definitely be a topic of <br/>discussion among friends – We just know it! <br/>So, it's COOL.</p>
                                    <button type="button" className="btn btn-warning white-color orange-bg font-larger oswald-font learn-btn">Shop Now</button>
                                </div>
                            </div>
                            <img src="assets/img/bann-2.webp" alt="Los Angeles" width="100%" />

                            <div className="container sh-img">
                                <div className="col-md-12 self-top">
                                        <h1 className="oswald-font secu-color">
                                        Go 'GREEN' With 'COOL'</h1>
                                        <p className="self-mono" style={{fontSize: '1.5rem', paddingTop: '2rem', paddingBottom: '2rem'}}>The robotic mower works on Lithium-Ion Batteries, and hence no emissions. Eco-friendly solution, reduced 
          carbon footprint. It will definitely be a topic of discussion among friends – We just know it! So, it's COOL.</p>
                                    <button type="button" className="btn btn-warning white-color orange-bg font-larger oswald-font learn-btn">Shop Now</button>
                                </div>
                            </div>
                        </div>

                        <div className="carousel-item">
                            <div className="position-absolute container tp-menu-show">
                                <div className="col-md-12 self-top">
                                    <h1 className="oswald-font secu-color">
                                    No Weeds, Bugs, or <br/>Harmful Fertilizers</h1>
                                    <p className="self-mono" style={{fontSize: '1.5rem', paddingTop: '2rem', paddingBottom: '2rem'}}>Constant mowing ceases weeds to flourish <br/>and also keeps bugs away. 
          The small <br/>clippings due to constant mowing <br/> decompose fast and are fed back <br/>as a natural fertilizer.</p>
                                    <button type="button" className="btn btn-warning white-color orange-bg font-larger oswald-font learn-btn">Shop Now</button>
                                </div>
                            </div>
                            <img src="assets/img/bann-3.webp" alt="Los Angeles" width="100%" className="tp-menu-show" />

                            <div className="container sh-img">
                                <div className="col-md-12 self-top">
                                        <h1 className="oswald-font secu-color">
                                        No Weeds, Bugs, or <br/>Harmful Fertilizers</h1>
                                        <p className="self-mono" style={{fontSize: '1.5rem', paddingTop: '2rem', paddingBottom: '2rem'}}>Constant mowing ceases weeds to flourish and also keeps bugs away. 
          The small clippings due to constant mowing decompose fast and are fed back as a natural fertilizer.</p>
                                    <button type="button" className="btn btn-warning white-color orange-bg font-larger oswald-font learn-btn">Shop Now</button>
                                </div>
                            </div>
                        </div>

                        <div className="carousel-item">
                            <div className="position-absolute container tp-menu-show">
                                <div className="col-md-12 self-top">
                                        <h1 className="oswald-font secu-color text-uppercase">
                                        Do It All From Your <br/>Smartphone While Also <br/>Maintaining Privacy</h1>
                                        <p className="self-mono" style={{fontSize: '1.5rem', paddingTop: '2rem', paddingBottom: '2rem'}}>Mow your lawn at the ease of your <br/>fingertips with smartphone compatibility. <br/>
          What's more? No more invasion of privacy <br/>by 3rd party services. A robotic mower will <br/>get it done with better results.</p>
                                    <button type="button" className="btn btn-warning white-color orange-bg font-larger oswald-font learn-btn">Shop Now</button>
                                </div>
                            </div>
                            <img src="assets/img/bann-4.webp" alt="Los Angeles" width="100%" className="tp-menu-show" />

                            <div className=" container sh-img">
                                <div className="col-md-12 self-top">
                                    <h1 className="oswald-font secu-color text-uppercase">
                                    Do It All From Your <br/>Smartphone While Also <br/>Maintaining Privacy</h1>
                                    <p className="self-mono" style={{fontSize: '1.5rem', paddingTop: '2rem', paddingBottom: '2rem'}}>Mow your lawn at the ease of your fingertips with smartphone compatibility.
          What's more? No more invasion of privacy by 3rd party services. A robotic mower will get it done with better results.</p>
                                <button type="button" className="btn btn-warning white-color orange-bg font-larger oswald-font learn-btn">Shop Now</button>
                            </div>
                            </div>
                        </div>

                    <div className="carousel-item">
                            <div className="position-absolute container tp-menu-show">
                                
                                <div className="col-md-12 self-top">

                                <p><img src="assets/images/team-head.png" className="img-fluid" alt="" /></p>
                                <h1 className="secu-color text-uppercase" style={{fontSize: '2rem', color: '#01b1e2'}}>
                                BRINGING SAFELYTEAM TO THE US<br/>
                        EXCLUSIVELY THROUGH<br/>
                        SMARTDOTS!</h1>

                        <button type="button" className="btn btn-warning white-color bl-bt-bg font-larger oswald-font learn-btn my-3">Learn More</button>
                        <h1 className="secu-color text-uppercase mt-3" style={{fontSize: '2rem', fontWeight: 'bold', color: '#01b1e2'}}>
                                HOME SECURITY,<br/>
                        WELLNESS SYSTEM.</h1>
                                <p className="self-mono" style={{fontSize: '1rem', paddingTop: '2rem', paddingBottom: '2rem'}}>Safely team is bringing a comprehensive system<br/>
                        that encapsulates security, safety, and wellness.</p>

                        </div>
                            </div>
                            <img src="assets/img/bann-5.webp" alt="Los Angeles" width="100%" className="tp-menu-show" />

                        <img src="assets/img/saf-lt.webp" alt="Los Angeles" width="100%" className="sh-img" />

                                
                                <div className="col-md-12 self-top sh-img" style={{paddingBottom: '0px'}}>

                                <p><img src="assets/images/team-head.png" className="img-fluid" alt="" /></p>
                                <h1 className="secu-color text-uppercase" style={{fontSize: '2rem', color: '#01b1e2'}}>
                                BRINGING SAFELYTEAM TO THE US
                        EXCLUSIVELY THROUGH
                        SMARTDOTS!</h1>
                        <h1 className="secu-color text-uppercase mt-3" style={{fontSize: '2rem', fontWeight: 'bold', color: '#01b1e2'}}>
                                HOME SECURITY,
                        WELLNESS SYSTEM.</h1>
                                <p className="self-mono" style={{fontSize: '1rem', paddingTop: '2rem'}}>Safely team is bringing a comprehensive system
                        that encapsulates security, safety, and wellness.</p>

                        </div>
                        <div className="col-md-12 text-center sh-img"><button type="button" className="btn btn-warning white-color bl-bt-bg font-larger oswald-font learn-btn my-3">Learn More</button></div>     
                            
                    </div>

                        {/* <div className="carousel-item">
                            <div className="position-absolute container tp-menu-show">
                                <div className="col-md-10 self-top">
                                <h1 className="oswald-font secu-color text-uppercase">
                                <img src="assets/img/saf-rt.webp" className="img-fluid" alt="" /></h1>
                            
                                </div>
                            </div>
                            <img src="assets/img/bann-5.webp" alt="Los Angeles" width="100%" className="tp-menu-show" />

                            <div className=" container sh-img">
                                <div className="col-md-12">
                            <img src="assets/img/saf-rt.webp" className="img-fluid" alt="" />
                        </div>
                            </div>
                        </div> */}


                    </div>
                
                    {/* <!-- Left and right controls --> */}
                    <a className="carousel-control-prev" href="#demo" data-slide="prev" style={{fontSize: '50px', color: '#000'}}>
                        <i className="icofont-curved-left tp-menu-show"></i>
                    </a>
                    <a className="carousel-control-next" href="#demo" data-slide="next" style={{fontSize: '50px', color: '#000'}}>
                        <i className="icofont-curved-right tp-menu-show"></i>
                    </a>
                </div>
            </section>
            {/* <!-- End Portfolio Section --> */}

            {/* <!-- ======= Testimonials Section ======= --> */}

            <section id="testimonials" className="testimonials" style={{backgroundColor: '#dae3f3'}}>
                {/* <div className="container" data-aos="zoom-in">
                    <div className="col-md-12 py-3" >
                            <h2 className="oswald-font text-mid" style={{fontWeight: '400'}}>Clients Testimonials</h2>
                        </div>

                    <div className="owl-carousel testimonials-carousel">

                    <div className="testimonial-item">
                        <div className="row">

                        <div className="col-md-3"><img src="assets/img/sudheer.png" className="testimonial-img" alt="" /></div>
                        <div className="col-md-9 text-left">
                            <div className="col-md-6"><img src="assets/img/testi-img.webp" width="300px" alt="" /></div>
                        <p className="oswald-font col-text-test">
                        
                        "Automower was a real blessing for me. We have a relatively large back yard and were having issues with weeds as well as irregularities in the grass even after trying different lawn mowing personnel. Moreover damaging sprinkler head after land mowing was a frequent issue. Ever since we started using Automower all these problems resolved! <br/><br/>

                        Thanks to Smartdots team for the wonderful product as well as a professional installation !!"
                        
                        </p>
                        <h3 className="oswald-font col-text-test">Dr. Sudheer, Echols Dr, Windrose, PCR </h3>
                        </div>
                        </div>
                        
                        
                    </div>

                    <div className="testimonial-item">
                        <div className="row">
                        <div className="col-md-3"><img src="assets/img/su2.png" className="testimonial-img" alt="" /></div>
                        <div className="col-md-9 text-left">
                            <div className="col-md-6"><img src="assets/img/testi-img.webp" width="300px" alt="" /></div>
                        <p className="oswald-font col-text-test">
                        
                        "We were very happy with the work these guys were able to do installing our new auto mower last week. They really took the time to make sure that we understood how to operate the automatic lawnmower, and I was really impressed with how much they were willing to work with us to set up the perimeter and docking station. I would highly recommend SmartDots to anyone in need of their services and products!"
                        
                        </p>
                        <h3 className="oswald-font col-text-test">Lance Johnson, Austin, Texas </h3>
                        </div>
                        </div>
                    </div>

                    <div className="testimonial-item">
                        <div className="row">
                        <div className="col-md-3"><img src="assets/img/su3.png" className="testimonial-img" alt="" /></div>
                        <div className="col-md-9 text-left">
                            <div className="col-md-6"><img src="assets/img/testi-img.webp" width="300px" alt="" /></div>
                        <p className="oswald-font col-text-test">
                        
                        "We had a Husqvarna Automower 430X 
            installed by them. They did a   great job and I'd highly recommend them."
                        
                        </p>
                        <h3 className="oswald-font col-text-test">Mischa Porter, Arlington, Texas </h3>
                        </div>
                        </div>
                    </div>

                    <div className="testimonial-item">
                        <div className="row">
                        <div className="col-md-3"><img src="assets/img/su4.png" className="testimonial-img" alt="" /></div>
                        <div className="col-md-9 text-left">
                            <div className="col-md-6"><img src="assets/img/testi-img.webp" width="300px" alt="" /></div>
                        <p className="oswald-font col-text-test">
                        
                        "We just got the Husqvarna Automower 315X two week ago & love it thus far! The quote process and install was quick, simple and to the point. No confusion! I love working with the SmartDots Team!"
                        
                        </p>
                        <h3 className="oswald-font col-text-test">Morna Onishile, Texas </h3>
                        </div>
                        </div>
                    </div>

                    <div className="testimonial-item">
                        <div className="row">
                        <div className="col-md-3"><img src="assets/img/su5.png" className="testimonial-img" alt="" /></div>
                        <div className="col-md-9 text-left">
                            <div className="col-md-6"><img src="assets/img/testi-img.webp" width="300px" alt="" /></div>
                        <p className="oswald-font col-text-test">
                        
                        "I have had a lot of struggle with weed and dry patches, because of areas of low sunlight, and  I was not satisfied with the once in two weeks service provided by my mower guy. No weeds brought in from outside lawnmowers, cut grass serving as fertilizer for new grass, and of course having it done automatically, They explained all the features of the Automower, and customized their install to suit my landscaping needs. I started seeing the effects within a week. My bald patches are slowly turning green. SmartDots were excellent in their post-install guidance as well. They monitor the device after install, and they called me about a possible correction in the boundary wiring that I needed, before I even noticed. And would highly 
            recommend Smart Dots for Automower needs."
                        
                        </p>
                        <h3 className="oswald-font col-text-test">Deepak, Sidesaddle Trail, Waterton, PCR </h3>
                        </div>
                        </div>
                    </div>



                    </div>

                </div> */}

                <div id="demo2" className="carousel slide" data-ride="carousel">

                    <div className="container">
                        <div className="col-md-12 py-3">
                            <h2 className="oswald-font text-mid" style={{fontWeight: '400'}}>Clients Testimonials</h2>
                        </div>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <div className="container">
                                <div className="row">
                                <div className="col-md-3"><img src="assets/img/sudheer.png" className="testimonial-img img-fluid" alt="" /></div>
                                        <div className="col-md-9 text-left">
                                        <div className="col-md-6"><img src="assets/img/testi-img.webp" className="img-fluid" alt="" /></div>
                                    <p className="oswald-font col-text-test">
                                        
                                        "Automower was a real blessing for me. We have a relatively large back yard and were having issues with weeds as well as irregularities in the grass even after trying different lawn mowing personnel. Moreover damaging sprinkler head after land mowing was a frequent issue. Ever since we started using Automower all these problems resolved! <br/><br/>

                                        Thanks to Smartdots team for the wonderful product as well as a professional installation !!"
                                        
                                    </p>
                                    <h3 className="oswald-font col-text-test">Dr. Sudheer, Echols Dr, Windrose, PCR </h3>
                                        </div>
                                </div></div>
                            </div>
                            <div className="carousel-item">
                                <div className="container">
                                <div className="row">
                                <div className="col-md-3"><img src="assets/img/su2.png" className="testimonial-img img-fluid" alt="" /></div>
                                        <div className="col-md-9 text-left">
                                        <div className="col-md-6"><img src="assets/img/testi-img.webp" className="img-fluid" alt="" /></div>
                                    <p className="oswald-font col-text-test">
                                        
                                        "We were very happy with the work these guys were able to do installing our new auto mower last week. They really took the time to make sure that we understood how to operate the automatic lawnmower, and I was really impressed with how much they were willing to work with us to set up the perimeter and docking station. I would highly recommend SmartDots to anyone in need of their services and products!"
                                        
                                    </p>
                                    <h3 className="oswald-font col-text-test">Lance Johnson, Austin, Texas </h3>
                                        </div>
                                </div></div>
                            </div>
                            <div className="carousel-item">
                                <div className="container">
                                <div className="row">
                                <div className="col-md-3"><img src="assets/img/su3.png" className="testimonial-img img-fluid" alt="" /></div>
                                        <div className="col-md-9 text-left">
                                        <div className="col-md-6"><img src="assets/img/testi-img.webp" className="img-fluid" alt="" /></div>
                                    <p className="oswald-font col-text-test">
                                        
                                        "We had a Husqvarna Automower 430X 
                            installed by them. They did a   great job and I'd highly recommend them."
                                        
                                    </p>
                                    <h3 className="oswald-font col-text-test">Mischa Porter, Arlington, Texas </h3>
                                        </div>
                                </div></div>
                            </div>
                            <div className="carousel-item">
                                <div className="container">
                                <div className="row">
                                <div className="col-md-3"><img src="assets/img/su4.png" className="testimonial-img img-fluid" alt="" /></div>
                                        <div className="col-md-9 text-left">
                                        <div className="col-md-6"><img src="assets/img/testi-img.webp" className="img-fluid" alt="" /></div>
                                    <p className="oswald-font col-text-test">
                                        
                                        "We just got the Husqvarna Automower 315X two week ago & love it thus far! The quote process and install was quick, simple and to the point. No confusion! I love working with the SmartDots Team!"
                                        
                                    </p>
                                    <h3 className="oswald-font col-text-test">Morna Onishile, Texas </h3>
                                        </div>
                                </div></div>
                            </div>
                            <div className="carousel-item">
                                <div className="container">
                                <div className="row">
                                <div className="col-md-3"><img src="assets/img/su5.png" className="testimonial-img img-fluid" alt="" /></div>
                                        <div className="col-md-9 text-left">
                                        <div className="col-md-6"><img src="assets/img/testi-img.webp" className="img-fluid" alt="" /></div>
                                    <p className="oswald-font col-text-test">
                                        
                                        "I have had a lot of struggle with weed and dry patches, because of areas of low sunlight, and  I was not satisfied with the once in two weeks service provided by my mower guy. No weeds brought in from outside lawnmowers, cut grass serving as fertilizer for new grass, and of course having it done automatically, They explained all the features of the Automower, and customized their install to suit my landscaping needs. I started seeing the effects within a week. My bald patches are slowly turning green. SmartDots were excellent in their post-install guidance as well. They monitor the device after install, and they called me about a possible correction in the boundary wiring that I needed, before I even noticed. And would highly 
                            recommend Smart Dots for Automower needs."
                                        
                                    </p>
                                    <h3 className="oswald-font col-text-test">Deepak, Sidesaddle Trail, Waterton, PCR </h3>
                                        </div>
                                </div></div>
                            </div>
                        </div>
                    <div className="row sh-img" style={{display: 'none'}}>
                    <div className="col-md-4">
                    <a className="carousel-control-prev" href="#demo2" data-slide="prev">
                    <span className="carousel-control-prev-icon"></span>
                    </a>
                    <a className="carousel-control-next" href="#demo2" data-slide="next">
                    <span className="carousel-control-next-icon"></span>
                    </a></div>
                    </div>
                    </div>

                </div>

            </section>
           {/*  <!-- End Testimonials Section --> */}

           </main>
            {/* <!-- End Main Section --> */}

           <a href="/" className="back-to-top"><i className="icofont-simple-up"></i></a>   

        </Layout>
    )
}

export default Home
