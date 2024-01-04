import React, {useState} from 'react'
import Layout from './Layout'
import {createContact} from '../Apis/apis'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import EmailIcon from '@material-ui/icons/Email';

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

const ContactUs = () => {

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

    const showForm = () => (
        <form onSubmit={clickSubmitContact}>
            <div className="form-group">
                <label className="text-muted">Name :<span style={{color:"red"}}> *</span></label>
                <input onChange={handleChangeContact('contactName')} value={contactName} type="text" className="form-control" required/>
            </div>
            <div className="form-group">
                <label className="text-muted">Email :<span style={{color:"red"}}> *</span></label>
                <input onChange={handleChangeContact('email')} value={email} type="text" className="form-control" required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Message:<span style={{color:"red"}}> *</span></label>
                <textarea onChange={handleChangeContact('message')} value={message} className="form-control" rows="5" required></textarea>
            </div>
            <br/>
            <button className="btn btn-success" disabled={btnloading}>{btnloading ? 'Loading...' : 'Submit'}</button>
        </form>
    )
    return (
        <Layout>

            <section style={{paddingTop:'50px'}} className="portfolio-details">

                <div className="container-fluid px-0">
                    <div className="portfolio-details-container">
                        <div className="owl-carousel portfolio-details-carousel mar-top-fot">
                            <img rel="preload" as="image" src="../../assets/img/hero-bg.webp" className="img-fluid" alt="" /> 
                        </div>
                    </div>
                </div>

            </section>

            <main id="main">

                <section id="featured-services" className="featured-services">
                    <div className="container" data-aos="fade-up">
                        <div className="row">
                            <div className="col-md-6"> 
                                <h3>Write to us</h3><br/>                     
                                {showForm()}
                            </div>
                            <div className="col-md-6">
                                <h3>Contact Information</h3><br/>
                                <h5>Smart-dots.com</h5>
                                
                                <p style={{lineHeight: '3rem', fontSize:'15px'}}> 
                                    <PhoneAndroidIcon />&nbsp;<a href="tel:(469) 629-6922">(469) 629-6922</a>&nbsp;&nbsp;&nbsp;</p>
                                    <p><EmailIcon />&nbsp;<a href="mailto:info@smart-dots.com">info@smart-dots.com</a></p>
                            </div>
                        </div>
                    </div>
                </section>

            </main>

            <div className={classes.root}>
                <Snackbar open={openContErr} autoHideDuration={6000} onClose={handleClose}>                                             
                    <Alert onClose={handleClose} severity="error">{contactError}</Alert>                                                                                  
                </Snackbar>

                <Snackbar open={contactSuccess} autoHideDuration={6000} onClose={handleCloseSuccess}>                                             
                    <Alert onClose={handleCloseSuccess} severity="success">Your message has been successfully sent.</Alert>                                                                                  
                </Snackbar>
            </div>
            
        </Layout>
    )
}

export default ContactUs
