require("dotenv").config();
const { errorHandler } = require("../helpers/dbErrorHandler");

const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY);

exports.createCustomer = async (req, res) => {
  console.log("createCus", req.body);

  //let stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY);

  // Testing for Future use

  /* if(CHECK_USER === req.body.userid){
        stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY_1);
    }
    else {
        stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY);
    } */

  try {
    const customer = await stripe.customers.create({
      name: req.body.name,
      email: req.body.email,
    });
    console.log("Create Customer", customer);
    res.json(customer);
  } catch (error) {
    console.error("Error-CreateCustomer", error);
    return res.status(400).json({
      error: errorHandler(error),
    });
  }
};

exports.createCardWallet = async (req, res) => {
  console.log("createCard", req.body);

  //let stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY);

  // Testing for Future use

  /* if(CHECK_USER === req.body.userid){
        stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY_1);
    }
    else {
        stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY);
    } */

  try {
    const intent = await stripe.setupIntents.create({
      customer: req.body.customer,
    });
    console.log("Card Wallet", intent);
    res.json(intent);
  } catch (error) {
    console.error("Error-create CardWallet", error);
    return res.status(400).json({
      error: errorHandler(error),
    });
  }
};

exports.chargePayment = async (req, res) => {
console.log("changedata",req.body)
  // console.log(stoppp)
  //let stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY);

  // Testing for Future use

  /* if(CHECK_USER === req.body.userid){
        stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY_1);
    }
    else {
        stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY);
    } */

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.ceil(Number(req.body.price * 100)),
      currency: "USD",
      customer: req.body.customer,
      payment_method: req.body.payment_method,
      off_session: true,
      confirm: true,
    });

    if (Number(req.body.price) === 0.3) {
      var refundDate = await refundAmount(req.body.userid, paymentIntent.id);
    }

    res.json(paymentIntent);
  } catch (error) {
    console.error("Error-Charge Payment", error);
    return res.status(400).json({
      error: errorHandler(error),
    });
  }
};

const refundAmount = async (userId, paymentID) => {
  console.log("refund ID", paymentID);
  console.log("refund userId", userId);

  //let stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY);

  // Testing for Future use

  /* if(CHECK_USER === req.body.userid){
        stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY_1);
    }
    else {
        stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY);
    } */

  try {
    const refund = await stripe.refunds.create({
      payment_intent: paymentID,
    });

    console.log("refund", refund);
    return true;
  } catch (err) {
    return true;
  }
};

exports.removeCard = async (req, res) => {
  console.log("Remove Data", req.body);
  try {
    const paymentMethod = await stripe.paymentMethods.detach(
      req.body.payment_method
    );
    console.log("Sub", paymentMethod);
    res.send(paymentMethod);
  } catch (error) {
    console.error("Error-Cancel Card", error);
    return res.status(400).json({
      error: errorHandler(error),
    });
  }
};

exports.getPaymentMethod = async (req, res) => {
  console.log("Req PM data", req.body);
  try {
    const paymentMethod = await stripe.paymentMethods.retrieve(
      req.body.payment_method
    );
    res.json(paymentMethod);
  } catch (error) {
    console.error("Error-PM Details", error);
    return res.status(400).json({
      error: errorHandler(error),
    });
  }
};

exports.getRefund = async (req, res) => {
  console.log("Refund Data", req.body);

  /* let stripe="";
    if(CHECK_USER === req.body.userid){
        stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY_1);
    }
    else {
        stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY);
    } */

  try {
    const refunds = await stripe.refunds.list({
      payment_intent: req.body.paymentid,
    });
    console.log(refunds);
    res.send(refunds);
  } catch (error) {
    console.error("Get Refund", error);
    return res.status(400).json({
      error: errorHandler(error),
    });
  }
};

exports.retrieveRefund = async (req, res) => {
  /* let stripe="";
    if(CHECK_USER === req.body.userid){
        stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY_1);
    }
    else {
        stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY);
    } */

  try {
    const refund = await stripe.refunds.retrieve(req.body.ID);
    res.send(refund);
  } catch (error) {
    console.error("Retrieve Refund", error);
    return res.status(400).json({
      error: errorHandler(error),
    });
  }
};

exports.createRefund = async (req, res) => {
  /* let stripe="";
    if(CHECK_USER === req.body.userid){
        stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY_1);
    }
    else {
        stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY);
    } */

  try {
    const refund = await stripe.refunds.create({
      payment_intent: req.body.paymentintentid,
    });

    console.log("refund", refund);
    res.send(refund);
  } catch (error) {
    console.error("Create Refund", error);
    return res.status(400).json({
      error: errorHandler(error),
    });
  }
};
