import React, { useState, useEffect, useContext } from 'react'
import Layout from '../Layout'
import { AuthContext } from '../../globalStates';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import { API } from '../../config'
import CardSection from './CardSection';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { getOrderDetails, updateCustomerId, createCardDetail, updateOrderSts, getActiveCardsById } from '../../Apis/apis'
import { fetchConfig } from '../../auth/fetchInterceptor';


const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const CheckoutCall = () => {

    const classes = useStyles();

    const [loading, setLoading] = useState(true);

    const [orderId, setOrderId] = useState("");

    const [open, setOpen] = useState(false);

    const [authState] = useContext(AuthContext);

    const [error, setError] = useState("")

    const [items, setItems] = useState([]);

    const stripe = useStripe();

    const [cards, setCards] = useState([]);

    const [recentCard, setRecentCard] = useState("");

    const elements = useElements();

    const [values, setValues] = useState({
        customerName: '',
        email: ''
    })

    const { customerName, email } = values;

    const loadOrder = (id) => {
        getOrderDetails({ order: id })
            .then(data => {
                if (data.error) {
                    setLoading(false);
                }
                else {
                    setItems(data);
                    setValues({ ...values, customerName: data.userid.cfirst + ' ' + data.userid.clast, email: data.userid.cemail })
                    loadCards(data.userid._id);

                }
            })
    }

    useEffect(() => {
        if (localStorage.getItem('_ord')) {
            const orderData = JSON.parse(localStorage.getItem('_ord'));
            setOrderId(orderData.id);
            loadOrder(orderData.id);
        }
        else {
            window.location.href = "/review-order"; // - Pending
        }
    }, [])

    const loadCards = (id) => {
        getActiveCardsById({ userId: id }).then(data => {
            if (data.error) {
                setLoading(false);
            }
            else {
                setCards(data);
                setLoading(false);
            }
        })
    }

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const handleCardChange = (e, paymentMethod) => {
        setRecentCard(paymentMethod)
    }

    const showRecentCards = () => {
        let lblid = "radio";
        return (
            <div>
                <h4 className="font-gen font-we-600 color-blk-in">Saved Cards</h4>
                {cards.map((p, i) => (
                    <div className="col-md-10 px-0 mb-3">
                        <div className="col-md-12 bord-line">

                            <div className="row">
                                <div className="col-md-1 wid-5-per">
                                    <div className="form-check">
                                        <label className="form-check-label">
                                            <input id={lblid + i} type="radio" value={recentCard} onChange={e => handleCardChange(e, p.payment_method)} className="form-check-input" name="optradio1" />
                                        </label>
                                    </div>
                                </div>
                                <label for={lblid + i} className="col-md-11">
                                    <div className="row">
                                        <div className="col-md-12 py-3 wid-60-per-in">

                                            <h5 className="pb-3 color-blk-in font-one-re">Use this Card</h5>
                                            <p className="pb-0 mb-0">
                                                <b>Card No:</b>&nbsp;xxxx xxxx xxxx {p.card_no}<br />
                                                <b>Exp month/year:</b>&nbsp;{p.exp_month} / {p.exp_year}<br />
                                                <b>Card Type:</b>&nbsp;{p.brand}<br />
                                            </p>
                                        </div>
                                        <div className="col-md-3 pt-3 text-right">
                                        </div>
                                    </div>
                                </label>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    const clickSubmit = async (event) => {
        event.preventDefault();
        setOpen(true);
        let customerId = "";
        let userID = authState._id;
        let paymentMethodId = "";
        let secretId = "";
        let charges;
        let card;

        if (authState.customerid) { // Existing Customer

            customerId = authState.customerid;

            if (recentCard) {
                paymentMethodId = recentCard;

                const createPayment = await fetch(`${API}/charge-payment-intent`, {
                    method: 'POST',
                    headers: fetchConfig,
                    body: JSON.stringify({
                        name: customerName,
                        customer: String(customerId),
                        price: items.price + items.shipping_charge,
                        payment_method: paymentMethodId,
                        userid: String(authState._id)
                    })
                });

                const paymentSession = await createPayment.json();

                if (paymentSession.status === "succeeded") {
                    localStorage.removeItem('_ord'); //Awaiting Customer Pre-configuration
                    updateOrderSts(orderId, 'Processing', paymentSession.id)
                        .then(data => {
                            if (data.error) {
                                setError(data.error);
                            }
                            else {
                                return window.location.href = '/success'
                            }
                        })
                }

            }
            else {  // New Card for Existing Customer

                const createSetupIntent = await fetch(`${API}/card-wallet`, {
                    method: 'POST',
                    headers: fetchConfig,
                    body: JSON.stringify({
                        name: customerName,
                        email: String(email),
                        customer: String(customerId),
                        userid: String(userID)
                    })
                });

                const setupSession = await createSetupIntent.json();

                secretId = setupSession.client_secret;

                if (!stripe || !elements) {
                    // Stripe.js has not yet loaded.
                    // Make sure to disable form submission until Stripe.js has loaded.
                    return;
                }

                const result = await stripe.confirmCardSetup(String(secretId), {
                    payment_method: {
                        card: elements.getElement(CardElement),
                        billing_details: {
                            name: customerName,
                        },
                    }
                });

                let tempRes = result.setupIntent;

                if (result.error) {
                    setOpen(false);
                    setError(result.error.message);
                }
                else {
                    paymentMethodId = tempRes.payment_method;

                    const createPayment = await fetch(`${API}/charge-payment-intent`, {
                        method: 'POST',
                        headers: fetchConfig,
                        body: JSON.stringify({
                            name: customerName,
                            customer: String(customerId),
                            price: items.price + items.shipping_charge,
                            payment_method: paymentMethodId,
                            userid: String(userID)
                        })
                    });

                    const paymentSession = await createPayment.json();

                    charges = paymentSession.charges

                    card = charges.data[0].payment_method_details.card

                    if (paymentSession.status === "succeeded") {

                        // UpdateCard
                        const updateCard = await createCardDetail({
                            userId: userID,
                            card_no: card.last4,
                            payment_method: paymentMethodId,
                            exp_year: card.exp_year,
                            exp_month: card.exp_month,
                            orderId: orderId,
                            brand: card.brand
                        })

                        if (updateCard) {
                            localStorage.removeItem('_ord'); //Awaiting Customer Pre-configuration
                            updateOrderSts(orderId, 'Processing', paymentSession.id)
                                .then(data => {
                                    if (data.error) {
                                        setError(data.error);
                                    }
                                    else {
                                        return window.location.href = '/success'
                                    }
                                })

                        }
                    }
                    else {
                        setError("Something went wrong, Enter the correct card details")
                    }
                }

            }
        }
        else { // New Customer

            const createCustomer = await fetch(`${API}/create-customer`, {
                method: 'POST',
                headers: fetchConfig,
                body: JSON.stringify({
                    name: customerName,
                    email: String(email),
                    userid: String(userID)
                })
            });

            const customerSession = await createCustomer.json();

            customerId = customerSession.id;

            const tempUser = await updateCustomerId({ userid: userID, customerid: customerId });

            if (tempUser.customerid) {

                const createSetupIntent = await fetch(`${API}/card-wallet`, {
                    method: 'POST',
                    headers: fetchConfig,
                    body: JSON.stringify({
                        name: customerName,
                        email: String(email),
                        customer: String(customerId),
                        userid: String(userID)
                    })
                });

                const setupSession = await createSetupIntent.json();

                secretId = setupSession.client_secret;

                if (!stripe || !elements) {
                    // Stripe.js has not yet loaded.
                    // Make sure to disable form submission until Stripe.js has loaded.
                    return;
                }

                const result = await stripe.confirmCardSetup(String(secretId), {
                    payment_method: {
                        card: elements.getElement(CardElement),
                        billing_details: {
                            name: customerName,
                        },
                    }
                });

                let tempRes = result.setupIntent;

                if (result.error) {
                    setOpen(false);
                    setError(result.error.message);
                }
                else {

                    paymentMethodId = tempRes.payment_method;

                    const createPayment = await fetch(`${API}/charge-payment-intent`, {
                        method: 'POST',
                        headers: fetchConfig,
                        body: JSON.stringify({
                            name: customerName,
                            customer: String(customerId),
                            price: items.price + items.shipping_charge,
                            payment_method: paymentMethodId,
                            userid: String(userID)
                        })
                    });

                    const paymentSession = await createPayment.json();

                    charges = paymentSession.charges

                    card = charges.data[0].payment_method_details.card

                    if (paymentSession.status === "succeeded") {

                        // UpdateCard
                        const updateCard = await createCardDetail({
                            userId: userID,
                            card_no: card.last4,
                            payment_method: paymentMethodId,
                            exp_year: card.exp_year,
                            exp_month: card.exp_month,
                            orderId: orderId,
                            brand: card.brand
                        })

                        if (updateCard) {
                            localStorage.removeItem('_ord'); //Awaiting Customer Pre-configuration
                            updateOrderSts(orderId, 'Processing', paymentSession.id)
                                .then(data => {
                                    if (data.error) {
                                        setError(data.error);
                                    }
                                    else {
                                        return window.location.href = '/success'
                                    }
                                })

                        }
                    }
                    else {
                        setError("Something went wrong, Enter the correct card details")
                    }

                }

            }
        }
    }

    const showCheckout = () => {
        return (

            <form onSubmit={clickSubmit}>

                <div className="form-group">
                    <label className="text-muted">Name<span style={{ color: "red" }}> *</span></label>
                    <input onChange={handleChange('customerName')} type="text" className="form-control" value={customerName} required />
                </div>


                <div className="form-group">
                    <label className="text-muted">Email<span style={{ color: "red" }}> *</span></label>
                    <input onChange={handleChange('email')} type="email" className="form-control" value={email} required />
                </div>

                <CardSection />
                <br />
                <button className="btn btn-warning white-color orange-bg font-larger oswald-font shop-btn" disabled={!stripe}>Proceed to Payment</button>
                <br />
                <br />
            </form>
        )
    }

    const showProducts = () => {
        return (
            <div className="col-md-12 bg-summa p-4">

                <h2 className="font-gen font-we-650 color-blk-in pt-0 pb-3 mb-0">Order Summary</h2>
                <div className="row py-3 font-we-600">
                    <div className="col-md-6 font-one-edit dis-bl-text font-we-600">
                        Product:
                    </div>
                    <div className="col-md-6 font-one-edit dis-bl-text font-we-600">
                        {items.title}
                    </div>
                </div>

                <hr />

                <div className="row font-we-650">
                    <div className="col-md-6 font-one-edit dis-bl-text font-we-600">
                        Product Total
                    </div>
                    <div className="col-md-6 font-one-edit dis-bl-text font-we-600">
                        ${parseFloat(items.price).toFixed(2)}
                    </div>
                    <div className="col-md-6 font-one-edit dis-bl-text font-we-600">
                        Shipping Charge
                    </div>
                    <div className="col-md-6 font-one-edit dis-bl-text font-we-600">
                        ${items.shipping_charge}
                    </div>



                    <div className="col-md-6 font-one-edit dis-bl-text font-we-600">
                        Sales Tax
                    </div>
                    <div className="col-md-6 font-one-edit dis-bl-text font-we-600">
                        ${items?.salesTax}
                    </div>


                    <hr />
                    <div className="col-md-6 font-one-edit-in color-blk-in">
                        Order Total<br />
                    </div>
                    <div className="col-md-6 font-one-edit-in color-blk-in">
                        $ {(items.price + items.shipping_charge + items?.salesTax).toFixed(2)}
                    </div>
                </div>

            </div>
        )
    }

    const showError = () => {
        if (error) {
            return <h3 className="text-danger">{error}</h3>
        }
    };

    return (
        <Layout>

            <div style={{ paddingTop: '80px' }} className="section pp-scrollable slide-dark slide-dark-footer">

                <div className="container">

                    <div className="col-md-12 top-det-sp-in">

                        <div className="col-md-12">
                            <div className="jumbotron" style={{ backgroundImage: 'linear-gradient(90deg, rgba(213,149,37,1) 0%, rgba(240,164,0,1) 22%, rgba(255,199,32,1) 100%)', color: 'white' }}>
                                <h3 style={{ textAlign: 'center' }}>Checkout</h3>
                            </div>
                        </div>

                        <div className="col-md-12 plr-0px">
                            <div className="container plr-0px">

                                <div className="row px-5 pt-5 qty-text pb-2">

                                    <div className="col-md-6 plr-0px">
                                        {cards.length > 0 && showRecentCards()}
                                        <h5 className="font-gen font-we-600 color-blk-in">Add New Card</h5>
                                        {showCheckout()}
                                        {showError()}
                                    </div>

                                    <div className="col-md-6 plr-0px">

                                        {!loading && showProducts()}

                                    </div>

                                </div>

                            </div>
                        </div>

                    </div>
                </div>
                <div className="pushCart"></div>

                <Backdrop className={classes.backdrop} open={loading} >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <Backdrop className={classes.backdrop} open={open} >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>

        </Layout>
    )

}

export default CheckoutCall