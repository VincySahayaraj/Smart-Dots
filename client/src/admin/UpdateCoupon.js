import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom';
import AdminLayout from './Layout/AdminLayout'
import { updateCoupon, getCoupon ,getCategories, getProducts} from './apiAdmin'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));


const UpdateCoupon = ({ match }) => {

    const classes = useStyles();

    const [loading, setLoading] = useState(true);

    const [values, setValues] = useState({
        coupon_code: '',
        description: '',
        start_date: '',
        end_date: '',
        coupon_value: '',
        value_type: 0,
        customer_type: 0,
        coupon_limit: '',
        btnloading: false,
        error: '',
        success: false
    })

    const { coupon_code, coupon_limit, description, start_date, end_date, coupon_value, value_type, customer_type, btnloading, success, error,productId,categoryId  } = values;

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    const [openProduct, setOpenProduct] = useState(false);
    const [openCategory, setOpenCategory] = useState(false);
    const [showShipping, setShowShipping] = useState(false);
    const loadProducts = () => {
        getProducts()
        .then(data => {
            if(data.error){
                setLoading(false);
            }
            else {
                setProducts(data);
                setLoading(false);
            }
        })
    }

    const loadCategories = () => {
        getCategories()
        .then(data => {
            if(data.error){
                setLoading(false);
            }
            else {
                setCategories(data);
                setLoading(false);
            }
        })
    }
    
    const init = couponId => {
        getCoupon(couponId)
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error });
                    setLoading(false);
                } else {
                    // populate the state
                    setValues({
                        ...values,
                        coupon_code: data.coupon_code,
                        description: data.description,
                        start_date: data.start_date.replace("T00:00:00.000Z", ""),
                        end_date: data.end_date.replace("T00:00:00.000Z", ""),
                        coupon_value: data.coupon_value,
                        value_type: data.value_type,
                        coupon_limit: data.coupon_limit,
                        customer_type: data.customer_type
                    });
                    setLoading(false);
                }
            });
    };

    useEffect(() => {
        init(match.params.couponId);
        loadProducts()
        loadCategories()
    }, []);

    const handleChange = name => event => {
        if(String(name) === "customer_type"){
            let val = event.target.value
            if(Number(val) === 4){ // For Product
                setOpenCategory(false);
                setOpenProduct(true);     
            }
            else if(Number(val) === 5) { // For Category  
                setOpenProduct(false);
                setOpenCategory(true);
            }
            else if(Number(val) === 6){
                setShowShipping(true);
            }
        }
        setValues({ ...values, error: false, success: false, [name]: event.target.value, btnloading: false });
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false, btnloading: true });
        updateCoupon(match.params.couponId, { couponID: match.params.couponId, coupon_code, description, coupon_value, value_type, end_date, start_date, customer_type: Number(customer_type), coupon_limit,productId,categoryId })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false, btnloading: false })
                } else {
                    setValues({
                        ...values,
                        coupon_code: '',
                        description: '',
                        coupon_value: '',
                        value_type: '',
                        end_date: '',
                        start_date: '',
                        customer_type: '',
                        coupon_limit: '',
                        btnloading: false,
                        error: '',
                        success: true
                    })
                }
            })
    }

    const [customerList] = useState([
        { label: "Prospective Customer", value: "1" },
        { label: "Unpaid Customer", value: "2" },
        { label: "All Paid Customers", value: "3" },
        { label: "By Product", value: "4" },
        { label: "By Category", value: "5" },
        { label: "Shipping", value: "6" }
    ])

    const couponForm = () => (


        <form onSubmit={clickSubmit}>

            <div className="row">
                <div className="col-md-6">

                    <div className="form-group">
                        <label className="text-muted">Coupon Code<span style={{ color: "red" }}> *</span></label>
                        <input onChange={handleChange('coupon_code')} type="text" className="form-control" value={coupon_code} required />
                    </div>

                    <div className="form-group">
                        <label className="text-muted">Description</label>
                        <textarea onChange={handleChange('description')} className="form-control" value={description} />
                    </div>

                    <div className="form-group">
                        <label className="text-muted">Start Date<span style={{ color: "red" }}> *</span></label>

                        <input onChange={handleChange('start_date')} type="date" className="form-control" value={start_date} required />
                    </div>

                    <div className="form-group">
                        <label className="text-muted">End Date<span style={{ color: "red" }}> *</span></label>

                        <input onChange={handleChange('end_date')} type="date" className="form-control" value={end_date} required />
                    </div>

                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label className="text-muted">Coupon Type<span style={{ color: "red" }}> *</span></label>
                        <select required
                            onChange={handleChange('value_type')}
                            className="form-control">
                            <option>Select Value type</option>
                            {
                                value_type === 1 ?
                                    <option selected value="1">By Amount</option> :
                                    <option selected value="2">By Percentage</option>
                            }
                            {value_type === 1 ?
                                <option value="2">By Percentage</option> :
                                <option value="1">By Amount</option>
                            }
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="text-muted">Coupon Value<span style={{ color: "red" }}> *</span></label>
                        <input onChange={handleChange('coupon_value')} type="number" className="form-control" value={coupon_value} min="0" required />
                    </div>

                    <div className="form-group">
                        <label className="text-muted">Customer Type<span style={{ color: "red" }}> *</span></label>
                        <select required onChange={handleChange('customer_type')}
                            className="form-control">
                            {
                                // customerList.map(cus => (
                                // (Number(customer_type) === Number(cus.value) && <option key={cus.value} value={cus.value} selected>{cus.label}</option>
                                // )
                                // ))
                                customerList.map((cus) => {
                                    return (<>
                                        {Number(customer_type) == Number(cus.value) ? <option key={cus.value} value={cus.value} selected>{cus.label}</option> : <>                    <option key={cus.value} value={cus.value}>{cus.label}</option></>}


                                        {/* {(Number(customer_type) === Number(cus.value) && <option key={cus.value} value={cus.value} selected>{cus.label}</option>
                                 )} */}
                                    </>)
                                })
                            }

                        </select>
                    </div>

                    {openCategory && <div className="form-group pb-3">
                        <label className="text-muted">Category<span style={{color:"red"}}> *</span></label>
                        <select required
                            onChange={handleChange('categoryId')} 
                            className="form-control">
                            <option >Select Category</option> { 
                                categories && categories.map((c, i) => (
                                <option key={i} value={c._id}>{c.name}
                            </option>
                            ))}
                        </select>
                    </div>}

                    {openProduct && <div className="form-group pb-3">
                        <label className="text-muted">Product<span style={{color:"red"}}> *</span></label>
                        <select required
                            onChange={handleChange('productId')} 
                            className="form-control">
                            <option >Select Product</option> { 
                                products && products.map((c, i) => (
                                <option key={i} value={c._id}>{c.Device_Name}
                            </option>
                            ))}
                        </select>
                    </div>}
                    <div className="form-group">
                        <label className="text-muted">Coupon Limit<span style={{ color: "red" }}> *</span></label>
                        <input onChange={handleChange('coupon_limit')} type="number" className="form-control" value={coupon_limit} min="0" required />
                    </div>
                </div>
            </div>

            <center>
                <br />
                <button className="btn btn-outline-primary" disabled={btnloading}> {btnloading ? "Loading..." : "Update"} </button>
            </center>

        </form>
    )

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => {
        if (success) {
            return <Redirect to="/admin/coupons" />
        }
    };

    return (
        <AdminLayout className="container" topTitle="Update Coupon">
            <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title" style={{ textAlign: 'center' }}>Update Coupon</h4>
                            {/*  {(spinloading) ? <div className='loader-container'><div className='loader'></div></div> : ""} */}
                            <br />
                            {showSuccess()}
                            {showError()}

                            {!loading && couponForm()}
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

export default UpdateCoupon;
