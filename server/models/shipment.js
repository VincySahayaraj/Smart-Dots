const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const shipmentSchema = new mongoose.Schema(
    {
        shippingid: {
            type: ObjectId,
            ref: "Shipping"
        },
        orderid: {
            type: ObjectId,
            ref: "Order"
        },
        shipmentid: {
            type: String,
            trim: true
        },
        courierid: {
            type: String,
            trim: true
        },
        message: {
            type: String,
            trim: true
        },
        width:{
            type:Number,
            trim:true
        },
        height:{
            type:Number,
            trim:true
        },
        length:{
            type:Number,
            trim:true
        },
        weight:{
            type:Number,
            trim:true
        },
        amount:{
            type:Number,
            trim:true
        },
        label: {
            type:String
        },
        no_of_packages: {
            type: Number,
            trim: true
        },
        preferred_date:{
            type:String
        },
        preferred_max_time:{
            type: String
        },
        preferred_min_time:{
            type: String
        },
        shipmentType: {
            type: Number,
            trim: true
        },
        trackLink: {
            type: String,
            trim: true
        },
        itemList: {
            type: Array,
            trim: true
        }

    },
    { timestamps: true }

);

module.exports = mongoose.model("Shipment", shipmentSchema);