const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const uuid = require('uuid');

const mowerSchema = new mongoose.Schema(
    {
        mowerName: {
            type: String,
            trim: true,
            maxlength:1000,
            required: true
        },
        mowerModel: {
            type: ObjectId,
            ref: "Item",
            required:true
        },
        
        mowerSerialNo: {
            type: String,
            trim: true,
            required: true,
            maxlength: 50
        },
        mowerModelNo: { // 1 - HomePage, 2 - Contact Us
            type: String,
            trim: true,
            required: true
        },
        purchaseFromSmartdots: { // 1 - HomePage, 2 - Contact Us
            type: Boolean,
            required: true
        },
        dateOfPurchase: {
          type: Date,
          //required: true  
        },
        warrantyEndDate: {
            type: Date,
            //required: true  
        },
        address: {
            type: String,
            required: true
        },
        thirdYearwarranty :{
            type: Date
        },
        added_by: {
            type: ObjectId,
            ref: "new_customer",
        },
        updated_by: {
            type: ObjectId,
            ref: "new_customer",
        },
        customer_id: {
            type: ObjectId,
            ref: "new_customer",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Mower", mowerSchema);


//module.exports = mongoose.model('mower', mowerSchema);
