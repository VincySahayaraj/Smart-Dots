import React, {useState, useContext} from 'react'
import AdminLayout from './Layout/AdminLayout'
import {AuthContext} from '../globalStates';
import { Redirect, Link } from "react-router-dom"
import { createCategory } from './apiAdmin'

const AddCategory = () => {

    const [authState] = useContext(AuthContext);

    const [name, setName] = useState('');
    
    const [added_by, setAddedBy] = useState('');

    const [error, setError] = useState('');

    const [success, setSuccess] = useState(false);

    const [btnLoading, setBtnloading] = useState(false);

    const handleChange = (e) => {
        setError('')
        setName(e.target.value)
        setAddedBy(authState._id);
        setBtnloading(false);
    };

    const clickSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        setBtnloading(true);
        //call function for api to create category
        createCategory({name, added_by})
        .then(data => {
            if(data.error) {
                setError(data.error);
                setBtnloading(false)
                setSuccess(false);
            } else {
                setError("");
                setSuccess(true);
                setName('');
                setAddedBy('');
                setBtnloading(false)
            }
        });
    };

    const newCategoryForm = () => (
     
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Category Name<span style={{color:"red"}}> *</span></label>
                <input type="text" className="form-control" onChange={handleChange} value={name} autoFocus/>
                
            </div>
            <center>
                <br/>
                <button disabled={btnLoading} className="btn btn-outline-primary">
                {btnLoading ? "Loading..." : "Add"}
                </button>

            </center>

            <div><Link className="nav-link" to="/admin/categories">Go Back to List </Link></div>
            
        </form>
        
    );

    const showSuccess = () => {
        if(success) {
            return <Redirect to="/admin/categories" />
        }
    };

    const showError = () => {
        if(error) {
            if(error.includes("11000 duplicate key error collection")){
                return <div className="alert alert-danger" role="alert">Category name already exists!</div>
            }
            return <div className="alert alert-danger" role="alert">{error}</div>
        }
    };

    return (
        <AdminLayout>

            <div className="row">  
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title" style={{textAlign:'center',color:"#106eea"}}>Add Category</h4>
          
                            {showSuccess()}
                            {showError()}
                            {newCategoryForm()}

                        </div>
                    </div>
                </div>
            </div>
            
        </AdminLayout>
    )
}

export default AddCategory
