import React, { useEffect, useState } from 'react'
import Layout from './Layout/UserLayout'
import {getUserNotes,getUserOrderDetails, createUserNote} from './apiUser'
import Moment from 'react-moment';
import { Backdrop, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
}));

const OrderDetails = ({match})=>{

    const classes = useStyles();

    const [order,setOrder] = useState({});
    const [Notes,setNotes] = useState('');
    const [NoteData,setNoteData] = useState([]);
    const [btnloading,setBtnloading] = useState(false);
    const [notesLoaded,setNotesLoaded] = useState(false);
    const [error,setError] = useState(false);
    const [success,setSuccess] = useState(false);

    const handleNote = (e)=>{
        setSuccess(false)
        setNotes(e.target.value)
    }

    const handleNoteSubmit = (e)=>{
        setNotesLoaded(false)
        setSuccess(false)
        e.preventDefault();
        createUserNote(match.params.orderId,Notes)
        .then(data=>{
            if(data.error){
                setNotesLoaded(false);
                setSuccess(false)
                setError(data.error);
            }
            // window.alert("Note added sucessfully");
            setNotes("");
            setNotesLoaded(true);
            setSuccess(true);
        })
    }


    const loadOrder = (orderId)=>{
        setBtnloading(true);
        getUserOrderDetails(orderId)
        .then(data=>{
            if (data.error) {
                // console.log(data.error)
                setError(data.error);
                setBtnloading(false);
            }
            setOrder(data);
            setBtnloading(false);
        })
    }

    const loadNotes = (orderId)=>{
        getUserNotes(orderId)
        .then(data=>{
            if(data.error){
                // console.log(data.error)
                setError(data.error);
                setNotesLoaded(false)
            }
            setNoteData(data)
            setNotesLoaded(true)
        })
    }
    
    const showError = ()=>{
        return(
            <div className="alert alert-danger">
                <h4>Oops! Something went wrong Try again later..</h4>  
             </div>
        )
    }

    const showSuccess = ()=>(   
            <div className="alert alert-success">
                <h4>Note added successfully</h4>  
            </div>
    )

    const showOrderDetails = () => {
        return (
            <div className="row">
                <div className="col-md-6">
                    <div className="card mb-4 bord-line">
                        <div className="card-body">
                            <h5><b>Order Id : </b>{order.orderid}</h5>
                            <hr/>
                           {/*  <p className="card-text"><b>Order Id : </b>{order.orderid}</p> */}
                            <p className="card-text"><b>Product Name : </b>{order.title}</p>
                            <p className="card-text"><b>Product Description : </b><span dangerouslySetInnerHTML={{__html: order.order_description}}></span></p>
                            <p className="card-text"><b>Quantity : </b>{order.quantity}</p>
                            <p className="card-text"><b>Purchase Price ($) : </b>{(order.price+order.shipping_charge).toFixed(2)}</p>
                            <p className="card-text"><b>Product Price ($) : </b>{(order.price).toFixed(2)}</p>
                            <p className="card-text"><b>Shipping Charge ($) : </b>{(order.shipping_charge).toFixed(2)}</p>
                            <p className="card-text"><b>Sales Tax ($) : </b>{(order?.salesTax).toFixed(2)}</p>

                            <p className="card-text"><b>Odered Date : </b><Moment format='DD/MM/YYYY'>{order.createdAt}</Moment></p>
                            {Number(order.discount) >=1 && <>
                                <hr/>
                                <h5 style={{textDecoration:'underline'}}>Discount Details</h5>
                                <p className="card-text"><b>Discount price : </b>{order.discount}</p>
                                {/* <p className="card-text"><b>Coupon Name : </b>{coupon_name}</p> */}
                               
                            </>}
                            <hr/>
                            <h5 style={{textDecoration:'underline'}}><b>Delivery Address : </b></h5>
                            <p className="card-text"><b>Name : </b>{order.shipping.prefix+'. '+order.shipping.first_name+' '+order.shipping.last_name}</p>
                            <p className="card-text"><b>Phone : </b>{order.shipping.phone}</p>
                            <p className="card-text"><b>Address 1 : </b>{order.shipping.address1}</p>
                            {order.shipping.address2 && <p className="card-text"><b>Address 2 : </b>{order.shipping.address2}</p>}
                            <p className="card-text"><b>City : </b>{order.shipping.city}</p>
                            {order.shipping.state && <p className="card-text"><b>State : </b>{order.shipping.state}</p>}
                            <p className="card-text"><b>Pin Code : </b>{order.shipping.pin_code}</p>
                            <p className="card-text"><b>Country : </b>{order.shipping.country}</p>                                            
                        </div>   
                    </div>
                    <div className="card board-line">
                        <div className="card-body">
                            <form onSubmit={handleNoteSubmit}>
                                <div className="form-group">
                                     <h5><b>Add Notes : </b></h5>
                                    <textarea className="form-control" onChange={handleNote} value={Notes}></textarea><br/>
                                    <button className="btn btn-warning white-color orange-bg font-larger oswald-font shop-btn">Add Note</button>
                                    <br/>
                                    {success && showSuccess()}
                                </div>
                            </form>
                         </div> 
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card mb-4 bord-line">
                        <div className="card-body">
                            <h5 style={{textDecoration:'underline'}}><b>Order Status : </b></h5>
                            <br/>
                            <p className="card-text"><b>Status : </b>{order.status}</p>
                            {(order.status === "Order Cancelled" || order.status === "Return Rejected") && <p className="card-text"><b>Cancelled Reason : </b>{order.cancelled_reason}</p>}  
                            <h5 style={{textDecoration:'underline'}}><b>Payment Details : </b></h5>
                            <p className="card-text"><b>Status : </b>{order.paymentId ? 'Paid' : 'UnPaid'}</p>
                            <p className="card-text"><b>PaymentID : </b>{order.paymentId}</p>
                            <p className="card-text"><b>Amount ($) : </b>{order.price.toFixed(2)}</p>
                            <p className="card-text"><b>Date : </b>{order.payment_date}</p>
                        </div>      
                    </div>
                        <div className="card mb-4 bord-line">
                            <div className="card-body">
                                <h5><b>Your Notes</b></h5>
                                <hr />
                                {NoteData.length >0 && NoteData.map((data,i)=>{
                                    return(
                                        <p className="card-text" key={i}>{i+1}.{data.note}</p>
                                    )       
                                })}
                                
                            </div>
                        </div>
                </div>
            </div>          
        )
    }


    useEffect(()=>{
        loadOrder(match.params.orderId);     
    },[]);

    useEffect(()=>{
        loadNotes(match.params.orderId);
    },[notesLoaded])

    return(
      <Layout>
           <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h2 style={{textAlign:'center', color:"#106eea"}}>Order Details</h2>
                            {(!btnloading && order._id) && showOrderDetails()}
                            {error && showError()}
                            <Backdrop className={classes.backdrop} open={btnloading} >
                                <CircularProgress color="inherit" />
                            </Backdrop>
                        </div>
                    </div>
                </div>
            </div>
      </Layout>  
    )
}

export default OrderDetails;