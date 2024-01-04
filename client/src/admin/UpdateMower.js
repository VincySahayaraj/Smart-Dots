import React, { useState, useEffect } from 'react'
import AdminLayout from './Layout/AdminLayout'
import { Redirect, Link } from "react-router-dom"
import { updateMower, getMowerDetailsById,getUsers } from './apiAdmin'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { getProducts, getDetails, getShippingByUser, getOrderDate } from '../Apis/apis';
import Moment from 'react-moment';
import moment from "moment";
import '../user/managemower.css';
import {useContext } from 'react'
import  {AuthContext} from '../globalStates';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const UpdateMower = ({ match }) => {

    const classes = useStyles();
    const [mowermodels, setMowermodels] = useState([]);
    const [serialNumber, setSerialNumber] = useState('');
    const [modalNumber, setModalNumber] = useState('');
    const [userId, setUserId] = useState('');
    const [purchasedDate, setPurchasedDate] = useState('');
    const [thirdYear, setThirdYear] = useState('');
    const [warrentyEnd, setWarrentyEnd] = useState('');
    const [addressUser, setAddressUser] = useState([]);
    const [users, setUsers] = useState([]);
    

    const [authState,setauthState] = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [useritems, setUseritems] = useState({
        id: ''
    });
    const [values, setValues] = useState({
        mowerName: '',
        mowerModel: '',
        mowerSerialNo: serialNumber,
        mowerModelNo: modalNumber,
        purchaseFromSmartdots: '',
        dateOfPurchase: '',
        warrantyEndDate: '',
        address: '',
        thirdYearwarranty: '',
        added_by: '',
        customer_id:'',
        btnloading: false,
        error: '',
        success: false,
        btnloading: false,
        success: false
    });

    const {
        mowerName,
        mowerModel,
        mowerSerialNo,
        mowerModelNo,
        purchaseFromSmartdots,
        dateOfPurchase,
        warrantyEndDate,
        address,
        customer_id,
        added_by,
        thirdYearwarranty,
        btnloading,
        error,
        success } = values

    const loadMower = (mowerId) => {

        getMowerDetailsById(mowerId).then(data => {
      
   
            if (data.error) {
                setValues({ ...values, error: data.error });
                setLoading(false);
            } else {

                const warrentyEnd = moment(data.warrantyEndDate).utc().format('YYYY-MM-DD')
                 setWarrentyEnd(warrentyEnd)
                const thirdYearEnd = moment(data.thirdYearwarranty).utc().format('YYYY-MM-DD')
                setThirdYear(thirdYearEnd)
                const purchaseDate = moment(data.dateOfPurchase).utc().format('YYYY-MM-DD')
                 setPurchasedDate(purchaseDate)

                // populate the state
                setValues({
                    ...values,
                    mowerName: data.mowerName,
                    mowerModel: data.mowerModel._id,
                    mowerSerialNo: data.mowerSerialNo,
                    mowerModelNo: data.mowerModelNo,
                    purchaseFromSmartdots: data.purchaseFromSmartdots,
                    dateOfPurchase: purchaseDate,
                    warrantyEndDate: warrentyEnd,
                    customer_id:data.customer_id,
                    updated_by:authState._id,
                    added_by:data.added_by,
                    address: data.address,
                    thirdYearwarranty:purchaseFromSmartdots ? thirdYearEnd:''
                });

                setLoading(false);
            }
        });
    };


    const loadUsers = () => {
        getUsers().then(data => {

            if (data.error) {
              
                setValues({ ...values, error: data.error });
                setLoading(false);
            } else {

                const datas = data;

               
                // const sortedData = [...datas].sort((a, b) => a.mowerName - b.mowerName);
                setUsers(datas);
                setLoading(false);
               
            }
        });
    }



    const isPurchasedFromSmartDots = (name) => (event) => {

        const selectedModel = name;
        setValues({ ...values, purchaseFromSmartdots: selectedModel, error: false, [name]: event.target.value, btnloading: false });
        values.purchaseFromSmartdots = selectedModel;

        const userId = {
            id: '62e770ffb34a815ed3318e4f'
        }

        if (values.purchaseFromSmartdots == true) {
            getOrderDate(userId).
                then((data) => {
                    const orginalDatePurchase = moment(data.purchaseDate).utc().format('YYYY-MM-DD')
                    const warrentyDate = moment(data.warrentyEndDate).utc().format('YYYY-MM-DD')
                    setValues({ ...values, dateOfPurchase: orginalDatePurchase, warrantyEndDate: warrentyDate, error: false, [name]: event.target.value, btnloading: false });
                    // setPurchaseDate(orginalDatePurchase)
                    // setWarentyDate(warrentyDate)
                    // setIsDisabled(true);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching data from the API:', error);
                });
        }
        else {
            setValues({ ...values, dateOfPurchase: purchasedDate, warrantyEndDate: warrentyEnd, error: false, [name]: event.target.value, btnloading: false });
        }
    }


    useEffect(() => {
        getAddressOfMower();
        loadUsers();
        getProducts()
            .then((data) => {
                setMowermodels(data);
            })
            .catch((error) => {
                console.error('Error fetching data from the API:', error);
            });
        loadMower(match.params.mowerId);
        // const user = JSON.parse(localStorage.getItem('currentUser'))
        // const idUser = user.user
        // setUserId(idUser._id)
        setValues({ ...values, error: false, btnloading: false });
    }, [userId]);

    const mowerChange = (name) => (event) => {

        const selectedModel = event.target.value;
        setValues({ ...values, mowerModel: selectedModel, error: false, [name]: event.target.value, btnloading: false });
        values.mowerModel = selectedModel;
        setIsLoading(true)
        if (values.mowerModel) {


            getDetails(values.mowerModel).
                then((data) => {

                    const mowerData = {
                        _id: data._id,
                        Part_No: data.Part_No,
                    };

                    setTimeout(() => {
                        setSerialNumber(mowerData._id);
                        setModalNumber(mowerData.Part_No);
                        setIsLoading(false)
                    }, 1000)

                    setValues({ ...values, mowerSerialNo: data._id, mowerModelNo: data.Part_No });
                    // getAddressOfMower();
                })
                .catch((error) => {
                    console.error('Error fetching data from the API:', error);
                });
            //setValues({ ...values, mowerModel: selectedModel,mowerSerialNo: serialNumber, mowerModelNo: modalNumber, error: false, [name]: event.target.value, btnloading: false });
        }
    }

    const handleChange = (name) => (event) => {
        setValues({
            ...values,
            error: "",
            success: false,
            [name]: event.target.value,
            btnloading: false,
        });
    };

const customerChange=(name)=>(event)=>{
    const selectedModel = event.target.value;

        setValues({ ...values, customer_id: selectedModel, error: false, [name]: event.target.value, btnloading: false });
}
    //get address of a user
    const getAddressOfMower = () => {

        //get values of the current user
        // const items = localStorage.getItem('currentUser');
        // const user = JSON.parse(items)
        // const id = user.user._id
        setUseritems({
            ...useritems,
            id: authState._id
        })
        const userId = {
            id: '6268c21005b0ca664defa2d7'
        }
        if (userId) {

            //get address of the user
            getShippingByUser(userId).
                then((data) => {
                    const simulatedData = data;
                    setIsLoading(true);
                    setAddressUser(simulatedData);
                    setTimeout(() => {
                        setIsLoading(false); // Set loading to false after fetching data
                        setAddressUser(simulatedData);
                    }, 1000);
                })
                .catch((error) => {
                    console.error('Error fetching data from the API:', error);
                });
        }
    }


    const clickSubmit = (event) => {
        event.preventDefault();

        setValues({ ...values, added_by: userId, error: false, btnloading: true });
        updateMower(match.params.mowerId, { id: match.params.mowerId, values })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false, btnloading: false })
                    setLoading(false);
                } else {
                    setValues({
                        ...values,
                        mowerName: '',
                        mowerModel: '',
                        mowerSerialNo: serialNumber,
                        mowerModelNo: modalNumber,
                        purchaseFromSmartdots: '',
                        dateOfPurchase: '',
                        warrantyEndDate: '',
                        address: '',
                        thirdYearwarranty: '',
                        btnloading: false,
                        added_by: userId,
                        customer_id:'',
                        error: '',
                        success: false,
                        btnloading: false,
                        success: true
                    })

                    setLoading(false);
                }
            })
    }

    const handleDateOfPurchaseChange = (e) => {
        const newDateOfPurchase = e.target.value;
        // Check if warrantyEndDate is greater than dateOfPurchase
        if (warrantyEndDate && new Date(warrantyEndDate) <= new Date(newDateOfPurchase)) {
            // Display an error or handle the validation accordingly
            alert('Warranty end date must be greater than the date of purchase.');
            //         return(
            // <Alert severity="error">Warranty end date must be greater than the date of purchase!,check it out</Alert>
            //         )

        }
        else {
            setValues({ ...values, dateOfPurchase: newDateOfPurchase });
        }
    };

    const handleWarrantyEndDateChange = (e) => {
        const newWarrantyEndDate = e.target.value;

        // Check if warrantyEndDate is greater than dateOfPurchase
        if (new Date(newWarrantyEndDate) <= new Date(dateOfPurchase)) {
            // Display an error or handle the validation accordingly
            alert('Warranty end date must be greater than the date of purchase.');
            // <div className={classes.root}>
            //     <Alert onClose={handleClose} severity="error">{error}</Alert>
            // </div>

        }
        else {
            setValues({ ...values, warrantyEndDate: newWarrantyEndDate });
        }
    };


    const uniqueUserIds = Array.from(new Set(addressUser.map((user) => user.address1)));
    const updateMowerForm = () => (
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
                            <label className="text-muted">Mower Name<span style={{ color: "red" }}> *</span></label>
                            <input onChange={(e) => setValues({ ...values, mowerName: e.target.value })} type="text" className="form-control" value={mowerName} required />
                        </div>
                        <div className="form-group">
                            <label className="text-muted">Mower Model<span style={{ color: "red" }}> *</span></label>
                            <select required
                                onChange={mowerChange('mowerModel')} value={mowerModel}
                                className="form-control">
                                <option value='' disabled>Select Model</option>
                                {mowermodels.map((mowermodels) => (
                                    <option key={mowermodels._id} value={mowermodels._id}>
                                        {mowermodels.Device_Name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="text-muted">Customer Name<span style={{ color: "red" }}> *</span></label>
                            <select required
                                onChange={customerChange('customer_id')} value={customer_id._id}
                                className="form-control">
                                <option value='' disabled>Select Customer</option>
                                {users.map((user) => (
                                    <option key={user._id} value={user._id}>
                                        {user.cfirst+' '+user.clast}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="text-muted">Serial Number<span style={{ color: "red" }}> *</span></label>
                            <input disabled type="text" className="form-control" value={mowerSerialNo} required />
                        </div>
                        <div className="form-group">
                            <label className="text-muted">Modal Number<span style={{ color: "red" }}> *</span></label>
                            <input disabled type="text" className="form-control" value={mowerModelNo} required />
                        </div>
                        <div className="form-group">
                            <label className="text-muted">Purchase from Smart Dots?<span style={{ color: "red" }}> *</span></label>
                            <br />
                            <input type="radio" value='true' name="yes" style={{ marginRight: '10px' }} className='pointer' onChange={isPurchasedFromSmartDots(true)} checked={purchaseFromSmartdots === true} />Yes
                            &nbsp;&nbsp;
                            <input type="radio" value='false' name="no" style={{ marginRight: '10px' }} className='pointer' onChange={isPurchasedFromSmartDots(false)} checked={purchaseFromSmartdots === false} />No
                        </div>
                        {/* Purchase date only show when its only purchase from smartdots */}

                        <div className="form-group">
                            <label className="text-muted">Date Of Purchase<span style={{ color: "red" }}> *</span></label>
                            <input type="date"  onChange={handleDateOfPurchaseChange} className="form-control" value={dateOfPurchase} required disabled={purchaseFromSmartdots} />
                        </div>
                        <div className="form-group">
                            <label className="text-muted">Manufacturer Warranty End Date<span style={{ color: "red" }}> *</span></label>
                            <input  onChange={handleWarrantyEndDateChange} type="date" className="form-control" value={warrantyEndDate} required disabled={purchaseFromSmartdots} />
                        </div>
                        <div className="form-group">
                            <label className="text-muted">Choose Address of the Mower<span style={{ color: "red" }}> *</span></label>
                            <select required
                                onChange={handleChange("address")}
                                value={address}
                                className="form-control">
                                <option disabled value=''>Select Address</option>
                                {/* Avoid repeated address */}
                                {uniqueUserIds.map((userid) => {
                                    const user = addressUser.find((user) => user.address1 === userid);
                                    return (
                                        <>
                                            <option key={userid} value={user.address1}>
                                                {user.address1}
                                            </option>
                                        </>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="text-muted">Smart Dots 3rd year Warranty<span style={{ color: "red" }}> *</span></label>
                            {purchaseFromSmartdots ? (
                                <input onChange={handleChange("thirdYearwarranty")} type="date" className="form-control" value={thirdYearwarranty} disabled={purchaseFromSmartdots} />
                            ) : (
                                <p className='not-applicable'>Not Applicable</p>
                            )}
                        </div>
                        <center>
                            <br />
                            <button className="btn btn-outline-primary" disabled={btnloading}> {btnloading ? "Loading..." : "Update"} </button>
                        </center>
                        <div><Link className="nav-link" to="/admin/mowers">Go Back to List </Link></div>
                    </form>
                )
            }
        </>
    )

    const showSuccess = () => (
        success && <Redirect to="/admin/mowers" />
    );

    const showError = () => {
        if (error) {
            if (error.includes("11000 duplicate key error collection")) {
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
                            <h4 className="card-title" style={{ textAlign: 'center', color: "#106eea" }}>Update Mower</h4>
                            <div className="row">
                                <div className="col-md-8 offset-md-2">

                                    {showSuccess()}
                                    {showError()}
                                    {!loading && updateMowerForm()}

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

export default UpdateMower
