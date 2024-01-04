import React, {useState} from 'react'
import AdminLayout from './Layout/AdminLayout'
import { Redirect, Link } from "react-router-dom"
import { createUser } from './apiAdmin'

const AddUser = () => {

    const [values, setValues] = useState({
        prefix:'',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        role: '',
        btnloading:false,
        error: '',
        success: false
    });

    const {prefix, firstName, lastName, email, phone, password, btnloading, role, success, error} = values

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value,btnloading:false});
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: false,btnloading:true });
        createUser({prefix,firstName, lastName, email, phone, role, password})
        .then(data => {
            if(data.error) {
                setValues({...values, error: data.error, success:false,btnloading:false})
            } else {
                setValues({
                    ...values,
                    prefix:'',
                    firstName:'',
                    lastName:'',
                    email: '',
                    phone: '',
                    password: '',
                    role: '',
                    btnloading:false,
                    error: '',
                    success: true
                })
            }
        })
    }

    const signUpForm = () => (
        <form onSubmit={clickSubmit} >

                <div className="form-group">
                    <label className="text-muted">Title<span style={{color:"red"}}> *</span></label>
                        <select required
                            onChange={handleChange('prefix')} 
                            className="form-control">
                            <option >Select Title</option>
                            <option value="Mr">Mr</option>
                            <option value="Mrs">Mrs</option>
                            <option value="Ms">Ms</option>
                            <option value="Miss">Miss</option>
                            <option value="Dr">Dr</option>
                            <option value="Sir">Sir</option>
                        </select>
                </div>

            <div className="form-group">
                <label className="text-muted">First Name<span style={{color:"red"}}> *</span></label>
                <input onChange={handleChange('firstName')} type="text" className="form-control" value={firstName} required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Last Name<span style={{color:"red"}}> *</span></label>
                <input onChange={handleChange('lastName')} type="text" className="form-control" value={lastName} required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Email<span style={{color:"red"}}> *</span></label>
                <input onChange={handleChange('email')} type="email" className="form-control" value={email} required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Phone No<span style={{color:"red"}}> *</span></label>
                <input onChange={handleChange('phone')} type="number" className="form-control" value={phone} required/>
            </div>

            <div className="form-group">
                 <label className="text-muted">Role<span style={{color:"red"}}> *</span></label>
                 <select required
                    onChange={handleChange('role')} 
                    className="form-control">
                        <option disabled>Select Role</option>
                        <option value="0">User</option>
                        <option value="1">Admin</option>
                        <option value="2">Technician</option>
                 </select>
             </div>

            <div className="form-group">
                <label className="text-muted">Password<span style={{color:"red"}}> *</span></label>
                <input onChange={handleChange('password')} type="password" className="form-control" value={password} required/>
            </div>

            <center>
                <br/>
                <button className="btn btn-outline-primary" disabled={btnloading}> {btnloading ? "Loading..." : "Add"} </button>
            </center>
            

            <div><Link className="nav-link" to="/admin/products">Go Back to List </Link></div>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        success && <Redirect to="/admin/users" />
    );

    return (
        <AdminLayout>

            <div className="row">  
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title" style={{textAlign:'center',color:"#106eea"}}>Add User</h4>
                                {showSuccess()}
                                {showError()}
                                {signUpForm()}
                        </div>
                    </div>
                </div>
            </div>
            
        </AdminLayout>
    )
}

export default AddUser
