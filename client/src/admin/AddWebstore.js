import React, {useState, useContext, useEffect} from 'react'
import AdminLayout from './Layout/AdminLayout'
import {AuthContext} from '../globalStates';
import { Redirect, Link } from "react-router-dom"
import {  getItemProducts, addToSmartDots } from './apiAdmin'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
}));

const AddWebstore = () => {

    const classes = useStyles();

    const [authState] = useContext(AuthContext);

    const [loading, setLoading] = useState(true);

    const [items, setItems] = useState([]);

    const [itemError, setItemError] = useState('');

    const [values, setValues] = useState({
        prodID:'',
        btnloading:false,
        error: '',
        createdProduct: '',
    })

    const { 
        prodID,
        btnloading,
        error,
        createdProduct,
    } = values;

    const loadItems = () => {
        getItemProducts().then(data => {
            if(data.error){
                setItemError(data.error);
                setLoading(false);
            }
            else {
                setItems(data);
                setLoading(false);
            }
        })
    }

    useEffect(() => {
        loadItems()
    },[])

    const handleChange = event => {
        const value = event.target.value
        setValues({...values,error:'', prodID: value,btnloading:false})
    }

    const addItemstoSmartDots = async (e) => {
        e.preventDefault();
        if(window.confirm("Do you want to add this product to Webstore?"))
        {
            setLoading(true);
            setItemError('');
            addToSmartDots({id:prodID, added_by:authState._id, type:1, isSmartDots:true})
            .then(data => {
                if(data.error){
                    setLoading(false);
                    setItemError(data.error);
                }
                else {
                    setValues({
                        ...values,
                        createdProduct: data.Device_Name
                    })
                    //return <Redirect to="/admin/products" /> 
                }
            })
        }
      /*   window.location.reload(); */
    }

    const deviceForm = () => (

        <div className="container col-md-8 offset-md-2 pb-2">

            <form className="mb-3" onSubmit={addItemstoSmartDots}>
                    
                <div className="form-group">
                    <label className="text-muted">Add Product to SmartDots<span style={{color:"red"}}> *</span></label>
                    <select
                        onChange={e => handleChange(e)}
                        className="form-control">
                        <option>Select Product</option> { 
                            items && items.map((c, i) => (
                            <option key={i} value={c._id}>{c.Device_Name} -  {c?.Color || "N/A"}
                        </option>
                        ))}
                    </select>
                </div>
                <center>
                    <br/>
                    <button  className="btn btn-outline-primary" disabled={btnloading}>{btnloading ? "Loading..." : "Add to Webstore"} </button>
                </center>

               <Link className="nav-link" to="/admin/products">Go Back to List </Link>

            </form>
        </div>
        
    )

    const showError = () => (
        <div className="alert alert-danger" role="alert" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showAddingError = () => (
        <div className="alert alert-danger" role="alert" style={{ display: itemError ? '' : 'none' }}>
            {itemError}
        </div>
    );

    const showSuccess = () => (
        createdProduct && <Redirect to="/admin/products" /> 
    )

    return (
        <AdminLayout>

                <div className="row">
                    
                    <div className="col-lg-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title" style={{textAlign:'center', color:"#106eea"}}>Add Webstore Product</h4>                             
                                {deviceForm()}
                                {showSuccess()}
                                {showError()}
                                {showAddingError()}                   
                            </div>
                        </div>
                    </div>
               </div>

                <Backdrop className={classes.backdrop} open={btnloading} >
                    <CircularProgress color="inherit" />
                </Backdrop> 

                <Backdrop className={classes.backdrop} open={loading} >
                    <CircularProgress color="inherit" />
                </Backdrop> 
            
        </AdminLayout>
    )
}

export default AddWebstore