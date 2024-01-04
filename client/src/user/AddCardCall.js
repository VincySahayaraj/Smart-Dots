import React,{useState, useContext} from 'react'
import {AuthContext} from '../globalStates';
import {API} from '../config'
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import CardSection from '../core/checkout/CardSection'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import UserLayout from './Layout/UserLayout'
import { createCardDetail } from '../Apis/apis'
import { fetchConfig } from '../auth/fetchInterceptor';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
}));

const AddCardCall = () => {

    const [authState] = useContext(AuthContext);

    const stripe = useStripe();

    const elements = useElements();

    const classes = useStyles();

    const [error, setError] = useState("");

    const [open, setOpen] = useState(false);

    const clickSubmit = async (event) => {
        event.preventDefault();
        setOpen(true);
        let customerId="";
        let paymentMethodId="";
        let secretId="";
        let card;
        let customerName = authState.firstName+' '+authState.lastName;
        if(authState.customerid){
            customerId = authState.customerid;

            const createSetupIntent = await fetch(`${API}/card-wallet`, {
                method:'POST',
                headers: fetchConfig,
                body: JSON.stringify({ 
                    customer: String(customerId),
                    userid: String(authState._id)
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
            } else {
                paymentMethodId = tempRes.payment_method;

                const getPaymentMethod = await fetch(`${API}/get/payment-method/id`, {
                    method:'POST',
                    headers: fetchConfig,
                    body: JSON.stringify({                    
                        payment_method:paymentMethodId,
                        userid: String(authState._id)
                    })
                });

                const resultPM = await getPaymentMethod.json();
                  
                card = resultPM.card

                if(resultPM){
                    
                    const updateCard = await createCardDetail({
                        userId: authState._id,
                        card_no: card.last4,
                        payment_method: paymentMethodId,
                        exp_year : card.exp_year,
                        exp_month: card.exp_month,
                        brand: card.brand
                      })
  
                      if(updateCard){
                          return window.location.href="/user/manage/cards";
                      }  
              }

            }

        }
    }

    const showError = () => {
        if(error) {
            return <h3 className="text-danger">{error}</h3>
        }
    };

    return (
        <UserLayout>

            <div className="section">

                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2 style={{ color:'#19a6dd', textAlign:'center'}}>Add Card</h2>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={clickSubmit}>
                                <CardSection />
                                <br/>
                                <center>
                                    <button className="btn btn-warning white-color orange-bg font-larger oswald-font shop-btn" disabled={!stripe}>Add Card</button>
                                </center>
                            </form>
                            {showError()}
                        </div>
                    </div> 

                </div>

            </div>

            <Backdrop className={classes.backdrop} open={open} >
                <CircularProgress color="inherit" />
            </Backdrop>
            
        </UserLayout>
    )
}

export default AddCardCall
