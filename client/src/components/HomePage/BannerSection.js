import React, { useState } from 'react'
import { createContact } from '../../Apis/apis'
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

const BannerSection = (props) => {

    const classes = useStyles();

    const [openContErr, setOpenContErr] = useState(false);

    const [contactValues, setContactValues] = useState({
        contactName: '',
        email: '',
        message: '',
        contactSuccess: false,
        contactError: '',
        btnloading: false
    });

    const { contactName, email, message, contactSuccess, contactError, btnloading } = contactValues;
    const handleChangeContact = name => event => {
        setOpenContErr(false);
        setContactValues({ ...contactValues, contactError: false, [name]: event.target.value, btnloading: false });
    };

    const clickSubmitContact = (e) => {
        e.preventDefault();
        setContactValues({ ...contactValues, contactSuccess: false, contactError: '', btnloading: true });
        createContact({ contactName, message, email, reg_type: 1 })
            .then(data => {
                if (data.error) {
                    setOpenContErr(true);
                    setContactValues({ ...contactValues, contactSuccess: false, contactError: data.error, btnloading: false });
                } else {
                    setContactValues({
                        ...contactValues,
                        contactName: '',
                        email: '',
                        message: '',
                        contactSuccess: true,
                        contactError: '',
                        btnloading: false
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
        setContactValues({ ...contactValues, contactSuccess: false })
    }

    return (
        <>
            <section className="portfolio-details pb-3 mt-5">
                <div className="container-fluid px-0">
                    <div className="portfolio-details-container">
                        <div className="owl-carousel portfolio-details-carousel mar-top-fot owl-loaded owl-drag">
                            <div class="owl-stage-outer">
                                <div class="owl-stage" style={{ transition: 'all 0s ease 0s', width: '9515px'}}>
                                    <div class="owl-item" style={{width: '1903px'}}>
                                        <img rel="preload" as="image" src={`assets/img/${props.topImg}`} className="img-fluid" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="portfolio-info wid-35">
                            <h1 className="text-uppercase" style={{ fontSize: '2.3rem' }} dangerouslySetInnerHTML={{ __html: props.topHeading }}></h1>
                            <p style={{ fontSize: 'small' }}>{props.topDescription}</p>
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

                        {props.page === "home" && <div className="portfolio-description">
                            <div className="container oswald-font text-center">
                                <h1 className="orange-color">Our Products & Services</h1>
                                <p>
                                    At SmartDots, we provide comprehensive Smart Home and Robotic Automation Solutions with end-to-end services. Smartdots is the leading company within the DFW area to offer Robotic Lawn Mower Solution for residential and commercial deployments. We provide product sales, installation, post-sales support, warranty support, and repair services. With our patent-pending products and other smart home solutions, we provide a comprehensive approach to a complete smart home or smart garden.
                                </p>
                            </div>
                        </div>}
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

        </>
    )
}

export default BannerSection
