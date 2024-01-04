import React,{useState} from 'react';
import Layout from '../core/Layout';
import {resetPassword} from './apiUser';
import { Backdrop, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
}));

const ForgotPassword = ()=>{

    const classes = useStyles(); 
    const [email,setEmail] = useState("");
    const [error,setError] = useState(false);
    const [success,setSuccess] = useState(false);
    const [btnloading,setBtnLoading] = useState(false);

    const handleChange = (e)=>{
        setError(false)
        setEmail(e.target.value)
    }

    const clickSubmit = (e)=>{
        e.preventDefault();
        setBtnLoading(true);
        resetPassword({email})
        .then(data=>{
            if(data.error){
                setError(true)
                setBtnLoading(false)
            }else{
                setEmail('');
                setError("");
                setBtnLoading(false)
                setSuccess(true);
            }
        })
    }

    const newForm = () => (     
                <form onSubmit={clickSubmit}>
                    <div className="form-group">
                        <label className="text-muted">Enter Email:<span style={{color:"red"}}> *</span></label>
                        <input type="text" className="form-control" onChange={handleChange} value={email} autoFocus required/>
                    </div>
                    <center>
                        <br/>
                        <button className="btn btn-warning white-color orange-bg font-larger oswald-font shop-btn" disabled={btnloading}>{btnloading ? "Loading..." : "Submit"}</button>
                    </center>                 
                </form>   
    );

    const showSuccess = () => (
        <>
        <br/>
        <div className="alert alert-success" style={{ display: success ? '' : 'none' }}>
            <h4>SmartDots sent a password reset link to your email. Click the link and reset a password. If you don't see the email, check your spam folder.
            </h4>  
        </div>
        </>
    )

    const showError = () => (
        <>
        <br/>
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {email} doesnot exist.
        </div>
        </>
    )

    const showDetails = () => (
        <div className="col-md-12 bg-summa p-4">
            <div className="row font-we-650">
                <p className="login-rt-gyap">To reset your password, please enter your registered Email.</p>
                <p className="login-rt-gyap">We will send the password reset instructions to the email address for this account.</p>
            </div>
        </div>
    )

    return(
        <Layout>        
                    <div style={{paddingTop:'170px'}} className="section pp-scrollable slide-dark slide-dark-footer">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="jumbotron" style={{backgroundImage: 'linear-gradient(90deg, rgba(213,149,37,1) 0%, rgba(240,164,0,1) 22%, rgba(255,199,32,1) 100%)', color:'white'}}>
                                        <h3 style={{textAlign:'center'}}>Forgot Your Password?</h3>
                                    </div>
                                </div><br/>
                                <div className="col-md-12">

                                    <div className="container">
                                        <div className="row">
                                            <div className="col-md-6">
                                                {showDetails()}                                
                                            </div>
                                            <div className="col-md-6">
                                                {newForm()}             
                                            </div>
                                            <div className="col-md-12">
                                                {showSuccess()}
                                                {showError()}
                                            </div>
                                        </div>
                                    </div>
                                </div>                                                          
                            </div>
                            <div className="pushPwd"></div>
                        </div>
                    </div>

                    <Backdrop className={classes.backdrop} open={btnloading} >
                        <CircularProgress color="inherit" />
                    </Backdrop>       
        </Layout>
    )
}

export default ForgotPassword;