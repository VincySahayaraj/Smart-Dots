import React, {useState, useContext} from 'react'
import AdminLayout from './Layout/AdminLayout'
import {AuthContext} from '../globalStates';
import { Redirect, Link } from "react-router-dom"
import { createSupplier } from './apiAdmin'

const AddSupplier = () => {

    const [authState] = useContext(AuthContext);

    const [values, setValues] = useState({
        companyName: '',
        contactName: '',
        email: '',
        phone: '',
        address: '', 
        btnloading:false,    
        error: '',
        success: false
    });

    const {companyName, contactName, email, phone, address,btnloading, success, error} = values

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value,btnloading:false});
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: false,btnloading:true });
        createSupplier({companyName,contactName,email,phone,address, added_by:authState._id})
        .then(data => {
            if(data.error) {
                setValues({...values, error: data.error, success:false,btnloading:false})
            } else {
                setValues({
                    ...values,
                    companyName:'',
                    contactName: '',
                    email: '',
                    phone: '',
                    address: '',
                    btnloading:false,
                    error: '',
                    success: true
                })
            }
        })
    }

    const supplierForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Company Name<span style={{color:"red"}}> *</span></label>
                <input onChange={handleChange('companyName')} type="text" className="form-control" value={companyName} required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Contact Name</label>
                <input onChange={handleChange('contactName')} type="text" className="form-control" value={contactName} />
            </div>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} type="email" className="form-control" value={email} />
            </div>

            <div className="form-group">
                <label className="text-muted">Phone No</label>
                <input onChange={handleChange('phone')} type="number" className="form-control" value={phone} />
            </div>

            <div className="form-group">
                <label className="text-muted">Address</label>
                <textarea onChange={handleChange('address')} className="form-control" value={address} />
            </div>

            <center>
                <br/>
                <button  className="btn btn-outline-primary" disabled={btnloading}> {btnloading ? "Loading..." : "Add"} </button>
            </center>

            <div><Link className="nav-link" to="/admin/suppliers">Go Back to List </Link></div>

        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => {
        if(success) {
            return <Redirect to="/admin/suppliers" />
        }
    };

    return (
        <AdminLayout>

            <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title" style={{textAlign:'center',color:"#106eea"}}>Add Supplier</h4>
                            {showSuccess()}
                            {showError()}
                            {supplierForm()}
                        </div>
                    </div>
                </div>
            </div>
            
        </AdminLayout>
    )
}

export default AddSupplier
