import React,{useState,useEffect, useContext} from 'react';
import UserLayout from './Layout/UserLayout';
import {AuthContext} from '../globalStates';
import {getCancelledOrders, updateCancelStatus} from './apiUser';
import Moment from 'react-moment';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { Modal } from 'react-bootstrap'
import {API} from '../config'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { fetchConfig } from '../auth/fetchInterceptor';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStylesError = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
}));


const CancelledOrders = ()=>{

    const [authState] = useContext(AuthContext);

    const classes = useStyles();

    const classesError = useStylesError();

    const [openAlert, setAlert] = useState(false);

    const [error, setError] = useState('');

    const [orders,setOrders] = useState([]);
    const [loading,setloading] = useState(true);
    const [showCancelled, setShowCancelled] = useState(false);
    const [tempOrderid, setTempOrderId] = useState('');
    const [tempPaymentId, setTempPaymentId] = useState('');
    const [tempStatus, setTempStatus] = useState('');
    const [openCancel, setOpenCancel] = useState(false);

    const [cancelVal, setCancelVal] = useState({
        cancelled_reason:''
    })
  
    const { cancelled_reason } = cancelVal;

    const loadOrders = ()=>{
        getCancelledOrders()
        .then(data=>{
            if(data.error){
                console.log(data.error);
                setloading(false);
                setOpenCancel(false);
            }else{
                setOrders(data)
                setloading(false); 
                setOpenCancel(false);
            }         
        })
    }

    useEffect(()=>{
        loadOrders();
    },[]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setAlert(false);
    }

    // Cancel Order Starts

    const clickCancelSubmit = (orderid, status, paymentId) => {
        if(window.confirm("Are you sure you want to continue?"))
        {
            setTempOrderId(orderid);
            setTempStatus(status);
            setTempPaymentId(paymentId);
            setShowCancelled(()=>setShowCancelled(true));
        }
    }

    const handleChangeforCancelled = name => event => {
        setCancelVal({ ...cancelVal, [name]: event.target.value});
    }

    const clickSubmitCancelled = async (event) => {
        event.preventDefault();
        setOpenCancel(true);
        setCancelVal({...cancelVal});
        var refundID="";
        var tempRefundID;
        var getRefund;
        var payment;
        if(tempStatus !== "Awaiting Payment")
        {

            const response = await fetch(`${API}/get-refund`, {
                method:'POST',
                headers:fetchConfig,
                body: JSON.stringify({ 
                    'paymentid': String(tempPaymentId),
                    'userid': String(authState._id)             
                    })
            })
    
            payment = await response.json();

            getRefund = payment.data[0];

            if(getRefund !== undefined){
                tempRefundID = getRefund.id;

                const response1 = await fetch(`${API}/retrieve-refund`, {
                    method:'POST',
                    headers:fetchConfig,
                    body: JSON.stringify({ 
                        'ID': String(tempRefundID),
                        'userid': String(authState._id)             
                    })
                })

                const payment1 = await response1.json();
                refundID = payment1.id;

                if(payment1.status === "succeeded")
                {
                    setError("Your order got refund already!!");
                    setAlert(true);
                    setTempOrderId('');
                    setTempStatus('');
                    setTempPaymentId('');
                    setCancelVal({
                        ...cancelVal,
                        cancelled_reason:''
                    });
                    setShowCancelled(false)
                    setOpenCancel(false);
                    return 0;
                }
                
            }

            if(tempPaymentId !== "" && tempPaymentId !== undefined && tempPaymentId !== "null" && tempPaymentId !== "undefined"){
                if(refundID === ""){
                    const refund = await fetch(`${API}/refund`, {
                        method:'POST',
                        headers:fetchConfig,
                        body: JSON.stringify({ 
                        'paymentintentid': String(tempPaymentId),
                        'userid': String(authState._id)    
                        })
                    });  
                    const refunddetails = await refund.json();
                    if(refunddetails.status === "succeeded")
                    {

                        updateCancelStatus({orderId:tempOrderid, status:"Order Cancelled",cancelled_reason})
                        .then(data => {
                            if(data.error){
                                console.log("Cancel Error", data.error);
                            }
                            else {
                                setTempOrderId('');
                                setTempStatus('');
                                setTempPaymentId('');
                                setCancelVal({
                                    ...cancelVal,
                                    cancelled_reason:''
                                });
                                setShowCancelled(false)
                                loadOrders();
                            }
                        }) 

                    }
                    else {

                        setError("Refund Error, Please try again or comeback later!!");
                        setAlert(true);
                        setTempOrderId('');
                        setTempStatus('');
                        setTempPaymentId('');
                        setCancelVal({
                            ...cancelVal,
                            cancelled_reason:''
                        });
                        setShowCancelled(false)
                        setOpenCancel(false);
                        return 0;

                    }
        
                }
            }
        }
        else {

            updateCancelStatus({orderId:tempOrderid, status:"Order Cancelled",cancelled_reason})
                .then(data => {
                    if(data.error){
                        console.log("Cancel Error", data.error);
                    }
                    else {
                        setTempOrderId('');
                        setTempStatus('');
                        setTempPaymentId('');
                        setCancelVal({
                            ...cancelVal,
                            cancelled_reason:''
                        });
                        setShowCancelled(false)
                        loadOrders();
                    }
            }) 

        }
    }

    const showCancelModal = () => {
        return (
            <Modal show={showCancelled} 
                onHide={() => setShowCancelled(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Cancel Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form onSubmit={clickSubmitCancelled}>
                    <div className="form-group">
                        <label className="text-muted">Reason<span style={{color:"red"}}> *</span></label>
                            <textarea onChange={handleChangeforCancelled('cancelled_reason')} className="form-control" value={cancelled_reason} required/>
                    </div>
                    <center>
                        <br/>
                        <button className="btn btn-warning white-color orange-bg font-larger oswald-font shop-btn">Continue</button>
                    </center>
                    
                </form>
                </Modal.Body>
  
            </Modal>
        )
    } 

    // Cancel Orders Ends

    // Payment Starts

    const localHandlePayment = (id) => {
        localStorage.setItem('_ord',JSON.stringify({id}))
        return window.location.href="/checkout";
    }

    // Payment Ends


    const UserOrders = ()=>{
        return(
            <div>
            {orders.map((item)=>(
                <div key={item._id} className="col-md-12 px-0 mb-2">
                    <div className="row">
                    <div className="col-md-12 stretch-card">
                        <div className="card position-relative card-shad-in">
                        <div className="card-body">
                            <div className="row estimated-bord">
                            <div className="col-md-6 blue-esti-head">
                            <p className="card-title blue-esti-head">Order Status : {item.status}</p>
    
                          {/*   {((item.status === "Awaiting Customer Pre-configuration") && (item.pre_config === 1)) && (<p className="card-title" style={{color:'red'}}>Please complete the preconfiguration for us to ship the product <button className="btn btn-info btn-gra-my-p" disabled={btnloading} onClick={() => clickSubmit(item._id)}>{btnloading ? "Loading..." : "Click here to complete pre-configuration now"}</button></p>)} */}
                            {/* {item.status !== "Waiting for Customer input" && (<p className="card-title blue-esti-head">Estimated Delivery on <Moment add={{ days: 7}} format='MM-DD-YYYY'>{(item.createdAt)}</Moment></p>)} */}
                            <p className="card-title blue-esti-head">Ordered Date :  <Moment format='DD/MM/YYYY'>{(item.createdAt)}</Moment></p>
                            
                            </div>
                            <div className="col-md-6 text-right">
                            <p className="card-title blue-esti-head">Order Number: {item.orderid}</p>     
                            <p className="card-title blue-esti-head">Payment Status: {(item.status === "Awaiting Payment") ? <span style={{color:'red'}}>Waiting for Payment</span> : "Paid"}</p>    
                            
                            <p className="card-title blue-esti-head">{(item.status === "Awaiting Payment") && <button className="btn btn-info btn-gra-my-p" onClick={() => localHandlePayment(item._id)}>Pay Now</button>}</p>   
                            </div>
                            </div>
                            <hr/>
                            <div className="row">
                        
                            <div className="col-md-4 col-xl-4 d-flex flex-column justify-content-top">
                                <div className="ml-xl-4 pt-3">
                                <p className="products-text-in-dark">Products</p>
                                <h1 className="custo-sec-ad pt-2 pb-2">{/* {item.quantity} x */}{item.title}</h1>
                                <div className="row">
                                    <div className="col-md-6">                           
                                    <ul className="list-inline pr-name-air-sen">                              
                                    <li dangerouslySetInnerHTML={{__html: item.order_description}}></li>                          
                                    </ul>
                                    </div> 
                                </div>
                                </div>  
                            </div>
    
                            <div className="col-md-4 col-xl-4 d-flex flex-column justify-content-top">
                                {item.shipping && 
                                <div className="ml-xl-4 pt-3">
                                    <p className="products-text-in-dark">Delivery Address</p>
                                    <h1 className="custo-sec-ad pt-2">{item.shipping.prefix}. {item.shipping.first_name} {item.shipping.last_name} | {item.shipping.phone}</h1>
                                    <p>{item.shipping.address1}</p>
                                    <p>{item.shipping.address2 && item.shipping.address2}</p>
                                    <p>{item.shipping.city}</p>
                                    <p>{item.shipping.state && item.shipping.state}</p>
                                    <p>{item.shipping.country}</p>   
                                    <p>{item.shipping.pin_code}</p>                     
                                </div> 
                                }
                            
                            </div>
    
                            {(item.status === "Return Rejected" || item.status === "Order Cancelled") &&  <div className="col-md-4 col-xl-4 d-flex flex-column justify-content-top">
                                <div className="ml-xl-4 pt-3">
                                <p className="products-text-in-dark">Cancelled Reason</p>
                                <p>{item.cancelled_reason}</p>
                                </div>
                            </div>}
                            
    
                            </div>
                        </div>
        
                        </div>
        
                    </div>
        
                    </div>
                    <div className="col-md-12" style={{backgroundColor: 'LightGray', border: 'solid 1px #e7e7e7', borderTop: '0px'}}>
                    <div className="row">
                        <div className="col-md-9 py-3">
    
                        {/* {item.shipping && <button onClick={() => clickNoteSubmit1(item._id)}  className="btn btn-info btn-gra-my-p" style={{borderRadius: '25px'}}>Add Notes</button>}
    
                        {(item.pre_config === 0 && item.status === "Awaiting Customer Pre-configuration" && (item.title.includes("Customised Safely Package") || item.title.includes("Customised SafelyTeam Package") || item.adId)) ? (<a href={"/user/order/details/"+(item._id)} className="btn btn-info btn-gra-my-p" style={{borderRadius: '25px'}}>Complete pre-configuration now </a>) : ''}
    
                        {((item.status === "Customer Pre-configuration Complete" || item.status === "Safely Pre-configuration Complete") && (item.title.includes("Customised Safely Package") || item.title.includes("Customised SafelyTeam Package") || item.adId))  ? (<span className="btn btn-info btn-gra-my-p" style={{borderRadius: '25px'}}>Pre-configuration completed </span>) : ''}
        
                        {(item.status === "Customer Pre-configuration Complete" && (item.title.includes("Customised Safely Package") || item.title.includes("Customised SafelyTeam Package") || item.adId))  ? (<a href={"/user/order/details/"+(item._id)} className="btn btn-info btn-gra-my-p" style={{borderRadius: '25px'}}>Edit</a>) : ''}
    
                        {((item.status === "Awaiting Payment") && (item.title.includes("Customised Safely Package") || item.title.includes("Customised SafelyTeam Package"))) && (<a href={"/user/update/package/"+(item._id)}  className="btn btn-info btn-gra-my-p" style={{borderRadius: '25px'}}>Edit Package</a>)}
    
                        {((item.status === "Awaiting Payment") && (item.adId) && (item.source === undefined || item.source === "undefined" || item.source === "" || item.source === null)) && (<a href={"/user/update/ads/package/"+(item._id)}  className="btn btn-info btn-gra-my-p" style={{borderRadius: '25px'}}>Edit Package</a>)} */}
    
                        {(item.status === "Awaiting Payment" || item.status === "Processing") ? (<button onClick={() => clickCancelSubmit(item._id, item.status, item.paymentId)} className="btn btn-warning white-color orange-bg font-larger oswald-font shop-btn" style={{borderRadius: '20px'}}>Cancel Order</button>) : ''}
    
                       {/*  {(item.status === "Delivered" && item.shipping && ((<Moment format='MM-DD-YYYY'>{(item.updatedAt)}</Moment>) <= (<Moment add={{ days: 28}} format='MM-DD-YYYY'>{(item.updatedAt)}</Moment>))) && (<button onClick={() => clickSubmitReturn1(item._id)}  className="btn btn-info btn-gra-my-p" style={{borderRadius: '25px'}}>Return</button>)} */}
                        
                        </div>
                        <div className="col-md-3 pt-4">
                        <div className="row">
                            <div className="col-md-6 text-right">
                            <h3 className="total-font"> Total</h3>
                            </div>
                            <div className="col-md-6">
                            <h3 className="total-font-bl">${(item.price+item.shipping_charge).toFixed(2)}</h3>          
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            ))}
            </div>
        )
    }
    

    const showNotfound = () => {
        return (
                <div className="col-md-12 px-0">
                    <div className="col-md-12" style={{backgroundColor: '#f5f5f5', border: 'solid 1px #e7e7e7', borderTop: '0px'}}>
                        <br/>
                        <h4 style={{textAlign:'center',color:'red'}}>No Active orders found!</h4>
                    </div>
                </div>
        )
    }

    return(
            <UserLayout>
                <div className="user_page_head">
                    <h2 style={{textAlign:'center',color:'#19a6dd'}}>Cancelled Orders</h2>
                            
                    {!loading && (orders.length >= 1 ? UserOrders() : showNotfound())}
                    {showCancelModal()}
                    <Backdrop className={classes.backdrop} open={loading} >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                    <Backdrop className={classes.backdrop} open={openCancel} >
                        <CircularProgress color="inherit" />
                    </Backdrop>

                    <div className={classesError.root}> 

                        <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleClose}>                                             
                            <Alert onClose={handleClose} severity="error">{error}</Alert>                                                                                  
                        </Snackbar>

                    </div>
                </div>
            </UserLayout>
    )
}

export default CancelledOrders;