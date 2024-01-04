import React, {useState, useContext, useEffect} from 'react'
import {AuthContext} from '../globalStates';
import AdminLayout from './Layout/AdminLayout'
import { Redirect } from "react-router-dom"
import { getProduct, updateInventory } from './apiAdmin'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
}));

const UpdateInventory = ({match}) => {

    const params = new URLSearchParams(window.location.search.substring(1));

    const ref = params.get("ref"); 

    const classes = useStyles();

    const [authState] = useContext(AuthContext);

    const [loading, setLoading] = useState(true);

    const [values, setValues] = useState({
        productName:'',
        inventory:'',
        product: '',
        reason: '',
        quantity: '',
        inventory_type: '', 
        btnloading1:false,
        error: '',
        success: false
    })


    const {inventory, quantity, reason,btnloading1, inventory_type, success, error,productName} = values

    const loadProduct = productId => {
        getProduct(productId).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error});
                setLoading(false)
            } else {
                // populate the state
                setValues({
                    ...values,
                    inventory: data.inventory,
                    productName: data.Device_Name
                });
                setLoading(false)
            }
        });
    };

    useEffect(() => {
        loadProduct(match.params.productId);
    }, []);

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value,btnloading1:false});
    };

    const clickSubmit = event => {
        event.preventDefault()
        setValues({...values, error: false,btnloading1:true})

        updateInventory({product:match.params.productId,quantity,inventory_type,reason, added_by:authState._id})
        .then(data => {
            if(data.error) {
                setValues({...values, error: data.error, success:false,btnloading1:false})
            } else {
                setValues({
                    ...values,
                    inventory:'',
                    productName:'',
                    product:'',
                    reason: '',
                    inventory_type: '',
                    quantity: '',
                    btnloading1:false,
                    error: '',
                    success: true

                })
            }
        })
    };

    const newInventoryForm = () => (

        <form className="mb-3" onSubmit={clickSubmit}>
            <div className="card mb-4">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12">
                            <h5><b>Product Name : </b>&nbsp;{productName}</h5> 
                            <h5><b>Quantity : </b>&nbsp;{inventory}</h5>
                        </div>
                    </div>
                </div>
            </div>
               
            <div className="row">
                <div className="col-md-12">

                <div className="form-group">
                   <input onChange={handleChange('inventory')} type="number" className="form-control" value={inventory}  min="0" hidden="true" />
               </div>

                <div className="form-group">
                   <label className="text-muted">Type<span style={{color:"red"}}> *</span></label>
                   <select onChange={handleChange('inventory_type')} className="form-control">
                       <option>Select Type</option>
                       <option value="1">Add</option>
                       <option value="2">Remove</option>
                   </select>
               </div>

               <div className="form-group">
                   <label className="text-muted">Inventory<span style={{color:"red"}}> *</span></label>
                   <input onChange={handleChange('quantity')} type="number" className="form-control"  min="0" value={quantity} required />
               </div>
            

               <div className="form-group">
                   <label className="text-muted">Reason<span style={{color:"red"}}> *</span></label>
                   <input onChange={handleChange('reason')} type="text" className="form-control" value={reason} required />
               </div>
           
               </div>             
           </div>    

            <center>
                <br/>
                <button  className="btn btn-outline-primary" disabled={btnloading1}> {btnloading1 ? "Loading..." : "Update"} </button>
            </center>   

        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => {
        if(success) {
            if(Number(ref) === 1){
                return <Redirect to="/admin/master-products" />
            }
            return <Redirect to="/admin/products" />
        }
    };

    return (
        <AdminLayout>

            <div className="row">  
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title" style={{textAlign:'center',color:"#106eea"}}>Update Inventory</h4>
          
                            {showSuccess()}
                            {showError()}
                            {!loading && newInventoryForm()}
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

export default UpdateInventory
