import React, {useState, useEffect} from 'react'
import AdminLayout from './Layout/AdminLayout'
import { Redirect,Link } from 'react-router-dom';
import {getSupplier, updateSupplier} from './apiAdmin'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
}));

const UpdateSupplier = ({match}) => {

    const classes = useStyles();

    const [loading, setLoading] = useState(true);

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

    const init = supplierId => {
        getSupplier(supplierId).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
                setLoading(false);
            } else {
                // populate the state
                setValues({
                    ...values,
                    companyName: data.companyName,
                    contactName: data.contactName,
                    email: data.email,
                    phone: data.phone,
                    address: data.address
                });
                setLoading(false);
            }
        });
    };


    useEffect(() => {
        init(match.params.supplierId);
    }, []);

    const handleChange = name => event => {
        setValues({ ...values, error: '', success:false, [name]: event.target.value,btnloading:false});
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({...values,success:false, error: '',btnloading:true });
        updateSupplier(match.params.supplierId,{id:match.params.supplierId, companyName, contactName, email, phone, address})
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

    const updateSupplierForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Company Name<span style={{color:"red"}}> *</span></label>
                <input onChange={handleChange('companyName')} type="text" className="form-control" value={companyName} required/>
            </div>

            <div className="form-group">
                <label className="text-muted">Contact Name</label>
                <input onChange={handleChange('contactName')} type="text" className="form-control" value={contactName}/>
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
                <textarea onChange={handleChange('address')} className="form-control" value={address}  />
            </div>

            <center>
                <br/>
                <button  className="btn btn-outline-primary" disabled={btnloading}> {btnloading ? "Loading..." : "Update"} </button>
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
                            <h4 className="card-title" style={{textAlign:'center',color:"#106eea"}}>Update Supplier</h4>

                                {showSuccess()}
                                {showError()}
                                {!loading && updateSupplierForm()}

                                <Backdrop className={classes.backdrop} open={loading} >
                                    <CircularProgress color="inherit" />
                                </Backdrop>  
          
                        </div>
                    </div>
                </div>
           </div>
            
        </AdminLayout>
    )
}

export default UpdateSupplier
