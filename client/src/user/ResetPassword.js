import React, { useEffect, useState } from 'react';
import Layout from '../core/Layout';
import {API} from '../config'
import {resetUserPasswordwithToken} from './apiUser';
import { Backdrop, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { fetchConfig } from '../auth/fetchInterceptor';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
}));

const ResetPassword = ({match})=>{

    const classes = useStyles();

    const [values,setValues] = useState({
        password:'',
        password1:'',
        success:false,
        error:''
    });
    const {password,password1,success,error} = values;
    const [btnloading,setBtnLoading] = useState(false);

    const clickSubmit = (e)=>{
        e.preventDefault();
        setBtnLoading(true);
        setValues({...values,error:false})
        resetUserPasswordwithToken({password,password1},match.params.token)
        .then(data=>{
            if(data.error){
                setValues({...values,error:data.error,success:false})
                setBtnLoading(false)
            }else{
                setValues({...values,success:true,error:false})
                setBtnLoading(false)

            }
            
        })
        
    } 

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value});
    };
    

    useEffect(()=>{
        fetch(`${API}/reset/${match.params.token}`,{
            method:"GET",
            headers:fetchConfig
        })
        .then(response=>response.json())
        .then(data=>{
            if(data.error){
                window.location.replace("/forgotpassword")
            }
        })
        .catch(err=>console.log(err))
    },[]);

    const newForm = () => (     
                <form onSubmit={clickSubmit}>
                    <div className="form-group">
                        <label className="text-muted">Enter New Password:<span style={{color:"red"}}> *</span></label>
                        <input type="password" className="form-control" onChange={handleChange("password")} value={password} autoFocus required/>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Confirm Password:<span style={{color:"red"}}> *</span></label>
                        <input type="password" className="form-control" onChange={handleChange("password1")} value={password1}  required/>
                    </div>
                    <center>
                        <br/>
                        <button className="btn btn-warning white-color orange-bg font-larger oswald-font shop-btn" disabled={btnloading}>{btnloading ? "Loading..." : "Submit"}</button>
                    </center>
                    
                </form>
    );

    const showSuccess = () => {
        if(success) {
            if(window.confirm("Password Updated Successfully")){
                window.location.replace("/login")
            }          
        }
    };

    const showError = () => (
        <>
        <br/>
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
        </>
    );

    return(
        <Layout>
            <div style={{paddingTop:'170px'}} className="section pp-scrollable slide-dark slide-dark-footer">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="jumbotron" style={{backgroundImage: 'linear-gradient(90deg, rgba(213,149,37,1) 0%, rgba(240,164,0,1) 22%, rgba(255,199,32,1) 100%)', color:'white'}}>
                                        <h3 style={{textAlign:'center'}}>Reset Password</h3>
                                    </div>
                                </div><br/>
                                <div className="col-md-12">                            
                                    {newForm()}
                                    {showSuccess()}
                                    {showError()}                                                                                                
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


export default ResetPassword;