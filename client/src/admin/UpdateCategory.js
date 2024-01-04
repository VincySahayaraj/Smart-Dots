import React, {useState, useEffect} from 'react'
import AdminLayout from './Layout/AdminLayout'
import { Redirect, Link } from "react-router-dom"
import { getCategory, updateCategory } from './apiAdmin'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
}));

const UpdateCategory = ({match}) => {

    const classes = useStyles();

    const [loading, setLoading] = useState(true);

    const [values, setValues] = useState({
        name: '',
        error: '',
        btnloading:false, 
        success: false
    });

    const {name,success,btnloading, error} = values

    const loadCategory = categoryId => {
        getCategory(categoryId).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
                setLoading(false);
            } else {
                // populate the state
                setValues({
                    ...values,
                    name: data.name
                });
                setLoading(false);
            }
        });
    };

    useEffect(() => {
        loadCategory(match.params.categoryId);
    }, []);

    const handleChange = name => event => {
        setValues({ ...values, error: '',success:false, [name]: event.target.value,btnloading:false});
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: false,btnloading:true });
        updateCategory(match.params.categoryId,{id:match.params.categoryId,name})
        .then(data => {
            if(data.error) {
                setValues({...values, error: data.error, success:false,btnloading:false})
                setLoading(false);
            } else {
                setValues({
                    ...values,
                    name:'',
                    error: '',
                    btnloading:false,
                    success: true
                })
                setLoading(false);
            }
        })
    }

    const updateCategoryForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Category Name<span style={{color:"red"}}> *</span></label>
                <input onChange={handleChange('name')} type="text" className="form-control"  value={name}  required/>      
            </div>
            <center>
                <br/>
                <button  className="btn btn-outline-primary" disabled={btnloading}> {btnloading ? "Loading..." : "Update"} </button>
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
                                <h4 className="card-title" style={{textAlign:'center',color:"#106eea"}}>Update Category</h4>
                                    <div className="row">
                                        <div className="col-md-8 offset-md-2">
               
                                            {showSuccess()}
                                            {showError()}
                                            {!loading && updateCategoryForm()}

                                            <Backdrop className={classes.backdrop} open={loading} >
                                                <CircularProgress color="inherit" />
                                            </Backdrop>  
                   
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            
        </AdminLayout>
    )
}

export default UpdateCategory
