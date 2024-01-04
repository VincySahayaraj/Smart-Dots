import React, { useState, useEffect } from 'react'
import { Redirect, Link } from "react-router-dom"
import AdminLayout from './Layout/AdminLayout';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { getProducts, getDetails, getShippingByUser, getOrderDate } from '../Apis/apis';
import { createMower,getUsers } from './apiAdmin';
import moment from "moment";
import '../user/managemower.css';
import MuiAlert from '@material-ui/lab/Alert';
import {useContext } from 'react'
import  {AuthContext} from '../globalStates';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const AddMower = () => {
    const classes = useStyles();
    const [useritems, setUseritems] = useState({
        id: ''
    });
    const [userId, setUserId] = useState('');
    const [mowermodels, setMowermodels] = useState([]);
    const [serialNumber, setSerialNumber] = useState('');
    const [modalNumber, setModalNumber] = useState('');
    const [purchaseDate, setPurchaseDate] = useState('');
    const [warentyDate, setWarentyDate] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    const [addressUser, setAddressUser] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
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
        added_by: userId,
        customer_id:'',
        btnloading: false,
        error: '',
        success: false
    });


    const [authState,setauthState] = useContext(AuthContext);




    const {
        mowerName,
        mowerModel,
        mowerSerialNo,
        mowerModelNo,
        purchaseFromSmartdots,
        dateOfPurchase,
        warrantyEndDate,
        address,
        added_by,
        customer_id,
        thirdYearwarranty,
        btnloading,
        error,
        success } = values

    const handleChange = (name) => (event) => {
        event.preventDefault();
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
                    getAddressOfMower();

                })
                .catch((error) => {
                    console.error('Error fetching data from the API:', error);
                });
            //setValues({ ...values, mowerModel: selectedModel,mowerSerialNo: serialNumber, mowerModelNo: modalNumber, error: false, [name]: event.target.value, btnloading: false });
        }
    };


    const isPurchasedFromSmartDots = (name) => (event) => {

        const selectedModel = name;
        setValues({ ...values, purchaseFromSmartdots: selectedModel, error: false, [name]: event.target.value, btnloading: false });
        values.purchaseFromSmartdots = selectedModel;

        const userId = {
            id: '62e770ffb34a815ed3318e4f'
        }

        //dynamic id
        // const id={
        //     id:userId
        // }


        if (values.purchaseFromSmartdots == true) {
            getOrderDate(userId).
                then((data) => {
                    const orginalDatePurchase = moment(data.purchaseDate).utc().format('YYYY-MM-DD')
                    const warrentyDate = moment(data.warrentyEndDate).utc().format('YYYY-MM-DD')
                    setValues({ ...values, dateOfPurchase: orginalDatePurchase, warrantyEndDate: warrentyDate, error: false, [name]: event.target.value, btnloading: false });
                    setPurchaseDate(orginalDatePurchase)
                    setWarentyDate(warrentyDate)
                    setIsDisabled(true);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching data from the API:', error);
                });
        }
        else {
            setValues({ ...values, dateOfPurchase: '', warrantyEndDate: '', error: false, [name]: event.target.value, btnloading: false });
        }
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



    useEffect(() => {
      
        loadUsers();

        getProducts()
            .then((data) => {
                setMowermodels(data);
            })
            .catch((error) => {
                console.error('Error fetching data from the API:', error);
            });
        // const user = JSON.parse(localStorage.getItem('currentUser'))
        // const idUser = user.user
        setUserId(authState._id);
        setValues({ ...values, added_by: userId, error: false, btnloading: false });

    }, [serialNumber, values.mowerModel, values.purchaseFromSmartdots, useritems, addressUser, userId]);


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

    const customerChange=(name)=>(event)=>{
        const selectedModel = event.target.value;
   
            setValues({ ...values, customer_id: selectedModel, error: false, [name]: event.target.value, btnloading: false });
    }



    //form submit
    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, added_by: userId, error: false, btnloading: true });
      
        createMower({
            values
        })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false, btnloading: false })
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
                        added_by: userId,
                       customer_id: '',
                        btnloading: false,
                        error: '',
                        success: true
                    })
                }
            })
    }
    const uniqueUserIds = Array.from(new Set(addressUser.map((user) => user.address1)));
    const mowerForm = () => (
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
                                onChange={handleChange('mowerModel')} value={mowerModel}
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
                                onChange={customerChange('customer_id')} value={customer_id}
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
                        {/* purchase date only show when its only purchase from smartdots */}

                        <div className="form-group">
                            <label className="text-muted">Date Of Purchase<span style={{ color: "red" }}> *</span></label>
                            <input onChange={handleDateOfPurchaseChange} type="date" className="form-control pointer" value={dateOfPurchase} required disabled={purchaseFromSmartdots} />
                        </div>

                        <div className="form-group">
                            <label className="text-muted">Manufacturer Warranty End Date<span style={{ color: "red" }}> *</span></label>
                            <input onChange={handleWarrantyEndDateChange} type="date" className="form-control pointer" value={warrantyEndDate} required disabled={purchaseFromSmartdots} />
                        </div>
                        <div className="form-group">
                            <label className="text-muted">Choose Address of the Mower<span style={{ color: "red" }}> *</span></label>
                            <select required
                                onChange={(e) => setValues({ ...values, address: e.target.value })} value={address}
                                className="form-control pointer">
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
                                <input onChange={(e) => setValues({ ...values, thirdYearwarranty: e.target.value })} type="date" className="form-control" value={thirdYearwarranty} required />
                            ) : (
                                <p className='not-applicable'>Not Applicable</p>
                            )}
                        </div>
                        <center>
                            <br />
                            <button className="btn btn-outline-primary" disabled={btnloading}> {btnloading ? "Loading..." : "Add"} </button>
                        </center>
                        <div><Link className="nav-link" to="/admin/mowers">Go Back to List </Link></div>
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
        success && <Redirect to="/admin/mowers" />
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
                            {mowerForm()}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default AddMower
