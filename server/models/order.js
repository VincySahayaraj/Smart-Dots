const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema(
    {
        orderid: {
            type: String,
            trim: true
        },
        title: {
            type: String,
            trim: true,
            maxlength: 1000
        },
        paymentId: {
            type: String,
            maxlength: 1000
        },
        shipping: {
            type: ObjectId,
            ref: "Shipping"
        },
        order_description: {
            type: String,
            maxlength: 2000
        },
        status: {
            type: String,
            default: "Awaiting Payment",
            enum: ["Awaiting Payment", "Processing", "Shipped", "Delivered","Order Cancelled","Delayed"] // enum means string objects
            //enum: ["Awaiting Payment", "Awaiting Customer Pre-configuration","Customer Pre-configuration Complete", "SmartDots Pre-configuration Complete", "Shipped", "Delivered","Order Cancelled","Delayed"] // enum means string objects
        },
        discount: {
            type: Number,
            default: 0
        },
        quantity: {
            type: Number
        },
        price: {
            type: Number,
            trim: true
        },
        userid: {
            type: ObjectId,
            ref: "new_customer"
        },
        shipping_charge: {
            type: Number,
            default:0
        },
        payment_date: {
            type:Date
        },
        /* pre_config: {
            type: Number,
            default: 0
        },
        preconfig_status: {
            type: Boolean,
            default: false
        }, */
        cancelled_by: {
            type: ObjectId,
            ref: "new_customer"
        },
        cancelled_date: {
            type: Date
        },
        cancelled_reason: {
            type: String,
            trim: true
        },
        system_type: {
            type: String,
            trim: true
        },
        shipmentType: {
            type: Number,
            trim: true
        },
        salesTax:{
            type:Number,
            trim:true,
            default:0
        }

    },
    { timestamps: true }

);

module.exports = mongoose.model("Order", orderSchema);