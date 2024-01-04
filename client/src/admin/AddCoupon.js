import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom';
import AdminLayout from './Layout/AdminLayout'
import { createCoupon, getCategories, getProducts } from './apiAdmin'

const AddCoupon = () => {

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    const [openProduct, setOpenProduct] = useState(false);
    const [openCategory, setOpenCategory] = useState(false);
    const [showShipping, setShowShipping] = useState(false);

    const [loading, setLoading] = useState(false);

    const [values, setValues] = useState({
        coupon_code: '',
        description: '',
        start_date: '',
        end_date: '',
        coupon_value: '',
        value_type: 0,
        customer_type: 0,
        btnloading: false,
        coupon_limit: '',
        error: '',
        success: false
    })

    const { coupon_code, coupon_limit, description, start_date, end_date, coupon_value, value_type, customer_type, btnloading, success, error } = values;

    const loadCategories = () => {
        getCategories()
            .then(data => {
                if (data.error) {
                    setLoading(false);
                }
                else {
                    setCategories(data);
                    setLoading(false);
                }
            })
    }

    const loadProducts = () => {
        getProducts()
            .then(data => {
                if (data.error) {
                    setLoading(false);
                }
                else {
                    setProducts(data);
                    setLoading(false);
                }
            })
    }

    useEffect(() => {
        loadProducts()
        loadCategories()
    }, [])

    const handleChange = name => event => {
        if (String(name) === "customer_type") {
            let val = event.target.value
            if (Number(val) === 4) { // For Product
                setOpenCategory(false);
                setOpenProduct(true);
            }
            else if (Number(val) === 5) { // For Category  
                setOpenProduct(false);
                setOpenCategory(true);
            }
            else if (Number(val) === 6) {
                setShowShipping(true);
            }
        }
        setValues({ ...values, error: false, [name]: event.target.value, btnloading: false });
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false, btnloading: true });
        createCoupon(values)
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

    const couponForm = () => (


        <form onSubmit={clickSubmit}>
            <div className="row">
                <div className="col-md-6">

                    <div className="form-group pb-3">
                        <label className="text-muted">Coupon Code<span style={{ color: "red" }}> *</span></label>
                        <input onChange={handleChange('coupon_code')} type="text" className="form-control" value={coupon_code} required />
                    </div>

                    <div className="form-group pb-3">
                        <label className="text-muted">Description</label>
                        <textarea onChange={handleChange('description')} className="form-control" value={description} />
                    </div>

                    <div className="form-group pb-3">
                        <label className="text-muted">Start Date<span style={{ color: "red" }}> *</span></label>

                        <input onChange={handleChange('start_date')} type="date" className="form-control" value={start_date} required />
                    </div>

                    <div className="form-group pb-3">
                        <label className="text-muted">End Date<span style={{ color: "red" }}> *</span></label>

                        <input onChange={handleChange('end_date')} type="date" className="form-control" value={end_date} required />
                    </div>

                </div>
                <div className="col-md-6">

                    <div className="form-group pb-3">
                        <label className="text-muted">Coupon Type<span style={{ color: "red" }}> *</span></label>
                        <select required
                            onChange={handleChange('value_type')}
                            className="form-control">
                            <option value="">Select Value Type</option>
                            <option value="1">By Amount</option>
                            <option value="2">By Percentage</option>
                        </select>
                    </div>

                    <div className="form-group pb-3">
                        <label className="text-muted">Coupon Value<span style={{ color: "red" }}> *</span></label>
                        <input onChange={handleChange('coupon_value')} type="number" min="0" className="form-control" value={coupon_value} required />
                    </div>

                    <div className="form-group pb-3">
                        <label className="text-muted">Customer Type<span style={{ color: "red" }}> *</span></label>
                        <select required
                            onChange={handleChange('customer_type')}
                            className="form-control">
                            <option value="">Select Customer Type</option>
                            <option value="1">Prospective Customer</option>
                            <option value="2">Unpaid Customer</option>
                            <option value="3">All Paid Customers</option>
                            <option value="4">By Product</option>
                            <option value="5">By Category</option>
                            <option value="6">Shipping</option>
                        </select>
                        {showShipping && <em style={{ textAlign: 'right', width: '100%', color: 'red' }}>For Free Shipping, Select By Percentage in Coupon type and enter 100 in Coupon value.</em>}
                    </div>



                    {openCategory && <div className="form-group pb-3">
                        <label className="text-muted">Category<span style={{ color: "red" }}> *</span></label>
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
                        <label className="text-muted">Product<span style={{ color: "red" }}> *</span></label>
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

                    <div className="form-group pb-3">
                        <label className="text-muted">Coupon Limit<span style={{ color: "red" }}> *</span></label>
                        <input onChange={handleChange('coupon_limit')} type="number" min="0" className="form-control" value={coupon_limit} required />
                    </div>

                </div>
            </div>

            <center className="pb-3">
                <button className="btn btn-outline-primary" disabled={btnloading}> {btnloading ? "Loading..." : "Add"} </button>
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
        <AdminLayout className="container" topTitle="Add Coupon">
            <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title pb-3" style={{ textAlign: 'center' }}>Add Coupons</h4>

                            {showSuccess()}
                            {showError()}
                            {couponForm()}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default AddCoupon
