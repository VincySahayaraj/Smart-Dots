import React from 'react'
import AddCardCall from './AddCardCall'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import {STRIPE_PUBLIC} from "../config";

const AddCard = () => {

    let stripePromise = loadStripe(STRIPE_PUBLIC);
    
    return (
        <Elements stripe={stripePromise}>
            <AddCardCall />
        </Elements>
    )
}

export default AddCard
