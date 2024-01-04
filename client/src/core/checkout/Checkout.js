import React from 'react'
import CheckoutCall from './CheckoutCall'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import {STRIPE_PUBLIC} from "../../config";

const Checkout = () => {

    let stripePromise = loadStripe(STRIPE_PUBLIC);

    return (
        <Elements stripe={stripePromise}>
            <CheckoutCall />
        </Elements>
    )
}

export default Checkout
