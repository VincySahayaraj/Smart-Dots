const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const shippingSchema = new mongoose.Schema(
    {
        prefix: {
            type: String,
            trim: true,
            //required: true,
            maxlength: 32
        },
        first_name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        last_name: {
            type: String,
            trim: true,
            maxlength: 32
        },
        phone: {
            type: String,
            required: true,
            maxlength: 20
        },
        pin_code: {
            type: String,
            required: true,
            trim: true,
        },
        address1: {
            type: String,
            trim:true,
            required: true
        },
        address1: {
            type: String,
            trim:true
        },
        city: {
            type: String,
            trim: true,
            required: true
        },
        state: {
            type: String,
            trim: true,
            required: true
        },
        country: {
            type: String,
            required: true,
            trim: true
        },
        userid: {
            type: ObjectId,
            ref: "new_user"
        },
        status: { // 1-Active, 0-DeActive
            type: Number,
            default: 1
        },
        miles: {
            type: Number,
            trim: true
        },
        installation: {
            type: Boolean,
            trim: true
        }

    },
    { timestamps: true }

);

module.exports = mongoose.model("Shipping", shippingSchema);