const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const itemSchema = new mongoose.Schema(
    {
        Device_Name: {
            type: String,
            trim: true,
            maxlength:1000,
            required: true
        },
       /*  Device_Alias: {
            type: String,
            trim: true,
            maxlength:1000,
        }, */
        Description: {
            type: String,
            trim: true,
            required: true
        },
       /*  Device_Group: {
            type: String,
            trim: true,
        }, */
        Device_Capability: {
            type: String,
            trim: true,
        },
        Color: {
            type: String,
            trim: true,
            required: true
        },
        Style: {
            type: String,
            trim: true,
            required: true
        },
        Technology: {
            type: String,
            trim: true,
            required: true
        },
        Internal_Cost: {
            type: String,
            trim: true,
        },
        Cost_Price: {
            type: String,
            trim: true,
            required: true
        },
        SmartDots_MSRP: {
            type: String,
            trim: true,
            required: true
        },
        Labor_Cost_Installation: {
            type: String,
            trim: true,
        },
        Labor_Cost_Configuration: {
            type: String,
            trim: true,
        },
        Config_Cost_Reseller: {
            type: String,
            trim: true,
        },
        Labor_Price_Installation: {
            type: String,
            trim: true,
        },
        Labor_Price_Configuration: {
            type: String,
            trim: true,
        },
        Supplier: {
            type: String,
            trim: true,
            required: true
        },
        Manufacturer: {
            type: String,
            trim: true,
        },
        Part_No: {
            type: String,
            trim: true,
        },
        UPC_Code: {
            type: String,
            trim: true,
        },
        Stock: {
            type: String,
            trim: true,
        },
        shipping_charge: {
            type: Number,
            trim:true
        },
        /* Notes: {
            type: String,
            trim: true,
        }, */
        deleted: {
            type: String,
            default: "0"
        },
        inventory: {
            type: Number,
            trim:true
        },
        weight: {
            type: Number,
            trim:true
        },
        reserved:{
            type: Number,
            trim:true,
            default: 0
        },
        threshold: {
            type: Number,
            trim:true
        },
        status: { // 0 - Active 1 - Deactive 
            type: Number,
            trim: true,
            default: 0
        },
        added_by: {
            type: ObjectId,
            ref: "new_customer",
            required: true
        },
        category: {
            type: ObjectId,
            ref: "Category",
            required: true
        },
        photo: {
           type:String
        },
        images:{
            type:Array
        },
        video:{
            type:String
        },
        type: { // 1-Product // 2-Accessories
            type: Number,
            trim: true,
            required: true
        },
        isSmartDots: {
            type: Boolean,
            trim: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);