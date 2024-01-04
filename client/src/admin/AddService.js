import React, { useState, useEffect } from 'react'
import { Redirect, Link } from "react-router-dom"
import AdminLayout from './Layout/AdminLayout';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { getProducts, getDetails, getShippingByUser, getOrderDate } from '../Apis/apis';
import { createService, getServices } from './apiAdmin';
import moment from "moment";
import '../user/managemower.css';
import MuiAlert from '@material-ui/lab/Alert';
import { useContext } from 'react'
import { AuthContext } from '../globalStates';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const AddService = () => {
    const classes = useStyles();
    const [userId, setUserId] = useState('');
  
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [values, setValues] = useState({
        serviceName: '',
        added_by: userId,
        btnloading: false,
        error: '',
        success: false
    });

    const [authState, setauthState] = useContext(AuthContext);
    const {
        serviceName,
        servicePrice,
        added_by,
        btnloading,
        error,
        success } = values

    useEffect(() => {

        setUserId(authState._id);
        setValues({ ...values, added_by: userId, error: false, btnloading: false });

    }, [userId]);

    //form submit
    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, added_by: userId, error: false, btnloading: true });

        createService({
            values
        })
            .then(data => {

                if (data.error) {
                    setValues({ ...values, error: data.error, success: false, btnloading: false })
                } else {
                    setValues({
                        ...values,
                        serviceName: '',
                        servicePrice: '',
                        added_by: userId,
                        btnloading: false,
                        error: '',
                        success: true
                    })
                }
            })
    }

    const AddserviceForm = () => (
        <>
            {isLoading ?
                (
                    <>
                        <Backdrop className={classes.backdrop} open={isLoading} >
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    </>
                ) : (
                    <form onSubmit={clickSubmit} >
                        <div className="form-group">
                            <label className="text-muted">Service Name<span style={{ color: "red" }}> *</span></label>
                            <input onChange={(e) => setValues({ ...values, serviceName: e.target.value })} type="text" className="form-control" value={serviceName} required />
                        </div>
                        {/* <div className="form-group">
                            <label className="text-muted">Service Price<span style={{ color: "red" }}> *</span></label>
                            <input onChange={(e) => setValues({ ...values, servicePrice: e.target.value })} type="text" className="form-control" value={servicePrice} required />
                        </div> */}
                        <center>
                            <br />
                            <button className="btn btn-outline-primary" disabled={btnloading}> {btnloading ? "Loading..." : "Add"} </button>
                        </center>
                        <div><Link className="nav-link" to="/admin/services">Go Back to List </Link></div>
                    </form>
                )
            }
        </>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        success && <Redirect to="/admin/services" />
    );

    return (
        <AdminLayout>
            <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title" style={{ textAlign: 'center', color: "#106eea" }}>Add Mower</h4>
                            {showSuccess()}
                            {showError()}
                            {AddserviceForm()}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default AddService
