import React, { useState } from 'react';
import { withRouter } from 'react-router-dom'
import UserLayout from './Layout/UserLayout';
import {UpdatePassword} from './apiUser';
import {logout} from '../auth/Index';

const ChangePassword = ({history})=>{

    const [values,setValues] = useState({
        password:'',
        password1:'',
        password2:'',
        success:'',
        error:''
    });

    const [btnloading,setbtnloading] = useState(false);

    const {password,password1,password2,success,error} = values;

    const handleChange = name=>event=>{
        setValues({...values,[name]:event.target.value});
    }
    const clickSubmit = (event)=>{
        event.preventDefault();
        setbtnloading(true);
        UpdatePassword({password,password1,password2})
        .then(data=>{
            console.log("this is data",data)
            if(data.error){
                setValues({...values,error:data.error,success:false})
            }
            else
            {
                setValues({
                    ...values,
                    password: '',
                    password1: '',
                    password2: '',
                    error: ''
                })
                 logout(() => {history.push('/login')})
            }
            setbtnloading(false);
        })
    }
    const showChangePwd = () => {
        return (
            <form onSubmit={clickSubmit}>

                <div className="form-group">
                    <label className="text-muted">Current Password<span style={{color:"red"}}> *</span></label>
                    <input onChange={handleChange('password')} type="password" className="form-control" value={password}  required />
                </div>
                <div className="form-group">
                    <label className="text-muted">Enter New Password<span style={{color:"red"}}> *</span></label>
                    <input onChange={handleChange('password1')} type="password" className="form-control" value={password1}  required />
                </div>
                <div className="form-group">
                    <label className="text-muted">Confirm New Password<span style={{color:"red"}}> *</span></label>
                    <input onChange={handleChange('password2')} type="password" className="form-control" value={password2}  required />
                </div>
                <center>
                    <br/>
                    <button disabled={btnloading} className="btn btn-warning white-color orange-bg font-larger oswald-font shop-btn">{btnloading ? "Loading..." : "Change Password"}</button>
                </center>

            </form>
        )
    }
    const showError = () => (
        <>
        <br/>
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
        </>
    );

    return(
        <UserLayout>         
            <div className="section">
                
                <div className="container">
    
                    <div className="row">
                        <div className="col-md-12">
                            <h2 style={{ color:'#19a6dd', textAlign:'center'}}>Change Password</h2>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <br/>  
                        {showChangePwd()}
                        {showError()}
                    </div> 
                </div>
            </div>
        </UserLayout>
    )
}


export default withRouter(ChangePassword);