import React, { useState,useContext } from 'react'
//import Layout from './Layout'
import {login, isAuthenticated} from '../auth/Index'
//import {Helmet} from 'react-helmet'
import  {AuthContext} from '../globalStates';
import { Redirect } from 'react-router';
//import { Link } from 'react-router-dom'
import Header from './Header';
import Footer from './Footer';


const Login = () => {

    const [authState,setauthState] = useContext(AuthContext);

    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        redirectToReferrer: false
    });

    const { email, password, loading, error, redirectToReferrer} = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value});
    };

    const clickSubmit =async (event) => {
        event.preventDefault();
        setValues({...values, error: false, loading: true });
        login({ cemail:email, password})
        .then(data => {
            console.log("error")
            if(data.error) {
                setValues({...values, error: data.error, loading: false});
            } else if(data.message === "login success"){

              
           
                // authenticating the user
                isAuthenticated()
                .then(data=>{
                   
                   setauthState({...authState,
                    _id:data.user._id,
                    prefix:data.user.prefix,
                    firstName:data.user.cfirst,
                    lastName:data.user.clast,
                    email:data.user.cemail,
                    role:data.user.role,
                    phone:data.user.cphone,
                    customerid:data.user.customerid
                });
                console.log("auth values",authState,values)
              
                   setValues({
                            ...values,
                            redirectToReferrer: true
                        });
                });
                
            }
        });
    };

    const loginForm = () => (
        
        
            <form onSubmit={clickSubmit}>

                <div className="form-group">
                    <label className="text-muted">Email<span style={{color:"red"}}> *</span></label>
                    <input onChange={handleChange('email')} type="email" className="form-control" value={email} required />
                </div>

                <div className="form-group">
                    <label className="text-muted">Password<span style={{color:"red"}}> *</span></label>
                    <input onChange={handleChange('password')} type="password" className="form-control" value={password} required />
                </div>
                <center>
                    <br/>
                    <button className="btn btn-warning white-color orange-bg font-larger oswald-font shop-btn">Login</button>
                    <p style={{paddingTop: '10px'}}><a href="/forgotpassword" style={{color:"blue"}}>Forgot Password?</a></p>

                </center>
                
            </form> 
    );

    const redirectUser = () => {
        
        if(redirectToReferrer) {
            if(authState.role === 1) {
                window.location.href="/admin/dashboard";
                // return <Redirect to='admin/dashboard'/>
            } else {
                 window.location.href="/user/dashboard";
                // return <Redirect to='user/dashboard'/>
            }
        }
    }

    const showLoading = () => {
        if(loading){
            return <div id="preloader"></div>  
        }
    }

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    return (
        <>
        <Header />
            <section style={{paddingTop:'180px'}}>

                <div className="container">
                        
                    <div className="row">
                        <div className="col-md-12">
                            <div className="jumbotron" style={{background: 'linear-gradient(90deg, rgba(213,149,37,1) 0%, rgba(240,164,0,1) 22%, rgba(255,199,32,1) 100%)', color:'white'}}>
                                <h3 style={{textAlign:'center'}}>Login</h3>
                            </div>
                        </div>
                                
                        <div className="col-md-12">
                            {loginForm()}
                            {showError()}
                            {redirectUser()}
                            {showLoading()}
                        </div>

                        <div className="col-md-12" style={{paddingTop:'70px'}}>

                        </div>
                                    
                    </div>
                                
                </div>
            </section>
            <Footer />
        </>
            
    )
}

export default Login